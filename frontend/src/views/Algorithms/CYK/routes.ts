//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/cyk/*` paths.
 *
 * Redirects all users from `/algo/cyk` to `/algo/cyk/input`.
 */
export const routes = getRoutes(
  '/algo/cyk', 
  System.import('./input'), 
  System.import('./result')
);

