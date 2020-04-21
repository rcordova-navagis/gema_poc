/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { hot, setConfig } from 'react-hot-loader';
import {ApolloProvider} from '@apollo/react-hooks';
import store from './common/store';
import {getRoutes} from './common/routeConfig';
import history from './common/history';
import client from './common/apollo';

setConfig({
  logLevel: 'debug',
});

function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;

    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }

    newContextPath = newContextPath.replace(/\/+/g, '/');

    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);

      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />,
      );
    } else if (item.component) {
      children.push(
          <Route key={newContextPath} render={props => <item.component {...props}></item.component>} path={newContextPath} exact />,
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

function Root() {
  const routeConfig = getRoutes(store.getState());

  const children = renderRouteConfigV3(routeConfig, '/');

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default hot(module)(Root);

