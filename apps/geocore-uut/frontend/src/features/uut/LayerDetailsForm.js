import React from 'react';
import {Grid, TextField} from '@material-ui/core';
import DropdownTreeSelect from 'react-dropdown-tree-select';


const data = {
    label: 'Technology',
    value: 'technology',
    children: [
        {
            label: 'LTE',
            value: 'lte',
        },
        {
            label: 'GPON',
            value: 'gpon',
        },
        {
            label: 'Wireline',
            value: 'wireline',
            children: [
                {
                    label: 'SAT Wireline',
                    value: 'sat_wireline',
                },
                {
                    label: 'Another Wireline',
                    value: 'ano_wireline',
                },
            ],
        },
    ],
};


export default function LayerDetailsForm(props) {
    const onChange = (currentNode, selectedNodes) => {
        console.log("path::", currentNode.path);
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
                <TextField id="layer"
                           label="Layer"
                           helperText={props.formik.errors.layer ? props.formik.errors.layer : ''}
                           error={Boolean(props.formik.errors.layer)}
                           onChange={props.formik.handleChange}
                           value={props.formik.values.layer}
                           fullWidth
                           required />
            </Grid>

            <Grid item md={8}>
                <DropdownTreeSelect data={data}
                                    texts={{ placeholder: 'Select layer category' }}
                                    mode="radioSelect"
                                    showDropdown={true}
                                    keepTreeOnSearch={true}
                                    hierarchical={true}
                                    onChange={onChange} />
            </Grid>
        </Grid>

    </div>
  );
};
