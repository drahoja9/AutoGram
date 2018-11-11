//#region imports
declare var System: any;
import getRoutes from 'components/AlgorithmView/Routes';
//#endregion

/**
 * Top level routing for `/algo/der*` paths.
 *
 * Redirects all users from `/algo/der` to `/algo/der/input`.
 */
export const routes = getRoutes(
  '/algo/der', 
  System.import('./input'), 
  System.import('./result')
);

