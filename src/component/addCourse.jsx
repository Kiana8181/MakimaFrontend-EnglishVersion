import React from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../sevices/authService";
import Form from "./common/form";
import ChooseUniversity from "./common/chooseUniversity";
import AddCourseImage from "../images/addCourseImage";
import Redirect from "./common/navigator";

class AddCourse extends Form {
  state = {
    data: {
      name: "",
      description: "",
      recours: "",
      universityName: "",
      professorName: "",
    },
    errors: {},
    currentUser: [
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
    ],
  };

  async componentDidMount() {
    const porfessor = await auth.getPorfessors();
    this.setState({
      currentUser: porfessor.find((pro) => pro.email === auth.getCurrentUser()),
    });
  }

  validateProperty = (item, value) => {};

  validateAll = () => {
    return (
      this.state.data.universityName !== "" &&
      this.state.data.name !== "" &&
      this.state.data.description !== "" &&
      this.state.data.recours !== ""
    );
  };

  setUniversity = (name) => {
    const data = { ...this.state.data };
    data.universityName = name;
    this.setState({ data });
  };

  doSubmit = async () => {
    try {
      const { name, description, recours, universityName } = this.state.data;

      const body = {
        name: name,
        description: description,
        professorName: `${this.state.currentUser.firstName} ${this.state.currentUser.lastName}`,
        universityName: universityName,
      };

      const result1 = await auth.addCourse(body);

      let formData = new FormData();
      formData.append("recours", recours);

      const result2 = await auth.addResourses(formData);

      const result3 = await auth.sinkSourseCourse(result1.id, result2.id);

      const result4 = await auth.sinkPorfessorCourse(
        this.state.currentUser.id,
        result1.id
      );

      Redirect("/profile");
    } catch (ex) {
      toast.error("An unexpected error has occurred");
    }
  };

  render() {
    if (!auth.getCurrentUser()) return <Navigate to="/login" />;
    return (
      <div>
        <div className="row" style={{ height: "100vh" }}>
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
              <h1>Register a new course</h1>
              <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
                {this.renderInput("name", "Name of Course")}
                {this.renderTextareaInput("description", "Description")}
                {this.renderInputUpload(
                  "recours",
                  "Rsources",
                  "application/pdf"
                )}
                {this.renderInputChoose(
                  "universityName",
                  "University of presentation"
                )}
                {this.renderButton("Save")}
                <Link to="/profile">
                  <button className="btn btn-outline-primary col-12 my-3">
                    Cancel
                  </button>
                </Link>
              </form>
            </div>
          </div>
          <div
            className="col-12 col-md-6 d-none d-md-block"
            style={{
              backgroundColor: "#071330",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AddCourseImage />
          </div>
        </div>
        <ChooseUniversity setUniversity={this.setUniversity} />
      </div>
    );
  }
}

export default AddCourse;
