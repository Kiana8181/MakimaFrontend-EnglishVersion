import React from "react";
import { useState, useEffect } from "react";
import CourseDetail from "./courseDetail";

function CoursesOfPorfessor(props) {
  const [options, setOptions] = useState([
    {
      id: "",
      name: "",
      description: "",
      no_of_ratings: "",
      avg_rating: "",
      professorName: "",
      universityName: "",
      comments: [],
      resourse: [{ id: "", recours: "" }],
    },
  ]);
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

  useEffect(() => {
    async function setCourses() {
      setOptions(props.courses);
    }
    setCourses();
  });

  return (
    <div>
      <div
        className="modal fade"
        id="coursesOfPorfessor"
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
                List of courses
              </h1>
            </div>
            <div className="modal-body">
              <div data-bs-dismiss="modal">
                {options.map((option) => (
                  <div
                    className="input-group"
                    data-bs-toggle="modal"
                    data-bs-target="#courseDetail"
                    key={option.id}
                    onClick={() => {
                      setOption(option);
                    }}
                  >
                    <h5
                      className="form-control"
                      style={{
                        height: "100%",
                        borderColor: "white",
                        verticalAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {option.name}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <CourseDetail course={option} />
    </div>
  );
}

export default CoursesOfPorfessor;
