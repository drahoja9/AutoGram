//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/cnf/*` paths.
 *
 * Redirects all users from `/algo/cnf` to `/algo/cnf/input`.
 */
export const routes = getRoutes(
  '/algo/cnf', 
  System.import('./input'), 
  System.import('./result')
);

