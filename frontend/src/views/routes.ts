//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/*` paths.
 *
 * Redirects all users from `/` to `/vis`.
 */
export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Redirect('/cmp')
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
    component: asyncComponent({
      resolve: () => System.import('./Transformation')
    })
  },
  {
    path: '/algo',
    component: asyncComponent({
      resolve: () => System.import('./Algorithms')
    })
  },
];

