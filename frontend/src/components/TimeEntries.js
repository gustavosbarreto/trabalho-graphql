import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Timestamp from 'react-timestamp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const TIME_ENTRIES = gql`
  query TimeEntries {
    timeEntries {
        id,
        createdAt
    }
  }
`;

const CREATE_TIME_ENTRY = gql`
  mutation CreateTimeEntry {
    createTimeEntry {
        id,
        createdAt
    }
  }
`;

function TimeEntries() {
    const [timeEntries, setTimeEntries] = useState([]);
    const classes = useStyles();

    const [createTimeEntry] = useMutation(CREATE_TIME_ENTRY, {
        onCompleted: (data) => {
            setTimeEntries(timeEntries => [...timeEntries, data.createTimeEntry])
        }
    });

    useQuery(TIME_ENTRIES, {
        onCompleted: (data) => {
            setTimeEntries(data.timeEntries);
        }
    });

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
                            <TableCell align="center">
                                {index % 2 === 0 ? (<Chip label="Entrada" color="primary" />) : (<Chip label="Saída" color="secondary" />)}
                            </TableCell>
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