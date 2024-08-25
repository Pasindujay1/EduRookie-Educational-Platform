import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

//Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  //check email
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //check email
  if (!emailRegEx.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });
  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist)
      return res.status(400).json({ error: 'Invalid email or password.' });

    //if email exists match password
    const isPsswordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isPsswordMatch)
      return res.status(400).json({ error: 'Invalid email or password.' });

    //generate token:
    const payload = { _id: isUserExist._id }; //id of the user as payload

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    const user = { ...isUserExist._doc, password: undefined };
    return res
      .status(200)
      .json({ jwtToken, user, message: 'Login successful' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

//Regsiter Function
export const register = async (req, res) => {
  const { email, password, role } = req.body;

  console.log(email, password, role);

  //check all fields
  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //check email
  if (!emailRegEx.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });

  //check password
  if (password.length <= 6)
    return res
      .status(400)
      .json({ error: `Password must be more than 7 caharacters ` });
  try {
    const alreadyExist = await User.findOne({ email });

    if (alreadyExist)
      return res.status(400).json({
        error: `email [${email}] already exists in the system.`,
      });
    const encryptedPass = await bcrypt.hash(password, 12);

    const newUser = User({ email, password: encryptedPass, role: role });

    //save user
    const result = await newUser.save();

    await axios.post(
      `${process.env.NOTIFICATION_SERVICE_URL}/send-notification`,
      {
        studentEmails: ['donzchamika@gmail.com'],
        subject: 'EduRookie - Registration Success!',
        message:
          'Welcome to EduRookie! You have successfully registered to our platform. Enjoy learning!',
      }
    );

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc, message: 'User created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
