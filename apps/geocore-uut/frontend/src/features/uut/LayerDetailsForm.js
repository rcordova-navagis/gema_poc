import React, {useEffect, useState} from 'react';
import {Grid, TextField} from '@material-ui/core';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import {updateTreeNode} from './../../libs/geocore-common';
import {isEmpty} from 'underscore';



export default function LayerDetailsForm(props) {
    const _categories = props.categories;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!isEmpty(_categories)) {
            setCategories(_categories);
        }
    }, [_categories]);

    const onDropdownChange = (currentNode, selectedNodes) => {
        let newTree;

        if (selectedNodes.length) {
            newTree = updateTreeNode(categories, selectedNodes[0].id);
            props.formik.setFieldValue('category_id', selectedNodes[0].id);
        } else {
            newTree = updateTreeNode(categories, null);
            props.formik.setFieldValue('category_id', null);
        }

        setCategories(newTree);
    };

  return (
    <div className="uut-layer-details-form">
        <Grid container
              direction="row"
              justify="center"
              alignItems="stretch"
              className="utt-form-grid"
        >
            <Grid item md={8}>
                <TextField id="name"
                           label="Layer"
                           helperText={props.formik.errors.name ? props.formik.errors.name : ''}
                           error={Boolean(props.formik.errors.name)}
                           onChange={props.formik.handleChange}
                           value={props.formik.values.name}
                           fullWidth
                           required />
            </Grid>

            <Grid item md={8}>
                <DropdownTreeSelect data={categories}
                                    texts={{ placeholder: 'Select layer category' }}
                                    mode="radioSelect"
                                    showDropdown={true}
                                    keepTreeOnSearch={true}
                                    hierarchical={true}
                                    onChange={onDropdownChange} />
            </Grid>
        </Grid>

    </div>
  );
};
