import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import auth from "../sevices/authService";
import icons from "./common/icons";
import CourseDetailForm from "./courseDetailForm";

function CourseDetail(props) {
  const [option, setOption] = useState({
    id: "",
    name: "",
    description: "",
    no_of_ratings: "",
    avg_rating: "",
    professorName: "",
    universityName: "",
    comments: [],
    resourse: [{ id: "", recours: "" }],
  });

  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    favoriteCourse: "",
    fieldOfStudy: "",
    grade: "",
    id: "",
    nationalId: "",
    phoneNumber: "",
    studentNumber: "",
    type: "",
    university: "",
    user: "",
  });

  const [flag, setFlag] = useState(0);

  const addFavoriteCourse = () => {
    auth.addFavoriteCourse(currentUser.id, option.id);
    window.location = "/seeCourseStudent";
  };

  useEffect(() => {
    async function setCourses() {
      const student = await auth.getStudents();
      setCurrentUser(
        student.find((stu) => stu.email === auth.getCurrentUser())
      );

      setOption(props.course);
    }
    setCourses();
  }, [flag]);

  if (!auth.getCurrentUser()) return <Navigate to="/login" />;
  return (
    <div>
      <div
        className="modal fade"
        id="courseDetail"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ fontWeight: "bold" }}
              >
                More information and surveys
              </h1>
            </div>
            <div className="modal-body">
              {flag === 0 && (
                <button
                  className="btn btn-primary col-12"
                  onClick={() => {
                    setFlag(flag + 1);
                  }}
                >
                  Click to view
                </button>
              )}
              {flag === 1 && (
                <div>
                  <div className="container">
                    <div
                      className="row py-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col">
                        <h5 className="card-text" style={{ color: "#0DCAF0" }}>
                          Course name:
                        </h5>
                      </div>
                      <div className="col" style={{ verticalAlign: "middle" }}>
                        <p className="card-text">{option.name}</p>
                      </div>
                    </div>

                    <div
                      className="row py-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col">
                        <h5 className="card-text" style={{ color: "#0DCAF0" }}>
                          Professor's name:
                        </h5>
                      </div>
                      <div className="col" style={{ verticalAlign: "middle" }}>
                        <p className="card-text">{option.professorName}</p>
                      </div>
                    </div>

                    <div
                      className="row py-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col">
                        <h5 className="card-text" style={{ color: "#0DCAF0" }}>
                          Description:
                        </h5>
                      </div>
                      <div className="col" style={{ verticalAlign: "middle" }}>
                        <p className="card-text">{option.description}</p>
                      </div>
                    </div>

                    <div
                      className="row py-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col">
                        <h5 className="card-text" style={{ color: "#0DCAF0" }}>
                          Resources:
                        </h5>
                      </div>
                      <div className="col" style={{ verticalAlign: "middle" }}>
                        {option.resourse.map((re) => (
                          <a
                            key={re.id}
                            href={re.recours}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {icons.pdf()}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div
                      className="row py-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col">
                        <h5 className="card-text" style={{ color: "#0DCAF0" }}>
                          Score:
                        </h5>
                      </div>
                      <div className="col" style={{ verticalAlign: "middle" }}>
                        {option.avg_rating > 0
                          ? icons.fillStar()
                          : icons.star()}
                        {option.avg_rating > 1
                          ? icons.fillStar()
                          : icons.star()}
                        {option.avg_rating > 2
                          ? icons.fillStar()
                          : icons.star()}
                        {option.avg_rating > 3
                          ? icons.fillStar()
                          : icons.star()}
                        {option.avg_rating > 4
                          ? icons.fillStar()
                          : icons.star()}
                      </div>
                    </div>

                    <button
                      className="btn btn-primary col-12"
                      disabled={currentUser.favoriteCourse.find(
                        (fo) => fo.id === option.id
                      )}
                      onClick={() => {
                        addFavoriteCourse();
                      }}
                    >
                      Add to favorite courses
                    </button>

                    <hr />

                    <CourseDetailForm
                      courseId={option.id}
                      studentId={currentUser.user}
                      studentName={`${currentUser.firstName} ${currentUser.lastName}`}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#coursesOfPorfessor"
                onClick={() => {
                  setFlag(0);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
