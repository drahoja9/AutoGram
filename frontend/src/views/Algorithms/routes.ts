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
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Determinization')
    })
  },
  {
    path: '/algo/min',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Minimization')
    })
  },
  {
    path: '/algo/der',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./Derivation')
    })
  },
  {
    path: '/algo/cnf',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./CNF')
    })
  },
  {
    path: '/algo/cyk',
    exact: true,
    component: asyncComponent({
      resolve: () => System.import('./CYK')
    })
  }];

