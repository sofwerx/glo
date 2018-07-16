import React, { Component } from "react";
import Form from "material-ui-jsonschema-form";
import Button from "@material-ui/core/Button";

const LOGIN_FORM_SCHEMA = {
  title: "Login",
  classNames: 'logwerx-form',
  type: "object",
  required: ["username, password"],
  properties: {
    username: {
      type: "string",
      title: "Name"
    },
    password: {
      type: "password",
      title: "Password"
    }
  }
};

export default class LoginForm extends Component {
  state = {
    username: "foo",
    password: "bar"
  };

  onChange = ({ formData }) => {
    this.setState({ ...formData });
  };

  onLogin = (ev) => {
    this.props.onSubmit(ev);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    if (this.props.loggedIn) {
      return <Button onClick={this.props.onLogout}> Logout </Button>;
    }
    return (
      <Form
      style={{border: 'none'}}
        schema={LOGIN_FORM_SCHEMA}
        formData={this.state}
        onChange={this.onChange}
        onSubmit={this.onLogin}
      />
    );
  }
}
