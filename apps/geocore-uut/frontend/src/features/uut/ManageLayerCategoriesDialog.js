import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Typography,
    Toolbar,
    Card,
    CardContent,
    Grid,
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {
    LayerCategoryTree,
    LayerCategoryForm
} from "./index";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {saveCategory} from "./redux/actions";
import {isEmpty} from 'underscore';


const validationSchema = Yup.object({
    name: Yup.string().required('Required')
});


export default function ManageLayerCategoriesDialog(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [showNewLayerForm, setShowNewLayerForm] = useState(false);

    const saveCategorySuccess = useSelector(state => state.uut.saveCategorySuccess);

    const resetForm = useCallback(() => {
        formik.resetForm();
    }, [formik]);

    const formik = useFormik({
        initialValues: {
            name: '',
            parentId: null,
        },
        validationSchema,
        onSubmit: values => {
            dispatch(saveCategory(values.name, values.parentId));
        },
    });

    useEffect(() => {
        if (saveCategorySuccess === true) {
            resetForm();
            setShowNewLayerForm(false);
        }
    }, [saveCategorySuccess, resetForm]);

  return (
    <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={props.showCategoriesModal}
        onClose={null}
        className="uut-manage-layer-categories-dialog">

            <DialogTitle>
                <Toolbar>
                    <Typography variant="h6" display="inline">Manage Layer Categories</Typography>
                    <span style={{flexGrow: 1}}></span>
                    <IconButton
                        edge="end"
                        color="inherit" aria-label="menu"
                        onClick={() => {
                            props.setShowCategoriesModal(false);
                        }}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </DialogTitle>

            <DialogContent>
                {
                    !showNewLayerForm
                    ?   <Grid direction="row"
                              justify="flex-end"
                              alignItems="center"
                              container>
                            <Grid item>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setShowNewLayerForm(true);
                                        }}
                                        className="uut-add-category-btn"
                                >
                                    New Category
                                </Button>
                            </Grid>
                        </Grid>
                    : null
                }

                {
                    showNewLayerForm
                    ?   <LayerCategoryForm
                            categories={props.categories}
                            formik={formik}
                            setShowNewLayerForm={setShowNewLayerForm} />
                    : null
                }

                {
                    !isEmpty(props.categories)
                    ?   <Card>
                            <CardContent>
                                <LayerCategoryTree categories={props.categories}  />
                            </CardContent>
                        </Card>
                    : null
                }
            </DialogContent>
    </Dialog>
  );
};
