import React from "react";
import icons from "./icons";

const InputChoose = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <div>
        <label
          htmlFor={name}
          className="form-label"
          style={{ fontWeight: "bold" }}
        >
          {label}
        </label>
        <div
          className="input-group"
          data-bs-toggle="modal"
          data-bs-target="#chooseUniversity"
        >
          <input
            placeholder={label}
            className="form-control"
            {...rest}
            name={name}
            id={name}
          />
          <span
            style={{ backgroundColor: "white" }}
            className="input-group-text"
          >
            {icons.caretDownFill()}
          </span>
        </div>
      </div>
      {error && (
        <div
          className="alert alert-danger"
          style={{
            lineHeight: "25px",
            padding: "0px 10px",
            fontSize: "15px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default InputChoose;
