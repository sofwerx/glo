import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import { login, logout } from "../actions/authentication";
import { loadUnits } from "../actions/units";
import { loadPeople } from "../actions/people";
import { loadEquipment } from "../actions/equipment";
import { loadLocation } from "../actions/location";
import { nextStep } from "../actions/operation";
import {
  previousStep,
  addDeployment,
  updateDeployment,
  selectDeployment,
  selectUnit
} from "../actions/operation";

import LoginForm from "../components/LoginForm";
import Picker from "../components/Picker";
import Location from "../components/Location";
import DateRange from "../components/DateRange";

// import Drawer from '@material-ui/core/Drawer';
// import Menu from '../components/Menu';
// import Form from "material-ui-jsonschema-form";
// import schema from '../components/Form';
// import uiSchema from '../components/UISchema';
// import Stepper from '../components/Stepper';

class Root extends Component {
  state = {
    currentDeployment: {}
  };

  onSave = () => {
    this.props.updateDeployment(this.state.currentDeployment);
  };

  onChange = key => val => {
    const newState = { ...this.state };
    newState.currentDeployment[key] = val;
    this.setState(newState);
  };

  componentDidMount() {
    this.props.loadUnits();
    this.props.loadPeople();
    this.props.loadEquipment();
    this.props.loadLocation();
  }

  render() {
    return (
      <Grid container>
        <AppBar position="static" color="default">
          <Tabs value={this.props.step}>
            <Tab label="Login" />
            <Tab label="Select Unit" />
            <Tab label="Deployments" />
            <Tab label="Select Resources" />
            <Tab label="Select Location" />
          </Tabs>
        </AppBar>
        <Grid item lg={6}>
          {this.props.authenticationErrorMessage}
          <SwipeableViews axis={"x"} index={this.props.step}>
            <LoginForm
              loggedIn={this.props.authenticated}
              onSubmit={this.props.login}
              onLogout={this.props.logout}
            />
            <React.Fragment>
              <Picker
                values={this.props.units}
                name="Units"
                onChange={this.props.selectUnit}
              />
              <Button onClick={this.props.nextStep}> Next </Button>
            </React.Fragment>
            <React.Fragment>
              <ul>
                {this.props.deployments.map((d, i) => (
                  <li key={i}>
                    <Button onClick={() => this.props.selectDeployment(i)}>
                      {d.location || `Location ${i}`}
                    </Button>
                  </li>
                ))}
              </ul>
              <Button onClick={this.props.addDeployment}>Add Deployment</Button>
            </React.Fragment>
            <React.Fragment>
              <Picker
                multiple
                name="People"
                values={this.props.people}
                onChange={this.onChange("people")}
              />
              <br />
              <Picker
                multiple
                name="Equipment"
                values={this.props.equipment}
                onChange={this.onChange("equipment")}
              />
              <Button onClick={this.props.previousStep}> Previous </Button>
              <Button onClick={this.props.nextStep}> Next </Button>
            </React.Fragment>
            <React.Fragment>
              <Picker
                name="Location"
                values={this.props.location}
                onChange={this.onChange("location")}
              />
              <br />
              <DateRange />
              <Button onClick={this.props.previousStep}> Previous </Button>
              <Button onClick={this.onSave}> Save Deployment </Button>
            </React.Fragment>
          </SwipeableViews>
        </Grid>
        <Grid item lg={"auto"}>
          Cesium Globe Goes Here
        </Grid>
      </Grid>
    );
  }
}

const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      logout,
      loadUnits,
      loadEquipment,
      loadPeople,
      loadLocation,
      nextStep,
      previousStep,
      selectUnit,
      addDeployment,
      updateDeployment,
      selectDeployment
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.authentication.authenticated,
    authenticationErrorMessage: state.authentication.errorMsg,
    units: state.units,
    step: state.operation.step,
    equipment: state.equipment,
    people: state.people,
    location: state.location,
    deployments: state.operation.deployments
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
