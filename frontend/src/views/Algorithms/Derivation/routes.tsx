//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/algo/der*` paths.
 *
 * Redirects all users from `/algo/der` to `/algo/der/input`.
 */
export const routes: RouteProps[] = [
  {
    path: '/algo/der',
    exact: true,
    component: Redirect('/algo/der/input')
  },
  {
    path: '/algo/der/input',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./input')
    })
  },
  {
    path: '/algo/der/result',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./result')
    })
  },
];

