import React, { useState, useCallback } from 'react';
import {Paper, Container, Typography} from '@material-ui/core';


export default function UutListItemDetails(props) {
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

        <Container>
            <Typography variant="h6">
                UUT Item Details
            </Typography>
        </Container>
    </Paper>
  );
};

