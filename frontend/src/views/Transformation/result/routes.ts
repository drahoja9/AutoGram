//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/tran/result*` paths.
 */
export const routes: RouteProps[] = [
  {
    path: '/tran/result/au',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./automaton')
    })
  },
  {
    path: '/tran/result/gr',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./grammar')
    })
  },
  {
    path: '/tran/result/ex',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./regexp')
    })
  },
];

