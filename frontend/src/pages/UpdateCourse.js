import React, { useContext, useEffect, useState } from 'react';
import CommonContext from '../context/CommonContext';
import ToastContext from '../context/ToastContext';
import Loading from '../components/Loading';
import UploadWidget from '../components/UploadWidget';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
  const { selectedCourseId } = useContext(CommonContext);
  const { toast } = useContext(ToastContext);
  const [course, setCourse] = useState(null);
  console.log('🚀 ~ UpdateCourse ~ course:', course);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    handleCourseClick();
  }, [selectedCourseId]);

  const handleCourseClick = async () => {
    // localStorage.setItem("selectedCourseId", course);
    const courseId = localStorage.getItem('selectedCourseId');
    const data = await fetch(
      `http://localhost:8001/course/getCourseById/${courseId}`
    );
    const response = await data.json();

    // Sort the content based on the order attribute
    const sortedContent = response.course.content.sort(
      (a, b) => a.order - b.order
    );

    // Update the state with the sorted content
    setCourse({
      ...response.course,
      content: sortedContent,
    });
    setImage(response.course.image);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (
      !course.title ||
      !course.description ||
      !course.category ||
      !course.price
    ) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8001/course/updateCourse`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: course.title,
            description: course.description,
            category: course.category,
            companyId: course.company._id,
            price: course.price,
            image: image,
            courseId: selectedCourseId,
            content: course.content || [],
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        toast.success('Course updated successfully!');
        navigate('/companyCourses');
      }
    } catch (error) {
      console.error('Error updating course', error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleDeleteContent = (contentId, e) => {
    // Remove the deleted content from the course state
    e.preventDefault();
    setCourse((prevCourse) => ({
      ...prevCourse,
      content: prevCourse.content.filter(
        (content) => content._id !== contentId
      ),
    }));
  };
  const handleDeleteCourse = async () => {
    //confirm box
    const confirm = window.confirm(
      'Are you sure you want to delete this course?'
    );
    if (!confirm) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8001/course/deleteCourse/${selectedCourseId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Course deleted successfully!');
        navigate('/companyCourses');
      }
    } catch (error) {
      console.error('Error deleting course', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-50 shadow p-4 my-3">
      <h1 className="mb-2 d-flex justify-content-center">Update Course</h1>
      <div className="w-100 d-flex justify-content-end ">
        <Tooltip title="Click to delete the course">
          <IconButton aria-label="delete" onClick={handleDeleteCourse}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {course && (
        <form onSubmit={handleUpdate}>
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
              value={course.title}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <ReactQuill
              placeholder="Enter course description"
              name="description"
              value={course.description}
              onChange={(value) => setCourse({ ...course, description: value })}
            />
            {/* <textarea
              className="form-control"
              id="description"
              placeholder="Enter course description"
              name="description"
              onChange={(e) => handleChange(e)}
              value={course.description}
            ></textarea> */}
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
              value={course.category}
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

          <div className="mb-3 d-flex justify-content-start">
            <label htmlFor="image" className="form-label me-3">
              Image
            </label>
            <UploadWidget onUpload={setImage} />
          </div>
          {image && (
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
              value={course.price}
            />
          </div>
          {course &&
            course.content.map((content, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border p-2 my-2"
              >
                <p>{`Content ${index + 1}: ${content.type}`}</p>
                {/* <button onClick={(e) => handleDeleteContent(content._id, e)}>
                  Delete
                </button> */}
                <Delete
                  onClick={(e) => handleDeleteContent(content._id, e)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              style={{ borderColor: '#0455bf', color: '#0455bf' }}
              onClick={handleUpdate}
            >
              Update Course
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCourse;
