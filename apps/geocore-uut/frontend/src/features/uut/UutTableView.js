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
} from '@material-ui/core';
import {UUT_TABLE_COLUMNS} from './constants/UutSchema';
import _ from 'underscore';

const columns = _.pluck(UUT_TABLE_COLUMNS, 'label');
const keys = _.pluck(UUT_TABLE_COLUMNS, 'key');


export default function UutTableView(props) {
  console.log('PROPS: ',props);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  return (
    <div className="uut-uut-table-view">
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col) => (<TableCell>{col}</TableCell>))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                {
                                    keys.map(k => (
                                        <TableCell component="td">
                                            {
                                                k === 'logs'
                                                ? ''
                                                : (row.hasOwnProperty(k) ? row[k] : '')
                                            }
                                        </TableCell>
                                    ))
                                }
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
