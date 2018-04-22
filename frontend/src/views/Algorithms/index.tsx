//#region imports
import * as React from 'react';
import { RouteHandler } from 'components';
import { routes } from './routes';
//#endregion

/**
 * Common route handler for all `/algo` paths.
 */
const Algorithms: React.SFC<{}> = () => (
  <RouteHandler routes={routes} />
);

export default Algorithms;
