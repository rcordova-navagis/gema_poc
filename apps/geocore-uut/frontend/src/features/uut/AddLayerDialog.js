import React, { useState, useCallback } from 'react';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Close} from '@material-ui/icons';
import {LayerDetailsForm, LayerDetailsUpload} from "./index";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {saveLayer} from "./redux/saveLayer";

const PROCESS_STEPS = ['Layer Details', 'Upload/Set Datasource'];

const validationSchema = Yup.object({
   name: Yup.string().required('Required'),
   category_id: Yup.string().required('Required'),
});

export default function AddLayerDialog(props) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [layerFiles, setLayerFiles] = useState([]);

  const isStepOptional = (step) => { return step === 1; };
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

  const formik = useFormik({
      initialValues: {
          name: '',
          category_id: '',
          sourcefile: null,
      },
      validationSchema,
      onSubmit: values => {
          console.log('onSubmit: ',values);
          // TODO: aggreagate data from textfields, dropdown select and dataset file
          // TODO: install redux-saga
          // TODO: call a redux action here
          // TODO: call apiservice savelayer inside redux action
          // TODO: take action on appropriate return on response
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
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={props.showAddLayerModal}
            onClose={null}
            className="uut-add-layer-dialog"
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Toolbar>
                        <Typography variant="h6" display="inline">New Layer</Typography>
                        <span style={{flexGrow: 1}}></span>
                        <IconButton
                            edge="end"
                            color="inherit" aria-label="menu"
                            onClick={() => {
                                props.setShowAddLayerModal(false);
                            }}>
                            <Close />
                        </IconButton>
                    </Toolbar>
                </DialogTitle>

                <DialogContent>
                    <Stepper activeStep={activeStep}>
                        {PROCESS_STEPS.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepOptional(index)) {
                                labelProps.optional = <Typography variant="caption">(Optional)</Typography>;
                            }

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <div>
                        {
                            activeStep === 0
                            ? <LayerDetailsForm formik={formik} categories={props.categories} />
                            : <LayerDetailsUpload handleOnFileChange={handleOnFileChange}
                                                  layerFiles={layerFiles} />
                        }
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button disabled={activeStep === 0}
                            onClick={handleBack}
                            type="button"
                    >
                        Back
                    </Button>

                    <Button
                        disabled={activeStep === PROCESS_STEPS.length - 1}
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        type="button"
                    >
                        Next
                    </Button>

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
