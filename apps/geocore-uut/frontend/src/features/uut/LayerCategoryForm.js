import React, { useState, useEffect,  } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
} from '@material-ui/core';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import {isEmpty} from 'underscore';
import {updateTreeNode} from './../../libs/geocore-common';



export default function LayerCategoryForm(props) {
  const _categories = props.categories;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
        if (!isEmpty(_categories)) {
            setCategories(_categories);
        }
  }, [_categories]);

  const onParentSelectChange = (currentNode, selectedNodes) => {
        let newTree;
        if (selectedNodes.length) {
            newTree = updateTreeNode(categories, selectedNodes[0].id);
            props.formik.setFieldValue('parentId', selectedNodes[0].id);
        } else {
            newTree = updateTreeNode(categories, null);
            props.formik.setFieldValue('parentId', null);
        }
        setCategories(newTree);
  };

  return (
    <div className="uut-layer-category-form">
        <form onSubmit={props.formik.handleSubmit}>
            <Card>
                <CardContent container
                             direction="row"
                             justify="center"
                             alignItems="center"
                             className="utt-form-grid"
                >
                    <Grid item md={12}>
                        <TextField id="name"
                                   label="Category Name"
                                   helperText={props.formik.errors.name ? props.formik.errors.name : ''}
                                   error={Boolean(props.formik.errors.name)}
                                   onChange={props.formik.handleChange}
                                   value={props.formik.values.name}
                                   fullWidth
                                   required />
                    </Grid>

                    <Grid item md={12}>
                        <DropdownTreeSelect data={categories}
                                            texts={{ placeholder: 'Select Parent' }}
                                            mode="radioSelect"
                                            showDropdown={true}
                                            keepTreeOnSearch={true}
                                            hierarchical={true}
                                            onChange={onParentSelectChange} />
                    </Grid>
                </CardContent>

                <CardActions className="uut-new-category-actions">
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                    >
                        <Button variant="contained"
                                onClick={() => {
                                    props.formik.resetForm();
                                    props.setShowNewLayerForm(false);
                                }}
                        >
                            Cancel
                        </Button>

                        <Button color="primary"
                                variant="contained"
                                type="submit"
                        >
                            Save
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        </form>
    </div>
  );
};
