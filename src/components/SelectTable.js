import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
});

function SelectTable({ classes, data = [], editableColumns = [], onChange = () => { } }) {
  if (data.length == 0) {
    return null;
  }
  // const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
  const headers = Object.keys(data[0]).filter(h => h !== 'selected');
  // {foo: true, bar: true}
  // isEditable[h]
  const isEditable = editableColumns.reduce((prev, val) => {
    prev[[val]] = true
    return prev
  }, {})
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                onChange={(ev) => data.map((_, i) => onChange(`[${i}].selected`)(ev.target.checked))}
                checked={data.every(d => d.selected)}
              />
            </TableCell>
            {headers.map(h => {
              // If this column should be editable put an X in the header
              // isEditable[[h]] will get you a boolean on if you need to edit this column or not
              return <TableCell key={h}>{h}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((val, i) => {
            return (
              <TableRow key={i}>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={(ev) => onChange(`[${i}].selected`)(ev.target.checked)}
                    checked={val.selected}
                  />
                </TableCell>
                {headers.map(h => {
                  return (
                    <TableCell key={h}>{isEditable[[h]] ? <TextField
                      id="number"
                      label="Number"
                      value={val[[h]]}
                      onChange={(ev) => onChange(`${i}.${h}`)(ev.target.value)}
                      type="number"
                      margin="normal"
                    /> : val[[h]]}
                    </TableCell>
                  );
                })}

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SelectTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectTable);

