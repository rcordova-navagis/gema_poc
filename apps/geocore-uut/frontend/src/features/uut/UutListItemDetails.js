import React, {Fragment, useState, useEffect } from 'react';
import {Paper, Container, AppBar, Typography, Tabs, Tab, Box} from '@material-ui/core';
import {getlayerDetailsQuery} from './../../libs/geocore-common/gql';
import {useQuery} from '@apollo/react-hooks';
import {DatasetMap, DatasetTable} from "./index";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className="uut-uut-list-item-details-flex-content"
            role="tabpanel"
            style={value !== index ? {'display': 'none'} : {'display': 'flex'}}
            id={`uut-details-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </div>
    );
}


export default function UutListItemDetails(props) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Paper elevation={1}
           className="uut-uut-list-item-details">
        {/*<AppBar position="static" color="inherit">*/}
        {/*    <Toolbar className="geocore-toolbar">*/}
        {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
        {/*            <MenuIcon />*/}
        {/*        </IconButton>*/}

        {/*        <span style={{flexGrow: 1}}></span>*/}

        {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
        {/*            <FullscreenIcon />*/}
        {/*        </IconButton>*/}
        {/*    </Toolbar>*/}
        {/*</AppBar>*/}

        <Container disableGutters={true} maxWidth="xl">
            <AppBar position="static" color="default">
                <Tabs value={currentTab}
                      textColor="primary"
                      indicatorColor="primary"
                      onChange={(e, val) => {
                          console.log('on change tab: ',e,val,currentTab);
                          setCurrentTab(val);
                      }}
                >
                    <Tab label="Table View" id="uut-details-tab-0" />
                    <Tab label="Map View" id="uut-details-tab-1" />
                </Tabs>
            </AppBar>
            <TabPanel value={currentTab} index={0}>
                <DatasetTable dataset={props.dataset} />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <DatasetMap dataset={props.dataset} />
            </TabPanel>
            {/*<div role="tabpanel" id="dataset-tabpanel-0" hidden={currentTab !== 0} className="uut-uut-list-item-details-flex-content">*/}
            {/*    <DatasetTable />*/}
            {/*</div>*/}
            {/*<div role="tabpanel" id="dataset-tabpanel-1" hidden={currentTab !== 1} className="uut-uut-list-item-details-flex-content">*/}
            {/*    <DatasetMap />*/}
            {/*</div>*/}
        </Container>
    </Paper>
  );
};

