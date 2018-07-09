import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import TextField from "@material-ui/core/TextField";

export default class DateRange extends Component {
  state = {
    startDate: '',
    endDate: ''
  };

  changeDate = path => ev => {
    const newState = { ...this.state };
    newState[path] = ev.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <FormControl>
          <TextField
            id="startDate"
            label="Start Date"
            type="date"
            value={this.state.startDate}
            onChange={this.changeDate('startDate')}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
        <FormControl>
          {/* <InputLabel htmlFor="endDate">Start Date</InputLabel> */}
        </FormControl>
      </React.Fragment>
    );
  }
}
