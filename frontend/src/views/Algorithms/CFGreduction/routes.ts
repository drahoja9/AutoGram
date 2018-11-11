//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/red/*` paths.
 *
 * Redirects all users from `/algo/red` to `/algo/red/input`.
 */
export const routes = getRoutes(
  '/algo/red', 
  System.import('./input'), 
  System.import('./result')
);

