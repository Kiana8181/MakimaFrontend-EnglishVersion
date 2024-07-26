import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import RegisterImage from "../images/registerImage";
import Form from "./common/form";
import ChooseUniversity from "./common/chooseUniversity";
import "../App.css";

class RegisterStudent extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      nationalId: "",
      phoneNumber: "",
      email: "",
      university: "",
      fieldOfStudy: "",
      grade: "",
      studentNumber: "",
      password: "",
    },
    errors: {},
    valid: false,
    isLoading: false,
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
      return "";
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
      this.validatePassword(this.state.data.password) ||
      this.state.isLoading
        ? false
        : true;
    return (
      this.state.data.firstName !== "" &&
      this.state.data.lastName !== "" &&
      this.state.data.nationalId !== "" &&
      this.state.data.phoneNumber !== "" &&
      this.state.data.university !== "" &&
      this.state.data.grade !== "" &&
      this.state.data.studentNumber !== "" &&
      this.state.data.fieldOfStudy !== "" &&
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
      this.setState({ isLoading: true });

      const {
        firstName,
        lastName,
        nationalId,
        email,
        fieldOfStudy,
        phoneNumber,
        studentNumber,
        university,
        grade,
        password,
      } = this.state.data;

      const body1 = {
        username: email,
        password: password,
      };

      const result1 = await auth.addUser(body1);

      const body2 = {
        firstName: firstName,
        lastName: lastName,
        nationalId: nationalId,
        email: email,
        fieldOfStudy: fieldOfStudy,
        phoneNumber: phoneNumber,
        studentNumber: studentNumber,
        university: university,
        grade: grade,
        user: result1.id,
      };

      const result2 = await auth.studentRegister(body2);

      this.setState({ isLoading: false });

      this.setState({ valid: true });
    } catch (ex) {
      this.setState({ isLoading: false });
      toast.error("An unexpected error has occurred");
    }
  };

  render() {
    if (this.state.valid) return <Navigate to="/login" />;
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
                    <button className="btn btn-outline-primary">
                      Professor
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to="/registerStudent">
                    <button className="btn btn-primary">Student</button>
                  </Link>
                </div>
              </div>
              <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
                {this.renderInput("firstName", "Name")}
                {this.renderInput("lastName", "Last name")}
                {this.renderInput("nationalId", "National ID")}
                {this.renderInput("phoneNumber", "Mobile Number")}
                {this.renderInput("email", "Email")}
                {this.renderInputChoose("university", "University of study")}
                {this.renderInput("grade", "Grade")}
                {this.renderInput("fieldOfStudy", "Field of Study")}
                {this.renderInput("studentNumber", "Student Number")}
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

export default RegisterStudent;
