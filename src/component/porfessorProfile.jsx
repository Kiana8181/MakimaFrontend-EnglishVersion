import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Footer from "./common/footer";
import Navbar from "./common/navbar";
import icons from "./common/icons";

function PorfessorProfile(props) {
  const navItems = [
    { name: "Home", link: "/porfessorProfile" },
    { name: "View Lessons", link: "/seeCoursePorfessor" },
    { name: "View Scores", link: "/seeCoursePorfessor" },
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
    <div>
      <Navbar navItems={navItems} />
      <div
        className="container my-5"
        style={{ backgroundColor: "#FDFDFD", borderRadius: "20px" }}
      >
        <div className="p-5">
          <div className="card" style={{ backgroundColor: "#EEEEEE" }}>
            <div className="card-body row align-items-center">
              <div className="col-2 ms-2" style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "15px" }}>
                  {currentUser.profileImage ? (
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "100%",
                      }}
                      src={currentUser.profileImage}
                      alt="picUser"
                    />
                  ) : (
                    <div style={{ marginBottom: "15px" }}>
                      {icons.PersonCircle("100%")}
                    </div>
                  )}
                </div>
              </div>
              <div
                className="col-9"
                style={{
                  fontWeight: "bold",
                }}
              >
                <h3 className="card-title">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="card-text" style={{ color: "#738FA7" }}>
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pe-5 ps-5 pb-5">
          <div className="card" style={{ backgroundColor: "#EEEEEE" }}>
            <div className="card-body">
              <div className="ms-2">
                <h2 className="card-title">Further information:</h2>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      University of Teaching:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">{currentUser.university}</h4>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      Records:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">{currentUser.records}</h4>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      Degree:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">
                      {currentUser.degreeOfEducation}
                    </h4>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      Type of Specialization:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">
                      {currentUser.typeOfSpecialization}
                    </h4>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      Accepted:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <input
                      className="form-check-input"
                      onChange={() => {}}
                      style={{ fontSize: "25px" }}
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      checked={currentUser.verify}
                    />
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col">
                    <h4 className="card-text" style={{ color: "#738FA7" }}>
                      End of Education Encyclopedia:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <div className="card-text">
                      <a
                        href={currentUser.encyclopedia}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {icons.pdf()}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PorfessorProfile;
