import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import ChooseUniversity from "./common/chooseUniversity";
import RegisterImage from "../images/registerImage";
import Form from "./common/form";
import "../App.css";
import Redirect from "./common/navigator";

class RegisterProfessor extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      records: "",
      typeOfSpecialization: "",
      degreeOfEducation: "",
      encyclopedia: "",
      university: "",
      profileImage: "",
      password: "",
    },
    errors: {},
  };

  validateProperty = (item, value) => {
    if (item === "email") return this.validateEmail(value);
    if (item === "password") return this.validatePassword(value);
  };

  validateEmail = (value) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.trim() === "" && value.length === 0) {
      return "Email is required";
    } else if (!value.match(validRegex)) {
      return "The email is invalid";
    } else return false;
  };

  validatePassword = (value) => {
    if (value.trim() === "") return "Password is required";
    else if (
      !(typeof value === "string" && value.trim() !== "" && value.length >= 4)
    )
      return "Password must contain at least 4 characters";
    else return false;
  };

  validateAll = () => {
    var validate =
      this.validateEmail(this.state.data.email) ||
      this.validatePassword(this.state.data.password)
        ? false
        : true;
    return (
      this.state.data.firstName !== "" &&
      this.state.data.lastName !== "" &&
      this.state.data.records !== "" &&
      this.state.data.typeOfSpecialization !== "" &&
      this.state.data.degreeOfEducation !== "" &&
      this.state.data.encyclopedia !== "" &&
      this.state.data.university !== "" &&
      this.state.data.profileImage !== "" &&
      validate
    );
  };

  setUniversity = (name) => {
    const data = { ...this.state.data };
    data.university = name;
    this.setState({ data });
  };

  doSubmit = async () => {
    try {
      const {
        firstName,
        lastName,
        email,
        records,
        typeOfSpecialization,
        degreeOfEducation,
        encyclopedia,
        university,
        profileImage,
        password,
      } = this.state.data;

      const body = {
        username: email,
        password: password,
      };

      const result1 = await auth.addUser(body);

      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("records", records);
      formData.append("email", email);
      formData.append("typeOfSpecialization", typeOfSpecialization);
      formData.append("degreeOfEducation", degreeOfEducation);
      formData.append("profileImage", profileImage);
      formData.append("university", university);
      formData.append("encyclopedia", encyclopedia);
      formData.append("user", result1.id);

      const result2 = await auth.PorfessortRegister(formData);

      Redirect("/login");
    } catch (ex) {
      toast.error("An unexpected error has occurred");
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/profile" />;
    return (
      <div className="d-flex align-items-stretch">
        <div className="row" style={{ flex: "1" }}>
          <div
            className="col-12 col-md-6 registerImage d-none d-md-block"
            style={{
              backgroundColor: "#071330",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RegisterImage />
          </div>
          <div
            className="col-12 col-md-6"
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              paddingTop: "10vh",
              paddingBottom: "10vh",
            }}
          >
            <div style={{ flex: "1", marginLeft: "10%", marginRight: "10%" }}>
              <h1>Register</h1>
              <p style={{ color: "#8A8A8A" }}>
                Please enter your information to register.
              </p>
              <div
                className="row my-5 justify-content-center"
                style={{ textAlign: "center" }}
              >
                <div className="col-3">
                  <Link to="/registerUniversity">
                    <button className="btn btn-outline-primary">
                      University
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to="/registerProfessor">
                    <button className="btn btn-primary">Professor</button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to="/registerStudent">
                    <button className="btn btn-outline-primary">Student</button>
                  </Link>
                </div>
              </div>
              <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
                {this.renderInput("firstName", "Name")}
                {this.renderInput("lastName", "Last name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("records", "Records")}
                {this.renderInput(
                  "typeOfSpecialization",
                  "Type of specialization"
                )}
                {this.renderInput("degreeOfEducation", "Degree of Education")}
                {this.renderInputUpload(
                  "encyclopedia",
                  "End of education encyclopedia",
                  "application/pdf"
                )}
                {this.renderInputChoose(
                  "university",
                  "University where teaching"
                )}
                {this.renderInputUpload(
                  "profileImage",
                  "Personal photo",
                  "image/*"
                )}
                {this.renderInput("password", "Password")}
                {this.renderButton("Register")}
              </form>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>
                  Already registered? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ChooseUniversity setUniversity={this.setUniversity} />
      </div>
    );
  }
}

export default RegisterProfessor;
