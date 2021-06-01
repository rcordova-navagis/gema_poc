import React, { useEffect } from 'react';
import {TableContainer, Table, TableBody, TableCell, TableRow, Paper, AppBar, Toolbar, Divider, IconButton, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {useShowLayerDetails} from "./redux/showLayerDetails";


export default function LayerDetails(props) {
  const {showLayerDetails} = useShowLayerDetails();

  return (
    <div className="layers-layer-details">
      <AppBar position="static" color="transparent">
        <Toolbar disableGutters>
          <div className="title-container">
            {(props.layerDetailsData && props.layerDetailsData.title) && <Typography variant="h6" className="title">{props.layerDetailsData.title}</Typography>}
            {(props.layerDetailsData && props.layerDetailsData.subtitle) && <p className="subtitle">{props.layerDetailsData.subtitle}</p>}
          </div>
          <span className="spacer"></span>
          <IconButton color="inherit" onClick={showLayerDetails.bind(null, false)}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Divider />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {
                props.layerDetailsData && props.layerDetailsData.rows.map(row => (
                <TableRow>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
