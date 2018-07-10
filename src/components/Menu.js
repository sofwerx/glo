import React, { Component } from 'react';

import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Sms } from '@material-ui/icons';



class Menu extends Component{
    state = {
        anchorEl: null,
    };

    handleOpen = (event) => {
        this.setState({
                anchorEl: event.currentTarget
            });
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        }); 
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <Button
                    size="large"
                    onClick={this.handleOpen}
                >
                    <Sms />
                </Button>
                <MaterialMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </MaterialMenu>
            </div>
        );
    }
};

export default Menu;