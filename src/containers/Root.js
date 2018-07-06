import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login, logout } from "../actions/authentication";
import { loadUnits } from "../actions/units";

import LoginForm from "../components/LoginForm";
import Units from "../components/Units";

// import Drawer from '@material-ui/core/Drawer';
// import Menu from '../components/Menu';
// import Form from "material-ui-jsonschema-form";
// import schema from '../components/Form';
// import uiSchema from '../components/UISchema';
// import Stepper from '../components/Stepper';

class Root extends Component {
  //   state = {
  //     formData: {
  //       name: "",
  //       password: "",
  //       unit: "",
  //       location: "",
  //       optempo: ""
  //     }
  //   };

  //   onChange = ({ formData }) => {
  //     this.setState({ formData });
  //   };

  componentDidMount() {
    this.props.loadUnits();
  }

  render() {
    return (
      <div>
        {this.props.authenticationErrorMessage}
        <LoginForm
          loggedIn={this.props.authenticated}
          onSubmit={this.props.login}
          onLogout={this.props.logout}
        />
        <Units units={this.props.units} />
        {/* <Menu />
        <Stepper />
        <Form
          schema={schema}
          onSubmit={onSubmit}
          // uiSchema={uiSchema}
          formData={this.state.formData}
          onChange={this.onChange}
        /> */}
      </div>
    );
  }
}

const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      logout,
      loadUnits
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.authentication.authenticated,
    authenticationErrorMessage: state.authentication.errorMsg,
    units: state.units
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
