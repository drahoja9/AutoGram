//#region imports
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
//#endregion

/**
 * Returns a component, which upon mount redirecs user to `to` location.
 *
 * @param to Location where a user should be redirected to.
 */
const Redirect = (to: string) => (
  withRouter(
    (props: RouteComponentProps<any>) => (
      props.history.replace(to) || <div />
    )
  )
);

export default Redirect;
