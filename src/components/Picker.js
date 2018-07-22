import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";

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

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.multiple ? [] : ""
    };
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ value: newProps.value || newProps.multiple ? [] : ""})
  // }

  changeValue = ev => {
    if (this.props.onChange) {

      this.props.onChange(ev.target.value);
    }
    this.setState({ value: ev.target.value });
  };

  render() {
    if (!this.props.values) {
      return <div> No {this.props.name} Loaded </div>;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Select {this.props.name}</InputLabel>
          <Select
            multiple={this.props.multiple}
            value={this.state.value}
            onChange={this.changeValue}
          >
            {this.props.values.map((value, i) => (
              <MenuItem key={i} name={value.name} value={value.name}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Picker);
