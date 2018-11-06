//#region imports
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { notification } from 'antd';
import { connect } from 'react-redux';

import { AutomatonInputValue } from 'components/Forms/Automaton';
import { RouteHandler } from 'components';
import { ValidationError } from 'lib/validate';
import { ParseError } from 'lib/parse';
import { ENFA } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface ControllerProps extends RouteComponentProps<any> {
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onSubmit: (data: ENFA) => any;
  onCancel: () => any;
}

interface ControllerState {
  values: AutomatonInputValue;
}
//#endregion

class Controller extends React.Component<ControllerProps, ControllerState>{
  public state = {
    values: {
      header: [],
      body: [],
    }
  };

  public componentdDidMount() {
    if (this.props.location.pathname !== '/algo/eps/input') {
      this.props.history.push('/algo/eps/input');
    }
  }

  public componentWillReceiveProps(nextProps: ControllerProps) {
    if (this.props.meta.pending && !nextProps.meta.pending && nextProps.meta.retrieved) {
      if (!nextProps.meta.error) {
        nextProps.history.push('/algo/eps/result');
      }
    }
  }

  private handleSubmit() {
    const values = this.state.values;
    try {
      const value = validate({ values });
      this.props.onSubmit(value);
    } catch (err) {
      this.handleSubmitError(err);
    }

  }

  private handleSubmitError(err: Error) {
    if (err instanceof ValidationError) {
      this.presentError(err.name, err.getMessage());

    } else if (err instanceof ParseError) {
      this.presentError(err.name, err.message);

    } else {
      const message = 'Unexpected error';
      const description = 'There was an unexpected error. '
        + 'Try repeating the anction and/or reviewing the syntax.';
      this.presentError(message, description);
    }
  }

  private presentError(message: string, description: string) {
    notification.error({ message, description });
  }

  private handleNavigateBack() {
    this.props.history.goBack();
  }

  private handleValueChange(change: ControllerState) {
    this.setState(change);
  }

  public render() {
    return (
      <RouteHandler
        routes={routes}
        onBack={this.handleNavigateBack.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
        defaultValue={this.state}
        pending={this.props.meta.pending}
      />

    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Controller));
