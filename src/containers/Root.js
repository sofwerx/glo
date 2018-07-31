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
import Snackbar from '@material-ui/core/Snackbar';

import _ from 'lodash';


import { loadOPtempo } from "../actions/OPtempo";
import { login, logout } from "../actions/authentication";

import { loadPeople } from "../actions/people";

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

  // TODO supplies need to be stored on the deployment.
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
        const deployment = this.state.deployments[this.state.deploymentIdx];
        deployment.supplies = ItemsRequested.map(p => ({ selected: true, ...p }));
        let newState = { ...this.state };
        newState.deployments[this.state.deploymentIdx] = deployment;
        this.setState(newState);

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

  deleteDeployment = (idx) => () => {
    const { deployments } = this.state;
    const newDeployments = [...deployments.slice(0,idx), ...deployments.slice(idx+1)];
    this.setState({deployments: newDeployments});
  }

  editDeployment = (idx) => () => {
    this.props.resetEditor();
    this.setState({ deploymentIdx: idx, editorPanelOpen: true });
  }

  openDeployments = () => {
    this.setState({ deploymentReviewOpen: true });
  }
  closeDeployments = () => {
    this.setState({ deploymentReviewOpen: false });
  }

  logout = () => {
    this.props.logout();
    this.setState({ deployments: [] });
  }


  render() {
    const deployment = this.state.deployments[this.state.deploymentIdx] || {};
    const modalStyle = {
      position: 'absolute',
      left: '30%',
      width: '40%',
      top: '30%',
      borderRadius: '10px'
    };

    const nextButtonStyle = {
      float: 'right'
    };

    const prevButtonStyle = {
      float: 'left'
    };
    
    return (
      <div>
        <div>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={this.props.authenticated && this.props.unit !== null && !this.state.editorPanelOpen && !this.state.deploymentReviewOpen}
            message={'Click on the map to add a deployment to that location'} 
            />
          <Globe deployments={this.state.deployments} onClick={this.addDeployment} />
        </div>
        <BottomNav openNotifs={this.openNotifs} signOut={this.logout} openDeployments={this.openDeployments} />
        <Modal style={modalStyle} open={!this.props.authenticated}>
          <LoginForm
            loggedIn={this.props.authenticated}
            onSubmit={this.props.login}
            onLogout={this.props.logout}
          />
        </Modal>

        <Modal style={modalStyle} open={this.props.authenticated && this.props.unit === null}>
          <Paper>
            <Picker
              values={this.props.units}
              name="Units"
              onChange={this.selectUnit}
              value={this.state.unit}
            />
            <Button onClick={() => this.props.selectUnit(this.state.unit, this.props.authToken)}> Confirm </Button>
          </Paper>
        </Modal>

        <Drawer anchor='bottom'  open={this.state.deploymentReviewOpen} onClose={this.closeDeployments}>
          <Paper>
            <DeploymentList deployments={this.state.deployments} editDeployment={this.editDeployment} deleteDeployment={this.deleteDeployment}/>
          </Paper>
        </Drawer>

        <Modal style={modalStyle} open={this.state.notifsOpen} onClose={this.closeNotifs}>
          <Paper style={{ padding: '16px', width: '40em' }}>
            <Typography variant='title'>Notifications</Typography>
          </Paper>

        </Modal>

        <Drawer open={this.state.editorPanelOpen} onClose={this.closeEditorPanel}>
          <div style={{ width: '40em', padding: '16px' }}>

            <SwipeableViews axis={"x"} index={this.props.step}>
              <React.Fragment>
                <Button style={nextButtonStyle} style={nextButtonStyle} color='primary' variant='contained' onClick={this.props.nextStep}> Next </Button>
                <Typography align='center' variant='title'>Select Personnel</Typography>
                <SelectTable data={deployment.people} editableColumns={['qty']} onChange={this.onChangeIndex('people')} />
              </React.Fragment>
              <React.Fragment>
                <Button style={prevButtonStyle} color='primary' variant='contained' onClick={this.props.previousStep}> Previous </Button>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={this.props.nextStep}> Next </Button>
                <Typography align='center' variant='title'>Select Equipment</Typography>
                <SelectTable data={deployment.equipment} editableColumns={['qty-onhand']} onChange={this.onChangeIndex('equipment')} />
              </React.Fragment>
              <React.Fragment>
                <Button style={prevButtonStyle} color='primary' variant='contained' onClick={this.props.previousStep}> Previous </Button>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={() => {
                  this.loadWeather(deployment.location, deployment.startDate, deployment.endDate, this.props.authenticated);
                  this.props.nextStep()
                }}> Next </Button>
                <Typography align='center' variant='title'>Date of Deployment</Typography>
                <DateRange
                  startDate={deployment.startDate}
                  endDate={deployment.endDate}
                  onChangeStartDate={this.onChange("startDate")}
                  onChangeEndDate={this.onChange("endDate")}
                />
              </React.Fragment>
              <React.Fragment>
                <Button style={prevButtonStyle} color='primary' variant='contained' onClick={this.props.previousStep}> Previous </Button>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={this.props.nextStep}> Next </Button>
                <Typography align='center' variant='title'>Weather/Climate Report</Typography>
                <br/>
                <Typography variant='subheading'> Climate: {this.state.climate.ClimateHumidity} </Typography>  <br />
                <Typography variant='subheading'> Weather: {this.state.climate.ClimateTemp} </Typography>  <br />
                <Typography variant='subheading'> Average Temp: {this.state.weather.AvgTemp} c</Typography>  <br />
                <Typography variant='subheading'> Expected Humidity: {this.state.weather.AvgHumidity}%</Typography>  <br />
                <Typography variant='subheading'> Average Precipitation: {this.state.weather.Precipitation} "</Typography>  <br />
              </React.Fragment>
              <React.Fragment>
                <Button style={prevButtonStyle} color='primary' variant='contained' onClick={this.props.previousStep}> Previous </Button>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={() => { this.props.nextStep(); this.loadSupplies(deployment, this.props.authenticated) }}> Suggested Rations </Button>
                {/* TODO: This needs to reflect existing value... */}
                <Typography align='center' variant='title'>Select Operation Tempo</Typography>
                <Picker
                  name="OP Tempo"
                  values={OpTempos}
                  onChange={this.onChange("opTempo")}
                  value={deployment.opTempo}
                />
              </React.Fragment>
              <React.Fragment>
                <Button style={prevButtonStyle} color='primary' variant='contained' onClick={this.props.previousStep}> Previous </Button>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={this.props.nextStep}> Preview </Button>
                <Typography align='center' variant='title'>Select Rations</Typography>
                <SelectTable data={deployment.supplies} editableColumns={['qty']} onChange={this.onChangeIndex('supplies')} />
              </React.Fragment>
              <React.Fragment>
                <Button style={nextButtonStyle} color='primary' variant='contained' onClick={this.onSave}> Save Deployment </Button>
                <Typography align='center' variant='title'>Review Deployment</Typography>
                <Review {...deployment} />
              </React.Fragment>
            </SwipeableViews>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      logout,
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
