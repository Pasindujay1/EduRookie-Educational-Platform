import React, { useEffect, useState } from "react";
import { COURSE_SERVICE_BASE_URL } from "../config/config";
import { Card, Col, Row, Form } from "react-bootstrap";

const CourseStatusScreen = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const statusOptions = ["draft", "published", "unpublished"];

  const getCourses = async () => {
    try {
      const response = await fetch(
        `${COURSE_SERVICE_BASE_URL}/fetchAllDraftCourses`
      );
      const data = await response.json();
      if (!data.error) {
        setCourses(data.courses);
        console.log(data.courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (courseId, newStatus) => {
    try {
      const response = await fetch(
        `${COURSE_SERVICE_BASE_URL}/updateCourseStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus, courseId }),
        }
      );
      const data = await response.json();
      if (!data.error) {
        getCourses(); // refresh the courses
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container ">
      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col xs={12} sm={6} md={4} lg={3} key={course._id}>
              <Card
                style={{ width: "100%", marginBottom: "20px" }}
                // onClick={() => onclickCourse(course._id)}
              >
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Form.Control
                    as="select"
                    value={course.status}
                    onChange={(e) =>
                      handleStatusChange(course._id, e.target.value)
                    }
                  >
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Control>
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

export default CourseStatusScreen;
