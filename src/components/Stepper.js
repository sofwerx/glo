import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";

const primary = purple["A200"];

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

// const styles = theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// });

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { children, classes, theme } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Login" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        
        <SwipeableViews
          axis={"x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {React.Children.map(children, (child, i) => {
            <TabContainer dir="ltr" key={i}>
              {child}
            </TabContainer>;
          })}
          <TabContainer dir="ltr" key={-1}>
            Test
          </TabContainer>;
        </SwipeableViews>
      </div>
    );
  }
}

export default FullWidthTabs;
