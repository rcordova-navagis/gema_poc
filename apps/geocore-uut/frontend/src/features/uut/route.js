// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { UutDashboard } from './';


export default {
  path: 'uut',
  childRoutes: [
    { path: '/', component: UutDashboard, isIndex: true },
  ],
};
