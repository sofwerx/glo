import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";

export default class Equipment extends Component {
  state = {
    selectedEquipment: []
  };

  selectEquipment = ev => {
    if (this.props.onSelectEquipment) {
      this.props.onSelectEquipment(ev.target.value);
    }
    this.setState({ selectedEquipment: ev.target.value });
  };

  render() {
    if (!this.props.equipment) {
      return <div> No Equipment Loaded </div>;
    }
    return (
      <FormControl>
        <InputLabel htmlFor="equipment">Equipment</InputLabel>
        <Select
          inputProps={{ name: "equipment", id: "equipment" }}
          multiple
          value={this.state.selectedEquipment}
          onChange={this.selectEquipment}
        >
          {this.props.equipment.map((equipment, i) => (
            <MenuItem key={i} name={equipment.name} value={equipment.name}>
              {equipment.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
