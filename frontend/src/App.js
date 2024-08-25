import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateCompanyScreen from "./pages/CreateCompanyScreen";
import CreateCourseScreen from "./pages/CreateCourseScreen";
import SampleCourse from "./pages/SampleCourse";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Profile from "./pages/Profile";
import AddContent from "./pages/AddContent";
import CourseContent from "./pages/CourseContent";
import { CommonContextProvider } from "./context/CommonContext";
import CompanyCourses from "./pages/CompanyCourses";
import UpdateCourse from "./pages/UpdateCourse";
import CourseStatusScreen from "./pages/CourseStatusScreen";

import Companies from "./pages/Companies";
import UpdateCompany from "./pages/UpdateCompany";

const App = () => {
  return (
    <ToastContextProvider>
      <CommonContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createCourses" element={<CreateCourseScreen />} />
              <Route
                path="/createCompanyScreen"
                element={<CreateCompanyScreen />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<SampleCourse />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addContent" element={<AddContent />} />
              <Route path="/courseContent" element={<CourseContent />} />
              <Route path="/companyCourses" element={<CompanyCourses />} />
              <Route path="/updateContent" element={<UpdateCourse />} />
              <Route path="/courseStatus" element={<CourseStatusScreen />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/updateCompany" element={<UpdateCompany />} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </CommonContextProvider>
    </ToastContextProvider>
  );
};

export default App;
