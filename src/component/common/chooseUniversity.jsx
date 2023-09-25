import React from "react";
import { useState, useEffect } from "react";
import auth from "../../sevices/authService";

function ChooseUniversity({ setUniversity }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getUniversities() {
      const result = await auth.getUniversities();
      setOptions(result);
    }
    getUniversities();
  }, []);

  return (
    <div>
      <div
        className="modal fade"
        id="chooseUniversity"
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
                List of universities
              </h1>
            </div>
            <div className="modal-body">
              <div data-bs-dismiss="modal">
                {options.map((option) => (
                  <div
                    className="input-group"
                    key={option.id}
                    onClick={() => {
                      setUniversity(option.universityName);
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{ backgroundColor: "white", borderColor: "white" }}
                    >
                      {
                        <img
                          style={{
                            width: "4vw",
                            height: "4vw",
                          }}
                          src={option.logo}
                          alt="pic"
                        />
                      }
                    </span>

                    <h5
                      className="form-control"
                      style={{
                        height: "100%",
                        borderColor: "white",
                        verticalAlign: "center",
                      }}
                    >
                      {option.universityName}
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
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUniversity;
