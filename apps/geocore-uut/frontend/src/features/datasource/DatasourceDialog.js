import React, { useCallback, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Toolbar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFormik } from 'formik';
import {saveLayer} from "../uut/redux/saveLayer";
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {LayerDetailsUpload} from "../uut";


const validationSchema = Yup.object({
    layerId: Yup.string().required('Required'),
});


export default function DatasourceDialog(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [layerFiles, setLayerFiles] = useState([]);

  const formik = useFormik({
      initialValues: {
          layerId: null,
          sourcefile: null,
      },
      validationSchema,
      onSubmit: values => {
          console.log('onSubmit: ',values);
          let formData = new FormData();//{...values, sourcefile: values.sourcefile};
          for (let i in values) {
              formData.append(i, values[i]);
          }
          dispatch(saveLayer(formData));
      },
  });

  const setSourcefileFieldCallback = useCallback((value) => {
      formik.setFieldValue('sourcefile', value);
  }, [formik]);

  const handleOnFileChange = useCallback((files) => {
      console.log('handleOnFileChange: ',files);
      if (files.length) {
          setSourcefileFieldCallback(files[0]);
      } else {
          setSourcefileFieldCallback(null);
      }
      setLayerFiles(files);
  },[setSourcefileFieldCallback]);

  return (
    <Dialog fullWidth
            fullScreen={fullScreen}
            open={props.showDatasourceDialog}
            className="datasource-datasource-dialog">
        <form onSubmit={null}>
            <DialogTitle>
                <Toolbar>
                    <Typography variant="h6" display="inline">Datasource</Typography>
                    <span style={{flexGrow: 1}}></span>
                    <IconButton
                        edge="end"
                        color="inherit" aria-label="menu"
                        onClick={() => {
                            props.toggleDatasourceDialog(false);
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </DialogTitle>

            <DialogContent>
                <LayerDetailsUpload handleOnFileChange={handleOnFileChange}
                                    layerFiles={layerFiles} />
            </DialogContent>

            <DialogActions>
                <Button variant="contained"
                        color="primary"
                        disabled={!(formik.isValid && formik.dirty)}
                        type="submit"
                >
                    Save
                </Button>
            </DialogActions>
        </form>
    </Dialog>
  );
};
