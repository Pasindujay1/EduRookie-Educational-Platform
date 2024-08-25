import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CommonContext from "../context/CommonContext";

const CompanyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { setSelectedCourseId } = useContext(CommonContext);

  useEffect(() => {
    getCourseByUserId();
  }, []);

  const getCourseByUserId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/course/getCourseByUserId",
        {
          headers: {
            //Bearer token

            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();

      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  };
  const onclickCourse = (course) => {
    console.log(course);
    setSelectedCourseId(course);
    localStorage.setItem("selectedCourseId", course);
    navigate("/updateContent");
  };
  return (
    <div className="container ">
      <Row>
        {courses ? (
          courses.map((course) => (
            <Col xs={12} sm={6} md={4} lg={3} key={course._id}>
              <Card
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={() => onclickCourse(course._id)}
              >
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  {/* <Card.Text>{course.description}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h1>No courses found</h1>
        )}
      </Row>
    </div>
  );
};

export default CompanyCourses;
