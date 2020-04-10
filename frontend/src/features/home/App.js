import React from 'react';
import {Cell, Grid} from "react-md";
import TopNav from "../common/TopNav";
import MyNavDrawer from "../common/MyNavDrawer";


const fullScreenRoutes = ['/login'];


export default function App(props) {
  const isFullScreenRoute = fullScreenRoutes.includes(props.location.pathname);

  return (
      <div className="app-base-page">
          <MyNavDrawer user={null}/>

          <Grid className="app-base-page-body" noSpacing={true} stacked={true}>
              {
                  isFullScreenRoute
                  ? null
                  : <Cell className="app-header-cell"
                          size={2}
                          order={1}
                          align="top">
                      <TopNav />
                  </Cell>
              }

              <Cell size={isFullScreenRoute ? 12 : 10}
                    order={2}
                    className="page-content-container">
                  {props.children}
              </Cell>
          </Grid>
      </div>
  );
}
