import React from 'react';
import {
    Paper,
    Container,
    Divider
} from '@material-ui/core';
import {
    UutListToolbar,
    UutListView,
    UutTableView,
    ManageLayerCategoriesDialog,
    AddLayerDialog
} from "./index";


export default function UutLists(props) {
  return (
        <Paper elevation={1}
               className="uut-uut-dashboard-item-content uut-uut-list">

            <ManageLayerCategoriesDialog {...props} />

            <AddLayerDialog {...props} />

            <UutListToolbar {...props} />

            <Divider />

            <Container className="uut-uut-list-container">
                {
                    props.isListMaximize
                    ? <UutTableView data={props.data} />
                    : <UutListView data={props.data} />
                }
            </Container>
        </Paper>
  );
};


