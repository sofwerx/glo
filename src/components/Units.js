import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class Units extends Component {
  state = {
    selectedUnit: ''
  };

  selectUnit = ev => {
    this.setState({ selectedUnit: ev.target.value });
  };

  render() {
    if (!this.props.units) {
      return <div> No Units Loaded </div>;
    }
    return (
      <Select value={this.state.selectedUnit} onChange={this.selectUnit}>
        <MenuItem name={'-'} value={''} />
        {this.props.units.map((unit, i) => (
          <MenuItem key={i} name={unit.name} value={unit.name}>
            {unit.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}
