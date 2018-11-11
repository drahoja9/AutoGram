//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/rec/*` paths.
 *
 * Redirects all users from `/algo/rec` to `/algo/rec/input`.
 */
export const routes = getRoutes(
  '/algo/rec', 
  System.import('./input'), 
  System.import('./result')
);

