import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Timestamp from 'react-timestamp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const TIME_ENTRIES = gql`
  query TimeEntries {
    timeEntries {
        id,
        createdAt,
        user {
            name
        }
    }
  }
`;
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
        role
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

const DELETE_TIME_ENTRY = gql`
  mutation DeleteTimeEntry($id: ID!) {
    deleteTimeEntry(id: $id)
  }
`;

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function TimeEntries() {
    const [timeEntries, setTimeEntries] = useState([]);
    const [admin, setAdmin] = useState(false);
    const classes = useStyles();

    const [createTimeEntry] = useMutation(CREATE_TIME_ENTRY, {
        onCompleted: (data) => {
            setTimeEntries(timeEntries => [...timeEntries, data.createTimeEntry])
        }
    });

    const [deleteTimeEntry] = useMutation(DELETE_TIME_ENTRY);

    useQuery(TIME_ENTRIES, {
        onCompleted: (data) => {
            setTimeEntries(data.timeEntries);
        }
    });

    useQuery(CURRENT_USER, {
        onCompleted: (data) => {
            setAdmin(data.currentUser.role === "ADMIN");
        }
    });

    async function deleteTimeEntryHelper(id) {
        await deleteTimeEntry({ variables: { id: id } });
        setTimeEntries(timeEntries.filter(entry => entry.id !== id));
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Data</TableCell>
                        {admin ? (<TableCell align="center">Dono</TableCell>) : (<></>)}
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeEntries.map((entry, index) => (
                        <TableRow key={entry.id}>
                            <TableCell component="th" scope="row">{entry.id}</TableCell>
                            <TableCell align="center"><Timestamp date={entry.createdAt} /></TableCell>
                            {admin ? (<TableCell align="center">{entry.user.name}</TableCell>) : (<></>)}
                            <TableCell align="center">
                                {index % 2 === 0 ? (<Chip label="Entrada" color="primary" />) : (<Chip label="Saída" color="secondary" />)}
                            </TableCell>
                            <TableCell align="center">
                                {admin ? <IconButton onClick={() => deleteTimeEntryHelper(entry.id)}><DeleteIcon /></IconButton> : ''}
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