import React, { useContext, useEffect } from "react";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import "./Success.css";
import AuthContext from "../context/AuthContext";
import CommonContext from "../context/CommonContext";
import ToastContext from "../context/ToastContext";

function Success() {
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ Success ~ user:", user);
  const { setIsEnrolled } = useContext(CommonContext);
  const { toast } = useContext(ToastContext);

  const enrollCourse = async () => {
    //get the course id from the local storage
    const selectedCourseId = localStorage.getItem("selectedCourseId");
    const response = await fetch(
      `http://localhost:8003/enrollment/addNewEnrollment/${selectedCourseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      setIsEnrolled(true);
      toast.success("Course enrolled successfully!");
    }
  };

  useEffect(() => {
    enrollCourse();
  }, []);

  return (
    <div className='success-container'>
      <div className='success-content'>
        <img
          src='https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif'
          alt='success'
          className='success-icon'
        />
        <h1 className='success-heading'>Thank you for your purchase!</h1>
        <p className='success-message'>
          Your course purchase was successful. Start learning now!
        </p>
        <button
          className='btn btn-primary btn-lg success-btn'
          onClick={() => window.location.replace("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
