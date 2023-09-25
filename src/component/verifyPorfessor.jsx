import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Table from "./common/table";

function VerifyPorfessor(props) {
  const navItems = [
    { name: "Home", link: "/universityProfile" },
    { name: "Approval of professors' profiles", link: "/verifyPorfessor" },
  ];

  const columns = [
    { path: "firstName", label: "Name" },
    { path: "lastName", label: "Last Name" },
    {
      key: "edit",
      content: (porfessor) => (
        <div>
          {!porfessor.verify && (
            <button
              onClick={() => (
                auth.verifyPorfessor(porfessor.id), setFlag(!flag)
              )}
              className="btn btn-primary btn-sm me-3"
            >
              Confirm
            </button>
          )}
          <button
            onClick={() => (auth.deletePorfessor(porfessor.id), setFlag(!flag))}
            className="btn btn-outline-danger btn-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const [currentUser, setCurrentUser] = useState();
  const [filterPorfessor, setFilterPorfessor] = useState([
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
    },
  ]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    async function setUser() {
      const university = await auth.getUniversities();
      setCurrentUser(
        university.find((uni) => uni.email === auth.getCurrentUser())
      );

      const uni = university.find((uni) => uni.email === auth.getCurrentUser());
      const porfessors = await auth.getPorfessors();
      setFilterPorfessor(
        porfessors.filter((por) => por.university === uni.universityName)
      );
    }

    setUser();
  }, [flag]);

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
          <h1 className="m-5">Approval of professors' profiles</h1>
          <Table columns={columns} data={filterPorfessor} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default VerifyPorfessor;
