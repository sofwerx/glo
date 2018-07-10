import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";

export default class location extends Component {
  state = {
    selectedLocation: ""
  };

  selectLocation = ev => {
    if (this.props.onSelectLocation) {
      this.props.onSelectLocation(ev.target.value);
    }
    this.setState({ selectedLocation: ev.target.value });
  };

  render() {
    if (!this.props.location) {
      return <div> No location Loaded </div>;
    }
    return (
      <FormControl>
        <InputLabel htmlFor="location">Location</InputLabel>
        <Select
          inputProps={{ name: "location", id: "location" }}
          value={this.state.selectedLocation}
          onChange={this.selectLocation}
        >
          {this.props.location.map((location, i) => (
            <MenuItem key={i} name={location.name} value={location.name}>
              {location.name}
            </MenuItem> 
          ))}
        </Select>
      </FormControl>
    );
  }
}