import React, { useContext, useEffect, useState } from 'react';
import UploadWidget from '../components/UploadWidget';
import Loading from '../components/Loading';
import ToastContext from '../context/ToastContext';
import AuthContext from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CreateCourseScreen = () => {
  const [companies, setCompanies] = useState([]);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    company: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  console.log('🚀 ~ CreateCourseScreen ~ user:', user);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await fetch(
        'http://localhost:8001/company/getCompanyNames'
      );
      const data = await response.json();
      setCompanies(data.companies);
    } catch (error) {
      console.error('Error fetching companies', error);
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.category ||
      !courseData.price ||
      !image
    ) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // const formData = new FormData();
    // formData.append("title", courseData.title);
    // formData.append("description", courseData.description);
    // formData.append("category", courseData.category);
    // formData.append("company", courseData.company);
    // formData.append("image", image);
    // console.log("🚀 ~ handleSubmit ~ formData:", formData);

    try {
      const response = await fetch(
        'http://localhost:8001/course/createCourse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...courseData, image, instructor: user._id }),
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        toast.success('Course created successfully!');
        setCourseData({
          title: '',
          description: '',
          category: '',
          company: '',
        });
        setImage(null);
      }
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      navigate('/companyCourses');

      console.log(data);
    } catch (error) {
      console.error('Error creating course', error);
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="container w-50 shadow p-4 my-3 "
      style={{ marginBottom: 700 }}
    >
      <h1 className="mb-2 d-flex justify-content-center">Create Course</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Course Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter course title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={courseData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <ReactQuill
            value={courseData.description}
            onChange={(value) =>
              setCourseData({ ...courseData, description: value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            aria-label="Course category select"
            name="category"
            onChange={(e) => handleChange(e)}
            value={courseData.category}
          >
            <option>Select a course category</option>
            <option value="business">Business & Entrepreneurship</option>
            <option value="computer-science">Computer Science & IT</option>
            <option value="health">Health & Wellness</option>
            <option value="arts">Arts & Design</option>
            <option value="education">Education & Teaching</option>
            <option value="engineering">Engineering & Technology</option>
            <option value="humanities">Humanities & Social Sciences</option>
            <option value="science">Science & Mathematics</option>
            <option value="languages">Language Learning</option>
            <option value="music">Music & Performing Arts</option>
          </select>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <select
            className="form-select"
            id="company"
            name="company"
            onChange={(e) => handleChange(e)}
            value={courseData.company}
          >
            <option>Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div> */}

        <div className="mb-3 d-flex justify-content-start">
          <label htmlFor="image" className="form-label me-3">
            Image
          </label>
          <UploadWidget onUpload={setImage} />
        </div>
        {image && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={image}
            alt="Course Image"
            className="img-fluid w-50 h-50"
            style={{ maxWidth: '100px' }}
          />
        )}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter course price"
            name="price"
            onChange={(e) => handleChange(e)}
            value={courseData.price}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn"
            onClick={(e) => handleSubmit(e)}
            style={{ borderColor: '#0455bf', color: '#0455bf' }}
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseScreen;
