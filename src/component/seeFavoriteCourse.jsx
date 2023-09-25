import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Table from "./common/table";

function SeeFavoriteCourse(props) {
  const navItems = [
    { name: "Home", link: "/studentProfile" },
    { name: "View Lessons", link: "/seeCourseStudent" },
    { name: "List of students' favorite courses", link: "/seeFavoriteCourse" },
  ];

  const columns = [
    { path: "name", label: "Name of Course" },
    { path: "professorName", label: "Professor’s name" },
    { path: "universityName", label: "University of teaching" },
    { path: "avg_rating", label: "Score out of 5" },
  ];

  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    favoriteCourse: [
      { name: "", professorName: "", universityName: "", avg_rating: "" },
    ],
    fieldOfStudy: "",
    grade: "",
    id: "",
    nationalId: "",
    phoneNumber: "",
    studentNumber: "",
    type: "",
    university: "",
    user: "",
  });

  useEffect(() => {
    async function setUser() {
      const student = await auth.getStudents();
      setCurrentUser(
        student.find((stu) => stu.email === auth.getCurrentUser())
      );
    }

    setUser();
  }, []);

  if (!auth.getCurrentUser()) return <Navigate to="/login" />;
  return (
    <React.Fragment>
      <Navbar navItems={navItems} />
      <div
        className="container my-5"
        style={{
          backgroundColor: "#FDFDFD",
          borderRadius: "20px",
          minHeight: "500px",
        }}
      >
        <div className="p-5" style={{ textAlign: "center" }}>
          <h1 className="m-5">Your favorite courses</h1>
          <Table columns={columns} data={currentUser.favoriteCourse} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default SeeFavoriteCourse;
