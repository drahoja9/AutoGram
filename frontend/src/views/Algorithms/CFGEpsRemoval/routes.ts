//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/cfg_eps/*` paths.
 *
 * Redirects all users from `/algo/cfg_eps` to `/algo/cfg_eps/input`.
 */
export const routes = getRoutes(
  '/algo/cfg_eps', 
  System.import('./input'), 
  System.import('./result')
);

