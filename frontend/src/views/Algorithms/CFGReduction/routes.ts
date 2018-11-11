//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/cfg_red/*` paths.
 *
 * Redirects all users from `/algo/cfg_red` to `/algo/cfg_red/input`.
 */
export const routes = getRoutes(
  '/algo/cfg_red',
  System.import('./input'),
  System.import('./result')
);

