import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./component/notFound";
import Home from "./component/home";
import RegisterUniversity from "./component/registerUniversity";
import Login from "./component/login";
import RegisterStudent from "./component/registerStudent";
import RegisterProfessor from "./component/registerProfessor";
import Profile from "./component/profile";
import StudentProfile from "./component/studentProfile";
import PorfessorProfile from "./component/porfessorProfile";
import UniversityProfile from "./component/universityProfile";
import VerifyPorfessor from "./component/verifyPorfessor";
import SeeCoursePorfessor from "./component/seeCoursePorfessor";
import AddCourse from "./component/addCourse";
import SeeFavoriteCourse from "./component/seeFavoriteCourse";
import SeeCourseStudent from "./component/seeCourseStudent";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

document.body.style = "background: #DDE4EB;";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registerUniversity" element={<RegisterUniversity/>}/>
            <Route path="/registerStudent" element={<RegisterStudent/>}/>
            <Route path="/registerProfessor" element={<RegisterProfessor/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/studentProfile" element={<StudentProfile/>}/>
            <Route path="/porfessorProfile" element={<PorfessorProfile/>}/>
            <Route path="/universityProfile" element={<UniversityProfile/>}/>
            <Route path="/verifyPorfessor" element={<VerifyPorfessor/>}/>
            <Route path="/seeCoursePorfessor" element={<SeeCoursePorfessor/>}/>
            <Route path="/addCourse" element={<AddCourse/>} />
            <Route path="/seeFavoriteCourse" element={<SeeFavoriteCourse/>} />
            <Route path="/seeCourseStudent" element={<SeeCourseStudent/>} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/MakimaFrontend-EnglishVersion/#/" />} />
          </Routes>
        </BrowserRouter>
      </main>
    </React.Fragment>
  );
}

export default App;
