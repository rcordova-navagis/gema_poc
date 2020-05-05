import React, { useState, useCallback } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TablePagination,
    Paper,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {UUT_TABLE_COLUMNS} from './constants/UutSchema';
import _ from 'underscore';

const columns = _.pluck(UUT_TABLE_COLUMNS, 'label');
const keys = _.pluck(UUT_TABLE_COLUMNS, 'key');


export default function UutTableView(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  // if (!Array.isArray(props.data) || !props.data.length) return <p>Loading...</p>;

  return (
    <div className="uut-uut-table-view">
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col) => (<TableCell>{col}</TableCell>))
                        }
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="td">{row.name}</TableCell>
                                <TableCell component="td">{row.category && row.category.name}</TableCell>
                                <TableCell component="td">CSV | Point</TableCell>
                                <TableCell component="td">{row.dataset && row.dataset.dataset_queue.progress}</TableCell>
                                <TableCell component="td"></TableCell>
                                <TableCell component="td">{row.published_date}</TableCell>
                                <TableCell component="td">{row.dataset && row.dataset.dataset_queue.uploaded_by}</TableCell>
                                <TableCell component="td">{row.dataset && row.dataset.dataset_queue.progress >= 0 ? (row.dataset.dataset_queue.progress < 100 ? 'In Progress' : 'Completed') : 'No Dataset'}</TableCell>
                                <TableCell component="td">
                                    <IconButton color="secondary"
                                                onClick={() => {
                                                    props.deleteLayer(row.id, row.dataset.id, row.dataset.dataset_queue.id);
                                                }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    {
                                        row.dataset && row.dataset.dataset_queue.progress && row.dataset.dataset_queue.progress == 100
                                        ? <IconButton color="primary" onClick={() => {
                                                props.showLayerDetails(row.id);
                                                props.setIsListMaximize(false);
                                            }}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        : null
                                    }
                                </TableCell>
                                {/*{*/}
                                {/*    keys.map(k => (*/}
                                {/*        <TableCell component="td">*/}
                                {/*            {*/}
                                {/*                k === 'logs'*/}
                                {/*                ? ''*/}
                                {/*                : (row.hasOwnProperty(k) ? row[k] : '')*/}
                                {/*            }*/}
                                {/*        </TableCell>*/}
                                {/*    ))*/}
                                {/*}*/}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    </div>
  );
};
