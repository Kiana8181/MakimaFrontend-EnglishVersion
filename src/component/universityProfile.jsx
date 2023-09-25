import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import Footer from "./common/footer";
import Navbar from "./common/navbar";
import icons from "./common/icons";

function UniversityProfile(props) {
  const navItems = [
    { name: "Home", link: "/universityProfile" },
    { name: "Approval of professors' profiles", link: "/verifyPorfessor" },
  ];

  const [currentUser, setCurrentUser] = useState({
    universityName: "",
    email: "",
    address: "",
    id: "",
    phoneNumber: "",
    type: "",
    logo: "",
    user: "",
  });

  useEffect(() => {
    async function setUser() {
      const university = await auth.getUniversities();
      setCurrentUser(
        university.find((uni) => uni.email === auth.getCurrentUser())
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
                  {currentUser.logo ? (
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "100%",
                      }}
                      src={currentUser.logo}
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
                <h3 className="card-title">{currentUser.universityName}</h3>
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
                      Phone number:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">{currentUser.phoneNumber}</h4>
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
                      Address:
                    </h4>
                  </div>
                  <div className="col" style={{ verticalAlign: "middle" }}>
                    <h4 className="card-text">{currentUser.address}</h4>
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

export default UniversityProfile;
