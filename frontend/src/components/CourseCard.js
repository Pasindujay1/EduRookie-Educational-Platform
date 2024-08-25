import React from "react";

//CourseCard functional component
const CourseCard = ({
  title,
  image,
  price,
  company,
  description,
  onclickCourse,
  _id,
}) => {
    // Render the CourseCard component

  return (
    <div className='card' onClick={() => onclickCourse(_id)}>
      <img
        src={image}
        className='card-img-top'
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        {/* <p className="card-text">Price: {price}</p> */}
        {company && (
          <>
            <div className='d-flex justify-content-start g-2'>
              <div style={{ height: "15px", width: "15px", marginLeft: "0px" }}>
                <img
                  src={company.logo}
                  alt={title}
                  className='img-fluid rounded-circle me-3'
                />
              </div>
              <p className='card-text' style={{ marginLeft: "10px" }}>
                {company.name}
              </p>
            </div>
          </>
        )}
        <p className='card-text'>Price: Rs. {price}</p>
      </div>
    </div>
  );
};

// Export the CourseCard component as the default export
export default CourseCard;
