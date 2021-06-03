import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import _ from 'lodash';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import authenticationRoute from '../features/authentication/route';
import uutRoute from '../features/uut/route';
import datasourceRoute from '../features/datasource/route';
import layerRoute from '../features/layer/route';
import categoryRoute from '../features/category/route';
import boundariesRoute from '../features/boundaries/route';


// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  commonRoute,
  authenticationRoute,
  uutRoute,
  datasourceRoute,
  layerRoute,
  categoryRoute,
  boundariesRoute,
];


// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));

  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }

  route.childRoutes.forEach(handleIndexRoute);
}


const getRoutes = function (state) {
    // const protectedRoutes = childRoutes.slice(1).map(r => {
    //   if (r.protected !== true || (r.protected === true && state.authentication.user)) {
    //     return r;
    //   }
    //
    //   if (r.component) {
    //     r.component = (<Redirect to={{
    //         pathname: "/login"
    //     }}/>);
    //   }
    //   return r;
    // });

    const routes = [{
      path: '/',
      component: App,
      childRoutes: [
        ...childRoutes,
        { path: '*', name: 'Page not found', component: PageNotFound },
      ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
    }];

    routes.forEach(handleIndexRoute);

    return routes;
};

export {getRoutes};

