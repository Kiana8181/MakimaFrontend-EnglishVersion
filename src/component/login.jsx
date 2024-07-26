import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../sevices/authService";
import LoginImage from "../images/loginImage";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    valid: false,
    isLoading: false,
  };

  validateAll = () => {
    console.log(
      this.validateUsername(this.state.data.username),
      this.validatePassword(this.state.data.password)
    );
    return this.validateUsername(this.state.data.username) ||
      this.validatePassword(this.state.data.password) ||
      this.state.isLoading
      ? false
      : true;
  };

  validateProperty = (item, value) => {
    if (item === "username") return this.validateUsername(value);
    if (item === "password") return this.validatePassword(value);
  };

  validateUsername = (value) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.trim() === "" && value.length === 0) {
      return "Username (email) is required";
    } else if (!value.match(validRegex)) {
      return "The email is invalid.";
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
      this.setState({ isLoading: true });
      const { data } = this.state;
      await auth.login(data.username, data.password);
      this.setState({ isLoading: false });
      this.setState({ valid: true });
    } catch (ex) {
      this.setState({ isLoading: false });
      toast.error("An unexpected error has occurred");
    }
  };

  render() {
    if (this.state.valid) return <Navigate to="/profile" />;
    if (auth.getCurrentUser()) return <Navigate to="/profile" />;
    return (
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-12 col-md-6"
          style={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1", marginLeft: "10%", marginRight: "10%" }}>
            <h1>Login</h1>
            <p style={{ color: "#8A8A8A" }}>
              welcome. Please login to your account!
            </p>
            <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
            <div style={{ textAlign: "center", marginTop: "8px" }}>
              <p>
                Not registered?
                <Link to="/registerUniversity"> Create an account</Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-12 col-md-6 d-none d-md-block"
          style={{
            backgroundColor: "#071330",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginImage />
        </div>
      </div>
    );
  }
}

export default Login;
