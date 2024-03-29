//#region imports
declare var System: any;
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Routing for `/algo/*` paths.
 *
 * Redirects all users from `/algo` to `/algo/det`
 */
export const routes: RouteProps[] = [
  {
    path: '/algo',
    exact: true,
    component: Redirect('/algo/det')
  },
  {
    path: '/algo/det',
    component: asyncComponent({
      resolve: () => System.import('./Determinization')
    })
  },
  {
    path: '/algo/min',
    component: asyncComponent({
      resolve: () => System.import('./Minimization')
    })
  },
  {
    path: '/algo/eps',
    component: asyncComponent({
      resolve: () => System.import('./Epsremoval')
    })
  },
  {
    path: '/algo/der',
    component: asyncComponent({
      resolve: () => System.import('./Derivation')
    })
  },
  {
    path: '/algo/cfg_red',
    component: asyncComponent({
      resolve: () => System.import('./CFGReduction')
    })
  },
  {
    path: '/algo/cfg_eps',
    component: asyncComponent({
      resolve: () => System.import('./CFGEpsRemoval')
    })
  },
  {
    path: '/algo/cfg_unit',
    component: asyncComponent({
      resolve: () => System.import('./CFGUnitRemoval')
    })
  },
  {
    path: '/algo/cnf',
    component: asyncComponent({
      resolve: () => System.import('./CNF')
    })
  },
  {
    path: '/algo/rec',
    component: asyncComponent({
      resolve: () => System.import('./Leftrecremoval')
    })
  },
  {
    path: '/algo/cyk',
    component: asyncComponent({
      resolve: () => System.import('./CYK')
    })
  }];

