import React, { Component } from "react";
import Input from "./input";
import InputChoose from "./inputChoose";
import InputUpload from "./inputUpload";
import TextareaInput from "./textareaInput";

class Form extends Component {
  state = { data: {}, errors: {}, isLoading: false };

  handelChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input.name, data[input.name]);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  handelChangeFile = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.target.files[0];
    this.setState({ data });
  };

  handelChangeChoose = ({ currentTarget: input }) => {};

  handelSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button
        disabled={!this.validateAll()}
        type="submit"
        className="btn btn-primary col-12"
      >
        {this.state.isLoading && (
          <div class="spinner-border spinner-border-sm" role="status" />
        )}
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handelChange}
        error={errors[name]}
      />
    );
  }

  renderTextareaInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <TextareaInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handelChange}
        error={errors[name]}
      />
    );
  }

  renderInputUpload(name, label, accept, type = "file") {
    const { data, errors } = this.state;
    return (
      <InputUpload
        accept={accept}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handelChangeFile}
        error={errors[name]}
      />
    );
  }

  renderInputChoose(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <InputChoose
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={(e) => this.handelChangeFile}
        error={errors[name]}
      />
    );
  }
}

export default Form;
