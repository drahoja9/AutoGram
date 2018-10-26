//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/trans*` paths.
 *
 * Redirects all users from `/trans` to `/trans/input`.
 */
export const routes: RouteProps[] = [
  {
    path: '/tran',
    exact: true,
    component: Redirect('/tran/input')
  },
  {
    path: '/tran/input',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./input')
    })
  },
  {
    path: '/tran/result',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./result')
    })
  },
];

