//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/cfg_unit/*` paths.
 *
 * Redirects all users from `/algo/cfg_unit` to `/algo/cfg_unit/input`.
 */
export const routes = getRoutes(
  '/algo/cfg_unit', 
  System.import('./input'), 
  System.import('./result')
);

