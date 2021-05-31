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
    AddLayerDialog,
    UpdateBoundaryLayerDialog,
} from "./index";
import {DatasourceDialog} from "../datasource/index";


export default function UutLists(props) {
  return (
        <Paper elevation={1}
               className="uut-uut-dashboard-item-content uut-uut-list">

            <ManageLayerCategoriesDialog {...props} />

            <UpdateBoundaryLayerDialog {...props} />

            <AddLayerDialog categories={props.categories}
                            showAddLayerModal={props.showAddLayerModal}
                            setShowAddLayerModal={props.setShowAddLayerModal} />

            <DatasourceDialog showDatasourceDialog={props.showDatasourceDialog}
                              toggleDatasourceDialog={props.toggleDatasourceDialog} />

            <UutListToolbar {...props} />

            <Divider />

            <Container className="uut-uut-list-container">
                {
                    props.isListMaximize
                    ? <UutTableView data={props.data}
                                    showLayerDetails={props.showLayerDetails}
                                    setIsListMaximize={props.setIsListMaximize}
                                    deleteLayer={props.deleteLayer}
                                    toggleDatasourceDialog={props.toggleDatasourceDialog} />
                    : <UutListView data={props.data}
                                   showLayerDetails={props.showLayerDetails} />
                }
            </Container>
        </Paper>
  );
};


