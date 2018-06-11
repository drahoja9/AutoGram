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
    path: '/trans/result/au',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./automaton')
    })
  },
  {
    path: '/trans/result/gr',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./grammar')
    })
  },
  {
    path: '/trans/result/re',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./regexp')
    })
  },
];

