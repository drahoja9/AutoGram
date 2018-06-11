//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/*` paths.
 *
 * Redirects all users from `/` to `/vis`.
 */
export const routes: RouteProps[] = [
  {
    path: '/tran',
    component: asyncComponent({
      resolve: () => System.import('./input')
    })
  },
  {
    path: '/tran/result',
    component: asyncComponent({
      resolve: () => System.import('./result')
    })
  },
];

