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
    path: '/algo/det',
    exact: true,
    component: Redirect('/algo/det/input')
  },
  {
    path: '/algo/det/input',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./input/index.tsx')
    })
  },
  {
    path: '/algo/det/result',
    component: asyncComponent({
      resolve: () => System.import('./result')
    })
  },
];

