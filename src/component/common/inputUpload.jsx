import React from "react";
import icons from "./icons";
import "./commonStyle.css";

const InputUpload = ({ name, label, accept, value, error, ...rest }) => {
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
        <div className="input-group">
          <input
            style={{ color: "#AEB4BA" }}
            accept={accept}
            placeholder={label}
            className="form-control"
            {...rest}
            name={name}
            id={name}
            value=""
          />
          <span
            style={{ backgroundColor: "white" }}
            className="input-group-text"
          >
            {icons.uploadIcon()}
          </span>
        </div>
      </div>

      {value && (
        <div
          className="alert alert-success"
          style={{
            lineHeight: "25px",
            padding: "0px 10px",
            fontSize: "15px",
          }}
        >
          {value.name}
        </div>
      )}

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

export default InputUpload;
