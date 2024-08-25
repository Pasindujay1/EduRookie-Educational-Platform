import Company from '../models/Company.js';
import cloudinary from 'cloudinary';
import axios from 'axios';

//create company
export const createCompany = async (req, res) => {
  try {
    const { name, description, status, logo, email, password } = req.body;
    if (
      name === '' ||
      description === '' ||
      status === '' ||
      logo === '' ||
      email === '' ||
      password === ''
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const role = 'Instructor';

    axios
      .post(`${process.env.USER_SERVICE_URL}/register`, {
        email,
        password,
        role,
      })
      .then(async (response) => {
        if (response.status === 201) {
          const company = new Company({
            name,
            description,
            logo,
            status,
            userId: response.data._id,
          });

          await company.save();

          res.status(201).json({});
        } else {
          return res.status(404).json({ error: response.data.error });
        }
      })
      .catch((error) => {
        // console.log(error);
        return res.status(404).json({ error: 'Error creating company' });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Delete the old logo from cloudinary
    if (req.body.logo) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const publicId = company.logo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const publicId = company.logo.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyNames = async (req, res) => {
  try {
    // Error fetching companies Error: Invalid select: select only takes 1 argument
    const companies = await Company.find().select('name');

    res.status(200).json({ companies });
  } catch (error) {
    console.error('Error fetching companies', error);
    res.status(500).json({ error: error.message });
  }
};

export const getComapanies = async (req, res) => {
  try {
    const companies = await Company.find({}, 'name  logo');
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
