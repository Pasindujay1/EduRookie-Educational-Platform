import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Dashboard from '../components/Dashboard';
import CourseCard from '../components/CourseCard';
import CommonContext from '../context/CommonContext';
import {
  COURSE_SERVICE_BASE_URL,
  LEARNER_SERVICE_BASE_URL,
} from '../config/config';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setSelectedCourseId, setIsEnrolled } = useContext(CommonContext);

  const getEnrolledCourses = async (selectedCourseId) => {
    const data = await fetch(
      `${LEARNER_SERVICE_BASE_URL}/isEnrolled/${user._id}/${selectedCourseId}`
    );
    const response = await data.json();
    console.log('🚀 ~ getEnrolledCourses ~ response:', response);
    setIsEnrolled(response);
  };

  useEffect(() => {
    !user && navigate('/login', { replace: true });
  }, []);

  const [courses, setCourses] = useState([]);
  console.log('🚀 ~ Home ~ courses:', courses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetch(
          `${COURSE_SERVICE_BASE_URL}/getAllCourses`
        ).then((res) => res.json());
        setCourses(data.courses);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCourses();
  }, []);
  const onclickCourse = (course) => {
    getEnrolledCourses(course);
    console.log(course);
    setSelectedCourseId(course);
    //store the selected course id in the local storage
    localStorage.setItem('selectedCourseId', course);
    navigate('/courseContent');
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <h2 className=''>Hello User! Welcome to the EduRookie</h2>
      </div>
      <Dashboard />
      <div className='d-flex justify-content-start'>
        <h2 className='ms-3 my-4'>Explore Our Top Courses...</h2>
      </div>
      <div className='container d-flex justify-content-center'>
        <div className='row'>
          {courses.map((course, index) => (
            <div className='col-md-4 mb-4' key={index}>
              <CourseCard {...course} onclickCourse={onclickCourse} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
