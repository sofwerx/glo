import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";

export default class People extends Component {
  state = {
    selectedPeople: []
  };

  selectPeople = ev => {
    if (this.props.onSelectPeople) {
      this.props.onSelectPeople(ev.target.value);
    }
    this.setState({ selectedPeople: ev.target.value });
  };

  render() {
    if (!this.props.people) {
      return <div> No People Loaded </div>;
    }
    return (
      <FormControl>
        <InputLabel htmlFor="people">People</InputLabel>
        <Select
          inputProps={{ name: "people", id: "people" }}
          multiple
          value={this.state.selectedPeople}
          onChange={this.selectPeople}
        >
          {this.props.people.map((person, i) => (
            <MenuItem key={i} name={person.name} value={person.name}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
