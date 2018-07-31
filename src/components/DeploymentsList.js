import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit } from '@material-ui/icons';



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
                <Typography align='center' variant='title'>Deployments</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Start Date </TableCell>
                            <TableCell> End Date </TableCell>
                            <TableCell> Lat </TableCell>
                            <TableCell> Lon </TableCell>
                            <TableCell> Tempo </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deployments.map((d, i) => {
                            return <TableRow key={i}>
                                <TableCell> {d.startDate} </TableCell>
                                <TableCell> {d.endDate} </TableCell>
                                <TableCell> {d.location.lat} </TableCell>
                                <TableCell> {d.location.lon} </TableCell>
                                <TableCell> {d.opTempo} </TableCell>
                                <TableCell onClick={editDeployment(i)}> <Edit/> </TableCell>
                                <TableCell onClick={deleteDeployment(i)}> <Delete/> </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>

    );
}

export default withStyles(styles)(DeploymentList);