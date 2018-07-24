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
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';


import { loadOPtempo } from "../actions/OPtempo";
import { login, logout } from "../actions/authentication";
import { loadUnits } from "../actions/units";
import { loadPeople } from "../actions/people";
import { loadEquipment } from "../actions/equipment";
import { loadLocation } from "../actions/location";
import { nextStep, resetEditor } from "../actions/operation";
import {
  previousStep,
  addDeployment,
  updateDeployment,
  selectDeployment,
  selectUnit,
} from "../actions/operation";

import OpTempos from '../data/OPtempo';
import OPtempo from "../components/OPtempo";
import LoginForm from "../components/LoginForm";
import Picker from "../components/Picker";
import DateRange from "../components/DateRange";
import Globe from '../components/Globe';
import BottomNav from '../components/BottomNav';
import Review from '../components/Review';
import SelectTable from '../components/SelectTable';
import DeploymentList from '../components/DeploymentsList';


class Root extends Component {
  state = {
    // Keeps track of which deployment you're looking at 
    deploymentIdx: 0,
    deployments: [
      // Contains information on each deployment in the mission:
      // People, Equipment, Location, Date Range, Supplies, Op Tempo
      // As well as any other information that eventually needs to be stored here 
    ],
    // UI State to determine if review panel should be open
    deploymentReviewOpen: false,
    // Stores UI state to determine if editor should be open or closed
    editorPanelOpen: false,
    // Holds the unit that is currently being sent on missions
    unit: null,
    // Stores UI state to determine if notifications pane should be open
    notifsOpen: false,
    // Store some local information we need for the UI 
    climate: {},
    weather: {},
    supplies: {}
  };

  loadSupplies = async (deployment, authToken) => {
    try {
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ AuthToken: authToken, deployment }),

      };
      const response = await fetch('/SupplyService', options);
      const data = await response.json();
      let { requestOK, ItemsRequested } = data;
      if (requestOK) {
        console.log(ItemsRequested);

      }
    } catch (err) {
    }
  }

  loadClimate = async (location, authToken) => {
    try {
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ AuthToken: authToken, location: { lat: location[1], lon: location[0] } }),

      };
      const response = await fetch('/WeatherService/GetClimate', options);
      const { ClimateTemp, ClimateHumidity } = await response.json();
      const climate = { ClimateTemp, ClimateHumidity };
      this.setState({ climate })
    } catch (err) {
    }
  }

  loadWeather = async (location, startDate, endDate, authToken) => {
    try {
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          AuthToken: authToken,
          location: { lat: location[1], lon: location[0] },
          startDate,
          endDate
        }),

      };
      const response = await fetch('/WeatherService/GetWeatherRpt', options);
      const { AvgTemp, AvgHumidity, Precipitation } = await response.json();
      const weather = { AvgTemp, AvgHumidity, Precipitation };
      this.setState({ weather })
    } catch (err) {
    }
  }

  openNotifs = () => {
    this.setState({ notifsOpen: true });
  }

  closeNotifs = () => {
    this.setState({ notifsOpen: false });
  }

  onSave = () => {
    this.setState({ editorPanelOpen: false });
    // this.props.updateDeployment(this.state.currentDeployment);
  };

  onChange = key => val => {
    const deployment = this.state.deployments[this.state.deploymentIdx];
    _.set(deployment, key, val);
    let newState = { ...this.state };
    newState.deployments[this.state.deploymentIdx] = deployment;
    this.setState(newState);
  };

  onChangeIndex = key => index => val => {
    this.onChange(`${key}.${index}`)(val);
  }

  selectUnit = (unit) => {
    this.setState({ unit })
  }

  addDeployment = (location) => {
    const [lon, lat] = location;
    this.loadClimate({ lat, lon }, this.props.authenticated);
    const newDeployment = {
      location: { lat, lon },
      people: [...this.props.people].map(p => ({ selected: true, ...p })),
      equipment: [...this.props.equipment].map(e => ({ selected: true, ...e })),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      supplies: [],
      opTempo: 'Defend'
    };
    this.props.resetEditor();
    this.setState({
      editorPanelOpen: true,
      deployments: [...this.state.deployments, newDeployment],
      deploymentIdx: this.state.deployments.length
    });
  }

  editDeployment = (idx) => () => {
    this.props.resetEditor();
    this.setState({deploymentIdx: idx,  editorPanelOpen: true});
  } 

  openDeployments = () => {
    this.setState({ deploymentReviewOpen: true });
  }
  closeDeployments = () => {
    this.setState({ deploymentReviewOpen: false });
  }

  

  render() {
    const deployment = this.state.deployments[this.state.deploymentIdx] || {};
    return (
      <div>
        <div>
          <Globe deployments={this.state.deployments} onClick={this.addDeployment} />
        </div>
        <BottomNav openNotifs={this.openNotifs} signOut={this.props.logout} openDeployments={this.openDeployments} />
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
            <Button onClick={() => this.props.selectUnit(this.state.unit, this.props.authToken)}> Confirm </Button>
          </Paper>
        </Modal>

        <Modal open={this.state.deploymentReviewOpen} onClose={this.closeDeployments}>
          <Paper>
            <DeploymentList deployments={this.state.deployments} editDeployment={this.editDeployment}/>
          </Paper>
        </Modal>

        <Drawer anchor='right' open={this.state.notifsOpen} onClose={this.closeNotifs}>
          <div style={{ width: '40em' }}>
            <Typography>Notifications</Typography>
          </div>

        </Drawer>

        <Drawer open={this.state.editorPanelOpen} onClose={this.closeEditorPanel}>
          <div style={{ width: '40em' }}>

            <SwipeableViews axis={"x"} index={this.props.step}>
              {/* <React.Fragment>
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
              </React.Fragment> */}
              <React.Fragment>
                <SelectTable data={deployment.people} editableColumns={['qty']} onChange={this.onChangeIndex('people')} />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Next </Button>
              </React.Fragment>
              <React.Fragment>
                <SelectTable data={deployment.equipment} editableColumns={['qty-onhand']} onChange={this.onChangeIndex('equipment')} />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Next </Button>
              </React.Fragment>
              <React.Fragment>
                <DateRange
                  onChangeStartDate={this.onChange("startDate")}
                  onChangeEndDate={this.onChange("endDate")}
                />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={() => {
                  this.loadWeather(deployment.location, deployment.startDate, deployment.endDate, this.props.authenticated);
                  this.props.nextStep()
                }}> Next </Button>
              </React.Fragment>
              <React.Fragment>
                {this.state.climate.ClimateHumidity} <br />
                {this.state.climate.ClimateTemp}<br />
                {this.state.weather.AvgTemp} Degrees <br />
                {this.state.weather.AvgHumidity} % Humidity<br />
                {this.state.weather.Precipitation} Precipitation<br />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Next </Button>
              </React.Fragment>
              <React.Fragment>
                {/* TODO: This needs to reflect existing value... */}
                <Picker
                  name="OP Tempo"
                  values={OpTempos}
                  onChange={this.onChange("opTempo")}
                  value={deployment.opTempo}
                />
                <Button onClick={this.props.previousStep}> Previous </Button>
                <Button onClick={this.props.nextStep}> Review </Button>
              </React.Fragment>

              <React.Fragment>
                <Typography>Review</Typography>
                <Review {...deployment} />
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
      selectDeployment,
      loadOPtempo,
      resetEditor
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
    unit: state.operation.unit,
    OPtempo: state.OPtempo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
