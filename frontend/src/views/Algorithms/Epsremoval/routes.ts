//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/eps/*` paths.
 *
 * Redirects all users from `/algo/eps` to `/algo/eps/input`.
 */
export const routes = getRoutes(
  '/algo/eps', 
  System.import('./input'), 
  System.import('./result')
);

