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
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';





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
import Globe from '../components/Globe';
import BottomNav from '../components/BottomNav';

class Root extends Component {
  state = {
    currentDeployment: {},
    editorPanelOpen: false,
    unit: null,
    notifsOpen: false
  };

  openNotifs = () => {
    this.setState({notifsOpen: true});
  }

  closeNotifs = () => {
    this.setState({ notifsOpen: false });
  }

  onSave = () => {
    this.props.updateDeployment(this.state.currentDeployment);
  };

  onChange = key => val => {
    const newState = { ...this.state };
    newState.currentDeployment[key] = val;
    this.setState(newState);
  };

  selectUnit = (unit) => {
    console.log(unit)
    this.setState({unit})
  }

  addDeployment = (location) => {
    this.setState({currentDeployment: {location}, editorPanelOpen: true});
  }

  componentDidMount() {
    this.props.loadUnits();
    this.props.loadPeople();
    this.props.loadEquipment();
    this.props.loadLocation();
  }

  openEditorPanel = () => {
    this.setState({ editorPanelOpen: true });
  }
  closeEditorPanel = () => {
    this.setState({ editorPanelOpen: false });
  }

  render() {
    return (
      <div>
        <div>
          <Globe onClick={this.addDeployment} />
        </div>
        <BottomNav openNotifs={this.openNotifs} signOut={this.props.logout}/>
        <Modal open={!this.props.authenticated}>
          <LoginForm
            loggedIn={this.props.authenticated}
            onSubmit={this.props.login}
            onLogout={this.props.logout}
          />
        </Modal>

        <Modal open={this.props.authenticated && this.props.unit === null}>
            <Paper>
            <Picker
              values={this.props.units}
              name="Units"
              onChange={this.selectUnit}
            />
            <Button onClick={() => this.props.selectUnit(this.state.unit)}> Confirm </Button> 
              </Paper>
        </Modal>

        <Drawer anchor='right' open={this.state.notifsOpen} onClose={this.closeNotifs}>
          Notifs
        </Drawer>

        <Drawer open={this.state.editorPanelOpen} onClose={this.closeEditorPanel}>
          <div style={{width: '40em'}}>

            <SwipeableViews axis={"x"} index={this.props.step}>
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
                <DateRange
                  onChangeStartDate={this.onChange("startDate")}
                  onChangeEndDate={this.onChange("endDate")}
                />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Next </Button>
              </React.Fragment>
              <React.Fragment>
                NOAA Weather Report
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Review </Button>
              </React.Fragment>
              <React.Fragment>
                <Button onClick={this.onSave}> Save Deployment </Button>
              </React.Fragment>
            </SwipeableViews>
          </div>
        </Drawer>
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
    deployments: state.operation.deployments,
    unit: state.operation.unit
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
