import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login, logout } from '../actions/authentication';

import LoginForm from '../components/LoginForm';

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

  render() {
    return (
      <div>
        <LoginForm 
        loggedIn={this.props.authenticated}
        onSubmit={this.props.login}
        onLogout={this.props.logout}/>
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
      logout
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.authentication.authenticated
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
