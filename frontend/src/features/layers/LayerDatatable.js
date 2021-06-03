import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Toolbar
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


export default function LayerDatatable(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullWidth
            fullScreen={fullScreen}
            open={props.isLayerTableVisible}
            className="layers-layer-datatable">
        <DialogTitle>
          <Toolbar>
              <Typography variant="h6" display="inline">View Data</Typography>
              <span style={{flexGrow: 1}}></span>
              <IconButton
                  edge="end"
                  color="inherit"
                  onClick={props.toggleLayerTableVisibility.bind(this, false)}>
                  <Close />
              </IconButton>
          </Toolbar>
        </DialogTitle>

        <DialogContent>
                      content here...
        </DialogContent>

    </Dialog>
  );
};

