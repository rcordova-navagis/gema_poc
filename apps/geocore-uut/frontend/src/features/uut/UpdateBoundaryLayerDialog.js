import React, { useCallback, useState } from 'react';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Close} from '@material-ui/icons';
import {LayerDetailsUpload} from "./index";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {useUpdateBoundaryLayer} from "../boundaries/redux/updateBoundaryLayer";


export default function UpdateBoundaryLayerDialog(props) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [layerFiles, setLayerFiles] = useState([]);
  const {updateBoundaryLayer, updateBoundaryLayerPending, updateBoundaryLayerError} = useUpdateBoundaryLayer();

  const formik = useFormik({
    initialValues: {
      sourcefile: null,
    },
    onSubmit: values => {
      console.log('onSubmit: ',values);
      let formData = new FormData();//{...values, sourcefile: values.sourcefile};
      for (let i in values) {
        formData.append(i, values[i]);
      }
      dispatch(updateBoundaryLayer(formData));
    },
  });

  const setSourcefileFieldCallback = useCallback((value) => {
    formik.setFieldValue('sourcefile', value);
  }, [formik]);

  const handleOnFileChange = useCallback((files) => {
    if (files.length) {
      setSourcefileFieldCallback(files[0]);
    } else {
      setSourcefileFieldCallback(null);
    }

    setLayerFiles(files);
  },[setSourcefileFieldCallback]);

  return (
    <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={props.showUpdateBoundaryLayerModal}
        onClose={null}
        className="uut-update-boundary-layer-dialog">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Toolbar>
                        <Typography variant="h6" display="inline">Update Boundary Layer</Typography>
                        <span style={{flexGrow: 1}}></span>
                        <IconButton
                            edge="end"
                            color="inherit" aria-label="menu"
                            onClick={() => {
                                props.setShowUpdateBoundaryLayerModal(false);
                            }}>
                            <Close />
                        </IconButton>
                    </Toolbar>
                </DialogTitle>

                <DialogContent>
                      <LayerDetailsUpload handleOnFileChange={handleOnFileChange}
                                          layerFiles={layerFiles} />
                </DialogContent>

                <DialogActions>
                    {
                        updateBoundaryLayerPending === true
                        ? <Button disabled variant="contained">Loading...</Button>
                        : <Button variant="contained"
                                  color="primary"
                                  disabled={!(formik.isValid && formik.dirty)}
                                  type="submit">Save</Button>
                    }
                </DialogActions>
        </form>
    </Dialog>
  );
};
