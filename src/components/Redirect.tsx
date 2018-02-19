import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Redirect = (to: string) => (
  withRouter(
    (props: RouteComponentProps<any>) => (
      props.history.replace(to) || <div />
    )
  )
);

export default Redirect;
