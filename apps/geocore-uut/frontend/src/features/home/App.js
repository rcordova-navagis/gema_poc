import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TopNav from "../common/TopNav";
import MyNavDrawer from "../common/MyNavDrawer";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const fullScreenRoutes = ['/login'];


export default function App(props) {
  const isFullScreenRoute = fullScreenRoutes.includes(props.location.pathname);
  const classes = useStyles();

  return (
      <div className={"app-base-page " + classes.root}>
          <MyNavDrawer user={null} />

          <Grid container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={0}
                className="app-base-page-body">
              {
                  isFullScreenRoute
                  ? null
                  : <Grid item
                          container
                          xs={1}
                          spacing={0}
                          className="app-header-cell">
                      <TopNav />
                  </Grid>
              }

              <Grid item
                    container
                    alignContent="stretch"
                    xs={isFullScreenRoute ? 12 : 11}
                    spacing={0}
                    className="page-content-container">
                  {props.children}
              </Grid>
          </Grid>
      </div>
  );
}
