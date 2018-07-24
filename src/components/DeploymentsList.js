import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


const DeploymentList = ({ deployments, classes, editDeployment, deleteDeployment }) => {
    return (
        <div>
            <Paper className={classes.root}>
                Deployments
            {deployments.map((d, i) => {
                    return <div onClick={editDeployment(i)}>
                        Deployment to {d.location.lat}, {d.location.lon} 
                    </div>
                })}
            </Paper>
        </div>

    );
}

export default withStyles(styles)(DeploymentList);