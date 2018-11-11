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
    path: '/algo/red',
    component: asyncComponent({
      resolve: () => System.import('./CFGreduction')
    })
  },
  {
    path: '/algo/cnf',
    component: asyncComponent({
      resolve: () => System.import('./CNF')
    })
  },
  {
    path: '/algo/cyk',
    component: asyncComponent({
      resolve: () => System.import('./CYK')
    })
  }];

