//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/algo/det*` paths.
 *
 * Redirects all users from `/algo/det` to `/algo/det/input`.
 */
export const routes: RouteProps[] = [
  {
    path: '/algo/min',
    exact: true,
    component: Redirect('/algo/min/input')
  },
  {
    path: '/algo/min/input',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./input')
    })
  },
  {
    path: '/algo/min/result',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./result')
    })
  },
];
