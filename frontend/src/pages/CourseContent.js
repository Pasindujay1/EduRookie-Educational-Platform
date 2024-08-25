import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const CourseContent = () => {
  const { setIsEnrolled, isEnrolled } = useContext(CommonContext);
  const [course, setCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ CourseContent ~ user:", user);
  const navigate = useNavigate();
  const selectedCourseId = localStorage.getItem("selectedCourseId");

  useEffect(() => {
    handleCourseClick();
  }, [selectedCourseId]);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    handleCourseClick();
    getEnrolledCourses(selectedCourseId);
  }, []);

  const getEnrolledCourses = async (selectedCourseId) => {
    // if the user is null shows the Loading component
    if (!user) {
      return <Loading text='Loading' />;
    }

    const data = await fetch(
      `http://localhost:8003/enrollment/isEnrolled/${user._id}/${selectedCourseId}`
    );
    const response = await data.json();
    console.log("🚀 ~ getEnrolledCourses ~ response:", response);
    if (response.isEnrolled) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false);
    }
  };

  const handleCourseClick = async () => {
    const data = await fetch(
      `http://localhost:8001/course/getCourseById/${selectedCourseId}`
    );
    const response = await data.json();
    const sortedContent = response.course.content.sort(
      (a, b) => a.order - b.order
    );

    setCourse({
      ...response.course,
      content: sortedContent,
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = course?.content.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAnswerChange = (questionIndex, optionId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionId }));
  };

  const handleEnrollment = async () => {
    const data = await fetch(`http://localhost:8004/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //array of courses
        courses: [
          {
            stripeProductId: course.stripeProductId,
            quantity: 1,
          },
        ],
      }),
    });
    const response = await data.json();
    window && window.open(response.url, "_self");

    setIsEnrolled(true);
  };

  return (
    <Container>
      {course && (
        <Row>
          <Col md={8}>
            <h2>{course.title}</h2>

            {isEnrolled ? (
              <>
                {currentItems.map((item, index) => {
                  switch (item.type) {
                    case "note":
                      return (
                        <Card key={index} className='mb-3'>
                          <Card.Body>
                            <div
                              dangerouslySetInnerHTML={{ __html: item.note }}
                            />
                          </Card.Body>
                        </Card>
                      );
                    case "video":
                      return (
                        <Card key={index} className='mb-3'>
                          <Card.Body>
                            <video
                              controls
                              src={item.video}
                              className='img-fluid'
                            />
                          </Card.Body>
                        </Card>
                      );
                    case "quiz":
                      return (
                        <Card key={index} className='mb-3'>
                          <Card.Body>
                            <Card.Title>{item.quiz.title}</Card.Title>
                            {item.quiz.questions.map((question, qIndex) => (
                              <Form.Group key={qIndex}>
                                <Form.Label>{question.question}</Form.Label>
                                {question.options.map((option, oIndex) => (
                                  <Form.Check
                                    type='radio'
                                    id={`option-${qIndex}-${oIndex}`}
                                    label={option.option}
                                    name={`question-${qIndex}`}
                                    key={oIndex}
                                    onChange={() =>
                                      handleAnswerChange(qIndex, option._id)
                                    }
                                    style={{
                                      color:
                                        selectedAnswers[qIndex] === option._id
                                          ? option.isCorrect
                                            ? "green"
                                            : "red"
                                          : "black",
                                    }}
                                  />
                                ))}
                              </Form.Group>
                            ))}
                          </Card.Body>
                        </Card>
                      );
                    default:
                      return null;
                  }
                })}

                <Pagination className='justify-content-center'>
                  {course.content.map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                      style={{
                        cursor: "pointer",
                        userSelect: "none",
                        outline: "none",
                      }}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </>
            ) : (
              <>
                <Container>
                  <Card>
                    <Card.Body>
                      <Card.Body className='d-flex justify-content-center'>
                        <Card.Img
                          className='img-fluid w-50'
                          variant='top'
                          src={course.image}
                        />

                        <Card.Text
                          className='mx-3 '
                          dangerouslySetInnerHTML={{
                            __html: course.description,
                          }}
                        />
                      </Card.Body>
                      <Card.Text
                        className='d-flex justify-content-center'
                        style={{ fontSize: "1.5rem" }}
                      >
                        Rs. {course.price}/=
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Button
                    onClick={() => {
                      handleEnrollment();
                    }}
                    className='mt-3 d-block mx-auto'
                  >
                    Enroll Now
                  </Button>
                </Container>
              </>
            )}
          </Col>

          <Col md={4}>
            <Card style={{ marginTop: "47px" }}>
              <Card.Img variant='top' src={course.company.logo} />
              <Card.Body>
                <Card.Title>{course.company.name}</Card.Title>
                <Card.Text>{course.company.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CourseContent;
