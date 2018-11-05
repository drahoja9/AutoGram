//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/det*` paths.
 *
 * Redirects all users from `/algo/det` to `/algo/det/input`.
 */
export const routes = getRoutes(
  '/algo/det', 
  System.import('./input'), 
  System.import('./result')
);

