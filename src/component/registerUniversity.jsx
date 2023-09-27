import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate, navigate } from "react-router-dom";
import auth from "../sevices/authService";
import RegisterImage from "../images/registerImage";
import Form from "./common/form";
import "../App.css";

class RegisterUniversity extends Form {
  state = {
    data: {
      universityName: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
      logo: "",
    },
    errors: {},
    valid: false,
  };

  validateAll = () => {
    var validate =
      this.validateEmail(this.state.data.email) ||
      this.validatePassword(this.state.data.password)
        ? false
        : true;
    return (
      this.state.data.universityName !== "" &&
      this.state.data.phoneNumber !== "" &&
      this.state.data.email !== "" &&
      this.state.data.address !== "" &&
      this.state.data.password !== "" &&
      this.state.data.logo !== "" &&
      validate
    );
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

  doSubmit = async () => {
    try {
      const { universityName, phoneNumber, email, address, logo, password } =
        this.state.data;

      const body = {
        username: email,
        password: password,
      };

      const result1 = await auth.addUser(body);

      let formData = new FormData();
      formData.append("universityName", universityName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("logo", logo);
      formData.append("user", result1.id);

      const result2 = await auth.UniversitytRegister(formData);
      this.setState({ valid: true });
    } catch (ex) {
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
                    <button className="btn btn-primary">University</button>
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
                    <button className="btn btn-outline-primary">Student</button>
                  </Link>
                </div>
              </div>
              <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
                {this.renderInput("universityName", "University name")}
                {this.renderInput("phoneNumber", "Phone number")}
                {this.renderInput("email", "Email")}
                {this.renderInput("address", "Address")}
                {this.renderInput("password", "Password")}
                {this.renderInputUpload("logo", "Logo", "image/*")}
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
      </div>
    );
  }
}

export default RegisterUniversity;
