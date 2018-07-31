import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";

export default class OPtempo extends Component {
  state = {
    selectedOPtempo: []
  };

  selectEquipment = ev => {
    if (this.props.onSelectOPtempo) {
      this.props.onSelectOPtempo(ev.target.value);
    }
    this.setState({ selectedOPtempo: ev.target.value });
  };

  render() {
    if (!this.props.OPtempo) {
      return <div> No OPtempo Loaded </div>;
    }
    return (
      <FormControl>
        <InputLabel htmlFor="OPtempo">Equipment</InputLabel>
        <Select
          inputProps={{ name: "OP tempo", id: "OP tempo" }}
          multiple
          value={this.state.selectedOPtempo}
          onChange={this.selectEquipment}
        >
          {this.props.OPtempo.map((OPtempo, i) => (
            <MenuItem key={i} name={OPtempo.name} value={OPtempo.name}>
              {OPtempo.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}