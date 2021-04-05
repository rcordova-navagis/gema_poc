// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Login } from './';

export default {
  path: 'login',
  childRoutes: [
    { path: '', component: Login, protected: false, isFullScreen: true },
  ],
};
