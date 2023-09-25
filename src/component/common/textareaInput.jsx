import React from "react";

const TextareaInput = ({ name, label, error, ...rest }) => {
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
        <textarea
          rows="6"
          placeholder={label}
          className="form-control"
          {...rest}
          name={name}
          id={name}
        />
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

export default TextareaInput;
