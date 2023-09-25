import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Table from "./common/table";

function SeeCoursePorfessor(props) {
  const navItems = [
    { name: "Home", link: "/porfessorProfile" },
    { name: "View Lessons", link: "/seeCoursePorfessor" },
    { name: "View Scores", link: "/seeCoursePorfessor" },
  ];

  const columns = [
    { path: "name", label: "Name of Course" },
    { path: "universityName", label: "University of Teaching" },
    { path: "avg_rating", label: "Your score in this lesson is out of 5" },
  ];
  const [currentUser, setCurrentUser] = useState({
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
    courses: [{ name: "", universityName: "", avg_rating: "" }],
  });

  useEffect(() => {
    async function setUser() {
      const porfessor = await auth.getPorfessors();
      setCurrentUser(
        porfessor.find((pro) => pro.email === auth.getCurrentUser())
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
          <h1 className="m-5">Lessons provided by you</h1>
          <Table columns={columns} data={currentUser.courses} />
          <Link to="/addCourse">
            <button className="btn btn-primary mt-5">Add a new course</button>
          </Link>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default SeeCoursePorfessor;
