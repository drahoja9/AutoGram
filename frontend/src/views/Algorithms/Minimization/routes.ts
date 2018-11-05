//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/min*` paths.
 *
 * Redirects all users from `/algo/min` to `/algo/min/input`.
 */
export const routes = getRoutes(
  '/algo/min', 
  System.import('./input'), 
  System.import('./result')
);

