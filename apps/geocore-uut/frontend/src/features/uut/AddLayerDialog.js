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
import ApiService from "../common/services/ApiService";

const PROCESS_STEPS = ['Layer Details', 'Upload/Set Datasource'];

const validationSchema = Yup.object({
   layer: Yup.string().required('Required')
});

// const getContentStep = (step) => {
//     switch(step) {
//         case 1:
//             return <LayerDetailsUpload />
//         default:
//             return <LayerDetailsForm />;
//     }
// };

export default function AddLayerDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);

  const isStepOptional = (step) => { return step === 1; };
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };


  const formik = useFormik({
      initialValues: {
          layer: '',
          categoryName: '',
          categoryId: '',
      },
      validationSchema,
      onSubmit: values => {
          console.log('onSubmit: ',values);

          // TODO: aggreagate data from textfields, dropdown select and dataset file
          // TODO: install redux-saga
          // TODO: call a redux action here
          // TODO: call apiservice savelayer inside redux action
          // TODO: take action on appropriate return on response
          // ApiService.saveLayer()
          //     .then((response) => {
          //
          //     });
      },
  });

  const [layerFiles, setLayerFiles] = useState([]);
  const handleOnFileChange = (files) => {
      console.log('handleOnFileChange: ',files);
      setLayerFiles(files);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={props.showAddLayerModal}
            onClose={null}
            className="uut-add-layer-dialog"
        >
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
                        ? <LayerDetailsForm formik={formik} />
                        : <LayerDetailsUpload handleOnFileChange={handleOnFileChange}
                                              layerFiles={layerFiles} />
                    }
                </div>
            </DialogContent>

            <DialogActions>
                <Button disabled={activeStep === 0}
                        onClick={handleBack}
                >
                    Back
                </Button>

                <Button
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                >
                    Next
                </Button>

                <Button type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        color="primary"
                        autoFocus
                        disabled={!(formik.isValid && formik.dirty)}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </form>
  );
};
