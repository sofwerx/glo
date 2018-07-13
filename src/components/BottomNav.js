import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Sms, PowerSettingsNew } from '@material-ui/icons';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default class BottomNav extends Component {
    render() {
        return (
            <BottomNavigation
                showLabels
            >

                <BottomNavigationAction onClick={this.props.openNotifs} label="Notifications" icon={<Sms />} />
                <BottomNavigationAction onClick={this.props.signOut} label="Sign Out" icon={<PowerSettingsNew />} />
            </BottomNavigation>
        );
    }
}