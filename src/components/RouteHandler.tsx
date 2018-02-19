import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export interface IRouteHandler extends React.ClassAttributes<any> {
  routes: RouteProps[];
  [param: string]: any;
}

export default class RouteHandler extends React.Component<IRouteHandler> {
  public render() {
    return this.props.routes.map((route, i) => {
      const parentProps = Object.assign({}, this.props) as any;
      delete parentProps.routes;

      return (
        <Route
          key={i}
          exact={route.exact}
          strict={route.strict}
          path={route.path}
          render={(componentProps) => (
            route.component ? <route.component {...componentProps} {...parentProps} /> : undefined
          )}
        />
      );
    });
  }
}
