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
      resolve: () => System.import('components/Results/automaton')
    })
  },
  {
    path: '/tran/result/gr',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('components/Results/grammar')
    })
  },
  {
    path: '/tran/result/re',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('components/Results/regexp')
    })
  },
];

