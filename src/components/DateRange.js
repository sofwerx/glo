import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from '@material-ui/core/styles';

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "60%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});





class DateRange extends Component {
  state = {
    startDate: '',
    endDate: ''
  };

  componentWillReceiveProps(newProps) {
    this.setState({ startDate: newProps.startDate, endDate: newProps.endDate });
  }

  changeDate = path => ev => {
    const newState = { ...this.state };
    newState[path] = ev.target.value;
    this.setState(newState);
  };

  changeStartDate = (ev) => {
    this.changeDate('startDate')(ev);
    if(this.props.onChangeStartDate) {
      this.props.onChangeStartDate(ev.target.value);
    }
  }

  changeEndDate = (ev) => {
    this.changeDate('endDate')(ev);
    if (this.props.onChangeEndDate) {
      this.props.onChangeEndDate(ev.target.value);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} >
          <TextField
            label="Start Date"
            id="startDate"
            type="date"
            className={classes.textField}
            value={this.state.startDate}
            onChange={this.changeStartDate}
          />
        </FormControl>
        <FormControl className={classes.formControl} >
          <TextField
            label="End Date"
            id="endDate"
            type="date"
            className={classes.textField}
            value={this.state.endDate}
            onChange={this.changeEndDate}
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(DateRange);

