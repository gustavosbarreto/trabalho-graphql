import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Timestamp from 'react-timestamp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const TIME_ENTRIES = gql`
  query TimeEntries {
    timeEntries {
        id,
        createdAt
    }
  }
`;

function TimeEntries() {
    const [timeEntries, setTimeEntries] = useState([]);
    const classes = useStyles();

    useQuery(TIME_ENTRIES, {
        onCompleted: (data) => {
            setTimeEntries(data.timeEntries);
        }
    });

    async function createTimeEntry() {
        alert(1);
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Data</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeEntries.map((entry, index) => (
                        <TableRow key={entry.id}>
                            <TableCell component="th" scope="row">{entry.id}</TableCell>
                            <TableCell align="center"><Timestamp date={entry.createdAt} /></TableCell>
                            <TableCell align="center">{index % 2 === 0 ? 'Entrada' : 'Saída'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab color="primary" className={classes.fab} onClick={createTimeEntry}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default TimeEntries;