//#region imports
import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
//#endregion

/**
 * Interface for a route handler.
 */
export interface RouteHandlerProps extends React.ClassAttributes<any> {
  routes: RouteProps[];
  [param: string]: any;
}

/**
 * A convenience component, that serves as a route crossroad for multiple
 * paths, which share a common prefix e.g. `/algo/cyk` and `/algo/cnf` share
 * the `/algo` path.
 *
 * We can use this to futher modularize the application and since the common
 * prefix usually means also some logical relation, we can better group and handle
 * common application state.
 */
const RouteHandler: React.SFC<RouteHandlerProps> = (props: RouteHandlerProps) => (
  // Bug in typings => Cannot return an array from a stateless component.
  <>
    {
      props.routes.map((route, i) => {
        const parentProps = Object.assign({}, props) as any;
        // Remove routes to prevent infinite loop
        delete parentProps.routes;

        return (
          <Route
            key={i}
            exact={route.exact}
            strict={route.strict}
            path={route.path}
            render={(componentProps) => (
              route.component ?
                <route.component {...componentProps} {...parentProps} />
                : undefined
            )}
          />
        );
      })
    }
  </>
);

export default RouteHandler;
