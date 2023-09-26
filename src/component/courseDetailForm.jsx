import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../sevices/authService";
import Form from "./common/form";

class CourseDetailForm extends Form {
  state = {
    data: {
      stars: "",
      comment: "",
      recours: "",
      name: "Anonymous",
    },
    errors: {},
  };

  validateProperty = (item, value) => {
    if (item === "stars") return this.validateStars(value);
  };

  validateStars = (value) => {
    if (
      (!value.match(/^[1-5]+$/) || parseInt(value) > 5 || parseInt.value < 1) &&
      value !== ""
    ) {
      return "Score must be a number between 1 and 5";
    } else return false;
  };

  validateAll = () => {
    const validate = this.validateStars(this.state.data.stars) ? false : true;
    return (
      (this.state.stars !== "" ||
        this.state.comment !== "" ||
        this.state.recours !== "") &&
      validate
    );
  };

  handelChange1 = () => {
    const data = { ...this.state.data };
    data.name = "Anonymous";
    this.setState({ data });
  };

  handelChange2 = () => {
    const data = { ...this.state.data };
    data.name = this.props.studentName;
    this.setState({ data });
  };

  doSubmit = async () => {
    const navigate = useNavigate();

    try {
      const { name, stars, recours, comment } = this.state.data;

      const body = {
        name: name,
        comment: comment,
      };

      if (comment !== "") {
        const result1 = await auth.addComments(body);
        const result2 = await auth.sinkCommentCourse(
          this.props.courseId,
          result1.id
        );
      }

      if (recours !== "") {
        let formData = new FormData();
        formData.append("recours", recours);
        const result3 = await auth.addResourses(formData);
        const result4 = await auth.sinkSourseCourse(
          this.props.courseId,
          result3.id
        );
      }

      if (stars !== "") {
        const result5 = await auth.addRate(
          this.props.courseId,
          this.props.studentId,
          parseInt(stars)
        );
      }

      navigate("/seeCourseStudent");
    } catch (ex) {
      toast.error("An unexpected error has occurred.");
    }
  };

  render() {
    if (!auth.getCurrentUser()) return <Navigate to="/login" />;
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          paddingTop: "5vh",
          paddingBottom: "5vh",
        }}
      >
        <div style={{ flex: "1", marginLeft: "10%", marginRight: "10%" }}>
          <h1 style={{ textAlign: "center" }}>
            Source registration and comments
          </h1>
          <form style={{ marginTop: "50px" }} onSubmit={this.handelSubmit}>
            {this.renderInput("stars", "Score")}
            {this.renderInputUpload("recours", "Recours", "application/pdf")}
            <div className="row mt-4 mb-2">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={this.state.data.name === "Anonymous"}
                    onChange={(e) => this.handelChange1()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Anonymous
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={this.state.data.name !== "Anonymous"}
                    onChange={() => this.handelChange2()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    {this.props.studentName}
                  </label>
                </div>
              </div>
            </div>
            {this.renderTextareaInput("comment", "Comment")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default CourseDetailForm;
