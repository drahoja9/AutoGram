//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing.
 *
 * Redirects all users from `/` to `/vis`
 */
export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Redirect('/vis')
  },
  {
    path: '/vis',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Visualization')
    })
  },
  {
    path: '/cmp',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Comparison')
    })
  },
  {
    path: '/tran',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Transformation')
    })
  },
];

