import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../sevices/authService";
import Logo from "../images/mainLogo.png";
import "../App.css";

function Home(props) {
  if (auth.getCurrentUser()) return <Navigate to="/profile" />;
  return (
    <div
      className="landingPageBackgroundImage"
      style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="homepageCard"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="card">
          <div style={{ textAlign: "center" }}>
            <img
              src={Logo}
              className="card-img-top"
              alt="Logo "
              style={{ height: "50%", width: "50%" }}
            />
          </div>

          <div className="card-body">
            <h5 className="card-title" style={{ color: "#212529" }}>
              Welcome to Makima
            </h5>
            <p className="card-text" style={{ color: "#212529" }}>
              Makima, the survey system of universities
            </p>
            <Link to="/login" className="btn btn-primary col-12 my-2">
              Login
            </Link>
            <Link
              to="/registerUniversity"
              className="btn btn-primary col-12 my-2"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
