import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Table from "./common/table";
import CoursesOfPorfessor from "./coursesOfPorfessor";

function SeeCourseStudent(props) {
  const navItems = [
    { name: "Home", link: "/studentProfile" },
    { name: "View Lessons", link: "/seeCourseStudent" },
    { name: "List of students' favorite courses", link: "/seeFavoriteCourse" },
  ];

  const [currentPorfessor, setCurrentPorfessor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    records: "",
    typeOfSpecialization: "",
    degreeOfEducation: "",
    id: "",
    encyclopedia: "",
    profileImage: "",
    verify: "",
    type: "",
    university: "",
    user: "",
    courses: [
      {
        id: "",
        name: "",
        description: "",
        no_of_ratings: "",
        avg_rating: "",
        professorName: "",
        universityName: "",
        comments: [],
        resourse: [{ id: "", recours: "" }],
      },
    ],
  });
  const columns = [
    { path: "lastName", label: "Professor's Name" },
    { path: "university", label: "University of Teaching" },
    {
      key: "see",
      content: (porfessor) => (
        <button
          onClick={() => {
            setCurrentPorfessor(porfessor);
          }}
          className="btn btn-primary btn-sm me-3"
          data-bs-toggle="modal"
          data-bs-target="#coursesOfPorfessor"
        >
          view
        </button>
      ),
    },
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

  const [porfessor, setPorfessor] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      records: "",
      typeOfSpecialization: "",
      degreeOfEducation: "",
      id: "",
      encyclopedia: "",
      profileImage: "",
      verify: "",
      type: "",
      university: "",
      user: "",
      courses: [
        {
          id: "",
          name: "",
          description: "",
          no_of_ratings: "",
          avg_rating: "",
          professorName: "",
          universityName: "",
          comments: [],
          resourse: [{ id: "", recours: "" }],
        },
      ],
    },
  ]);

  useEffect(() => {
    async function setUser() {
      const student = await auth.getStudents();
      setCurrentUser(
        student.find((stu) => stu.email === auth.getCurrentUser())
      );

      setPorfessor(await auth.getPorfessors());
    }

    setUser();
  }, [currentPorfessor]);

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
          <h1 className="m-5">Available Courses</h1>
          <Table columns={columns} data={porfessor} />
        </div>
      </div>
      <Footer />
      <CoursesOfPorfessor courses={currentPorfessor.courses} />
    </React.Fragment>
  );
}

export default SeeCourseStudent;
