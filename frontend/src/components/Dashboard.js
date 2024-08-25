import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";
import dash1 from "../assets/dashboard1.png";
import dash2 from "../assets/dashboard2.jpg";
import dash3 from "../assets/dashboard3.jpg";
import dash4 from "../assets/dashboard4.jpg";

const Slide1 = () => {
  return (
    <div
      className=' d-flex justify-content-between p-5 h-100 w-100 my-2 rounded border'
      style={{ backgroundColor: "#40E0D0" }}
    >
      <div className='bg-light border rounded p-3 w-25 h-25'>
        <h5>Lead your best life with new skills</h5>
        <p>
          Grow your career and pursue your passions with courses from $9.99
          through May 23.
        </p>
      </div>
      <img
        variant='top'
        src={dash1}
        className='ml-auto border rounded p-3'
        style={{ width: "25%", height: "25%" }}
      />
    </div>
  );
};

const Slide2 = () => {
  return (
    <div
      className=' d-flex justify-content-between p-5 h-100 w-100 my-2 rounded border'
      style={{ backgroundColor: "#40E0D0" }}
    >
      <div className='bg-light border rounded p-3 w-25 h-25'>
        <h5>Discover endless learning possibilities</h5>
        <p>
          Unlock your potential and explore new opportunities with our diverse
          range of courses.
        </p>
      </div>
      <img
        variant='top'
        src={dash2}
        className='ml-auto border rounded p-3'
        style={{ width: "25%", height: "25%" }}
      />
    </div>
  );
};

const Slide3 = () => {
  return (
    <div
      className=' d-flex p-5 justify-content-between h-100 w-100 my-2 rounded border'
      style={{ backgroundColor: "#40E0D0" }}
    >
      <div className='bg-light border rounded p-3 w-25 h-25'>
        <h5>Stay ahead in your industry</h5>
        <p>
          Keep up-to-date with the latest trends and advancements with our
          expert-led courses.
        </p>
      </div>
      <img
        variant='top'
        src={dash3}
        className='ml-auto border rounded p-3'
        style={{ width: "25%", height: "25%" }}
      />
    </div>
  );
};

const Slide4 = () => {
  return (
    <div
      className=' d-flex p-5 justify-content-between h-100 w-100 my-2 rounded border'
      style={{ backgroundColor: "#40E0D0" }}
    >
      <div className='bg-light border rounded p-3 w-25 h-25'>
        <h5>Unlock new opportunities</h5>
        <p>
          Acquire in-demand skills and open doors to exciting career prospects
          with our courses.
        </p>
      </div>
      <img
        variant='top'
        src={dash4}
        className='ml-auto border rounded p-3'
        style={{ width: "25%", height: "25%" }}
      />
    </div>
  );
};

export { Slide1, Slide2, Slide3, Slide4 };

const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Change image every 10 seconds
  };
  //Render dahsboard component
  return (
    <div
      className='container w-100 h-50 my-2 rounded border'
      style={{ width: "1500px", height: "500px" }} // Increase this value to increase the width of the slider
    >
      <Slider {...settings}>
        <div className='h-100 w-100'>
          <Slide1 /> {/* Include Slide1 component */}
        </div>
        <div className='h-100 w-100'>
          <Slide2 /> {/* Include Slide2 component */}
        </div>
        <div className='h-100 w-100'>
          <Slide3 /> {/* Include Slide3 component */}
        </div>
        <div className='h-100 w-100'>
          <Slide4 /> {/* Include Slide4 component */}
        </div>
      </Slider>
    </div>
  );
};

//Export Dashboard component
export default Dashboard;
