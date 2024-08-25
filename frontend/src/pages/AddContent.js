import React, { useContext, useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ToastContext from "../context/ToastContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddContent = () => {
  const { toast } = useContext(ToastContext);

  const [content, setContent] = useState({
    type: "note",
    note: "",
    video: "",
    status: "draft",
    courseId: "",
  });

  const [courses, setCourses] = useState([]);

  const [quiz, setQuiz] = useState({
    title: "",
    questions: [],
  });

  useEffect(() => {
    getCourseNameAndId();
  }, []);

  const handleQuestionChange = (e, questionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].question = e.target.value;
    setQuiz({ ...quiz, questions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options[optionIndex].option = e.target.value;
    setQuiz({ ...quiz, questions });
  };

  const handleIsCorrectChange = (e, questionIndex, optionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options[optionIndex].isCorrect = e.target.checked;
    setQuiz({ ...quiz, questions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  const [error, setError] = useState("");

  const validateContent = () => {
    if (content.type === "" || content.status === "") {
      setError("All fields are required");
      return true;
    }
    // Check video or note or quiz
    if (content.type === "video" && content.video === "") {
      setError("Video is required");
      return true;
    }
    if (content.type === "note" && content.note === "") {
      setError("Note is required");
      return true;
    }
    if (content.type === "quiz" && quiz.questions.length === 0) {
      setError("At least one question is required for the quiz");
      return true;
    }
    return false;
  };

  const addContent = async () => {
    if (validateContent()) return;
    try {
      const response = await fetch("http://localhost:8001/course/addContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...content, quiz }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        toast.success("Content added successfully!");
        clearAllDetails();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getCourseNameAndId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/course/getCourseNameAndId"
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data.courses);
        setContent({ ...content, courseId: data.courses[0]._id });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const clearAllDetails = () => {
    setContent({
      type: "note",
      note: "",
      video: "",
      status: "draft",
    });
    setQuiz({
      title: "",
      questions: [],
    });
  };

  return (
    <div className="container w-50 shadow p-4 my-3 h-50">
      <h1 className="mb-4 d-flex justify-content-center">Add Content</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <select
            name="course"
            id="course"
            className="form-select"
            value={content.courseId}
            onChange={(e) => {
              setContent({ ...content, courseId: e.target.value });
            }}
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="order" className="form-label">
            Order
          </label>
          <input
            type="number"
            className="form-control"
            id="order"
            placeholder="Enter order here..."
            value={content.order}
            onChange={(e) => setContent({ ...content, order: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type of Content
          </label>
          <select
            name="type"
            id="type"
            className="form-select"
            value={content.type}
            onChange={(e) => setContent({ ...content, type: e.target.value })}
          >
            <option value="video">Video</option>
            <option value="quiz">Quiz</option>
            <option value="note">Note</option>
          </select>
        </div>
        {content.type === "note" && (
          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Note
            </label>
            <ReactQuill
              id="note"
              value={content.note}
              onChange={(value) => setContent({ ...content, note: value })}
            />
          </div>
        )}
        {content.type === "video" && (
          <div className="mb-3">
            <label htmlFor="video" className="form-label">
              Upload the video
            </label>
            <UploadWidget
              onUpload={(video) => setContent({ ...content, video })}
            />
          </div>
        )}
        {content.type === "quiz" && (
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Quiz Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter quiz title here..."
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
            <label htmlFor="questions" className="form-label">
              Questions and Options (Select the correct answer)
            </label>
            {quiz.questions.map((q, questionIndex) => (
              <div key={questionIndex}>
                <label
                  htmlFor={`question-${questionIndex}`}
                  className="form-label"
                >
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  id={`question-${questionIndex}`}
                  placeholder="Enter question here..."
                  value={q.question}
                  onChange={(e) => handleQuestionChange(e, questionIndex)}
                />
                {q.options.map((o, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      className="form-control  ms-3 w-75"
                      id={`option-${questionIndex}-${optionIndex}`}
                      placeholder={"Enter option " + (optionIndex + 1)}
                      value={o.option}
                      onChange={(e) =>
                        handleOptionChange(e, questionIndex, optionIndex)
                      }
                    />
                    <input
                      type="checkbox"
                      className="form-check-input ms-3 mb-2 me-3"
                      id={`isCorrect-${questionIndex}-${optionIndex}`}
                      checked={o.isCorrect}
                      onChange={(e) =>
                        handleIsCorrectChange(e, questionIndex, optionIndex)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`isCorrect-${questionIndex}-${optionIndex}`}
                    >
                      Correct Answer {optionIndex + 1}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <AddCircleOutlineRoundedIcon
              className="ms-3"
              onClick={addQuestion}
            ></AddCircleOutlineRoundedIcon>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="form-select"
            value={content.status}
            onChange={(e) => setContent({ ...content, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn"
            onClick={addContent}
            style={{ borderColor: "#0455bf", color: "#0455bf" }}
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
