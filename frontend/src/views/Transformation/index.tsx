//#region imports
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { notification } from 'antd';
import {
  InputType,
  ValueStore
} from 'components/LangInput';
import { RouteHandler } from 'components';
import { ValidationError } from 'lib/validate';
import { ParseError } from 'lib/parse';

import { routes } from './routes';
import { validate } from './validation';
//#endregion

//#region Component interfaces
interface InputState {
  selected: InputType;
  values: ValueStore;
}

interface ControllerState extends InputState {
  target: InputType;
}
//#endregion

class Controller extends React.Component<RouteComponentProps<any>, ControllerState> {
  public state = {
    target: InputType.Grammar,
    selected: InputType.Grammar,
    values: {
      au: { header: [], body: [] },
      gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
      re: ''
    }
  };

  public componentDidMount() {
    if (this.props.location.pathname !== '/tran/input') {
      this.props.history.push('/tran/input');
    }
  }

  private handleSubmit()  {
    try {
      const { selected, values } = this.state;
      /*const value =*/ validate({ selected, values });

      this.props.history.push(`/tran/result/${this.state.target}`);
    } catch (err) {
      this.handleSubmitError(err);
    }
  }

  /**
   * Handle form submission error.
   *
   * @description If passed error is an instance of a custom error (`ValidationError`,
   * `ParseError`), use name and description of that error to present an error
   * notification. If the error is not of any expected type, present user with
   * default error name and description.
   *
   * @param err An error emitted during input validation process.
   */
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

  /**
   * Presents an error with given `message` and `description`.
   *
   * @param message Notification message.
   * @param description Notification description.
   */
  private presentError(message: string, description: string) {
    notification.error({ message, description });
  }

  private handleNavigateBack() {
    this.props.history.goBack();
  }

  private handleTargetChange(target: InputType) {
    this.setState({ target });
  }

  private handleValueChange(change: InputState) {
    this.setState(change);
  }

  public render() {
    return (
      <RouteHandler
        routes={routes}
        onBack={this.handleNavigateBack.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onTargetChange={this.handleTargetChange.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
        defaultValue={this.state}
      />
    );
  }
}

export default withRouter(Controller);
