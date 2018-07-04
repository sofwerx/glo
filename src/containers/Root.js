import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../components/Menu';
import Cesium from '../components/Globe';

class Root extends Component {
    render() {
        return(
            <div>
                    <Menu>
                    </Menu>
                    <Button variant="contained" color="primary" onClick={this.props.decrement}>-</Button>
                    {this.props.counter}
                    <Button variant="contained" color="secondary" onClick={this.props.increment}>+</Button>
                    <Cesium>
                    </Cesium>
                

            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        increment: function () { return { type: 'INCREMENT' } },
        decrement: function () { return { type: 'DECREMENT' } }
    },
    dispatch);
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);