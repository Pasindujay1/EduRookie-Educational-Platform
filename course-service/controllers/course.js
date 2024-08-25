import cloudinary from '../middlewares/cloudinary.js';
import Content from '../models/Content.js';
import Course from '../models/Course.js';
import Question from '../models/Questions.js';
import Quiz from '../models/Quiz.js';
import axios from 'axios';
import Company from '../models/Company.js';

export const createCourse = async (req, res) => {
  const { title, description, category, instructor, image, price } = req.body;

  if (
    title === '' ||
    description === '' ||
    category === '' ||
    image === '' ||
    price === '' ||
    instructor === ''
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const companyId = await Company.findOne({ userId: instructor });

  if (!companyId) {
    return res.status(404).json({ error: 'Company not found' });
  }

  try {
    // Create a product in Stripe
    const { data: stripeProduct } = await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/create-product`,
      {
        name: title,
        price: price * 100,
        images: [image],
      }
    );
    console.log('🚀 ~ createCourse ~ stripeProduct:', stripeProduct);
    const course = new Course({
      title,
      description,
      category,
      company: companyId,
      image,
      price,
      stripeProductId: stripeProduct.default_price.id,
      status: 'draft',
    });

    await course.save();

    // http://localhost:8005/send-notification
    await axios.post(
      `${process.env.NOTIFICATION_SERVICE_URL}/send-notification`,
      {
        studentEmails: ['donzchamika@gmail.com'],
        subject: 'EduRookie - New Course Created',
        message:
          'Course created successfully! Please check the course list for more details.',
      }
    );

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      companyId,
      image,
      price,
      courseId,
      content,
    } = req.body;

    if (
      title === '' ||
      description === '' ||
      category === '' ||
      companyId === '' ||
      image === '' ||
      price === '' ||
      courseId === ''
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Delete the existing image
    const publicId = course.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Update the course
    course.title = title;
    course.description = description;
    course.category = category;
    course.image = image;
    course.price = price;
    course.company = companyId;
    course.content = content;

    await course.save();

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourseStatus = async (req, res) => {
  try {
    const { status, courseId } = req.body;

    if (status === '' || courseId === '') {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    course.status = status;
    await course.save();

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  // Delete the course and course image
  try {
    const course = await Course.findById(req.params.id);
    console.log('🚀 ~ deleteCourse ~ course:', course);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Delete the existing image
    if (course.image) {
      const publicId = course.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseNameAndId = async (req, res) => {
  try {
    const courses = await Course.find().select('title _id');
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCourseByUserId = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization;
    console.log('🚀 ~ getCourseByUserId ~ jwtToken:', jwtToken);

    async function fecthUser() {
      try {
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/me`, {
          headers: {
            Authorization: jwtToken,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error('User cannot be found!');
      }
    }
    const user = await fecthUser();
    console.log('🚀 ~ getCourseByUserId ~ user:', user);
    const userId = user._id;
    const company = await Company.findOne({ userId: userId });
    console.log('🚀 ~ getCourseByUserId ~ company:', company);

    const courses = await Course.find({ company: company._id }).select(
      'title image description'
    );
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      status: 'published',
    }).populate('company', '-description -status');
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('company')
      .populate({
        path: 'content',
        populate: {
          path: 'quiz',
          model: 'Quiz',
          populate: {
            path: 'questions',
            model: 'Question',
          },
        },
      });
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseWithCompany = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('company');
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllDraftCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, '_id title status image');
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addContent = async (req, res) => {
  try {
    const { note, video, quiz, courseId, type, status, order } = req.body;

    if (type === '' || status === '') {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const course = await Course.findById(courseId).populate('content');

    // Check if there is already a content with the same order
    const existingContent = course.content.find(
      (content) => content.order === order
    );

    if (existingContent) {
      // If there is, increment the order of that content and all contents with a greater order by 1
      course.content
        .filter((content) => content.order >= order)
        .forEach(async (content) => {
          content.order += 1;
          await content.save();
        });
    }

    const content = new Content();

    if (type === 'video') {
      content.video = video;
    } else if (type === 'note') {
      content.note = note;
    } else {
      const questions = await Promise.all(
        quiz.questions.map(async (q) => {
          const question = new Question({
            question: q.question,
            options: q.options,
          });
          await question.save();
          return question;
        })
      );

      const newQuiz = new Quiz({
        title: quiz.title,
        questions,
      });

      await newQuiz.save();
      content.quiz = newQuiz;
    }
    content.type = type;
    content.status = status;
    content.order = order;

    await content.save();

    course.content.push(content._id);
    await course.save();

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      'content'
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const content = await Content.findById(req.params.contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Decrement the order of contents that have an order greater than the one being deleted
    course.content
      .filter((c) => c.order > content.order)
      .forEach(async (c) => {
        c.order -= 1;
        await c.save();
      });

    // Delete the existing content
    const publicId = content.content.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await content.remove();
    course.content.pull(content._id);
    await course.save();

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// search course by title
export const searchCourse = async (req, res) => {
  const { title } = req.params;
  console.log('🚀 ~ searchCourse ~ title:', title);
  try {
    const courses = await Course.find({
      title: { $regex: title, $options: 'i' },
    });

    //id and title of the course
    const courseNameAndId = courses.map((course) => ({
      _id: course._id,
      title: course.title,
    }));

    res.status(200).json({ courses: courseNameAndId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
