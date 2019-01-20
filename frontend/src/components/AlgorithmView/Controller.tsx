//#region imports
import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { notification } from 'antd';

import { ValidationError } from 'lib/validate';
import { ParseError } from 'lib/parse';

import RouteHandler from 'components/RouteHandler';
//#endregion

//#region Component interfaces
export interface ControllerProps<Request> extends RouteComponentProps<any> {
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onSubmit: (data: Request) => any;
  onCancel: () => any;
}

export interface ControllerState<State, InputType> {
  values: State;
  inputValue : InputType | null;
}
//#endregion

export default abstract class Controller<Request, State> extends React.Component<ControllerProps<Request>, ControllerState<State, Request>> {
  public abstract get url(): string;
  public abstract get routes(): RouteProps[];

  public componentDidMount() {
    if (this.props.location.pathname !== `${this.url}/input`) {
      this.props.history.push(`${this.url}/input`);
    }
  }

  public componentWillReceiveProps(nextProps: ControllerProps<Request>) {
    if (this.props.meta.pending && !nextProps.meta.pending && nextProps.meta.retrieved) {
      if (!nextProps.meta.error) {
        nextProps.history.push(`${this.url}/result`);
      }
    }
  }

  protected abstract handleSubmit(): void;

  protected handleSubmitError(err: Error) {
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

  protected presentError(message: string, description: string) {
    notification.error({ message, description });
  }

  protected handleNavigateBack() {
    this.props.history.goBack();
  }

  protected handleValueChange(change: State) {
    this.setState(change);
  }

  public render() {
    return (
      <RouteHandler
        routes={this.routes}
        onBack={this.handleNavigateBack.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
        defaultValue={this.state}
        pending={this.props.meta.pending}
        inputValue={this.state.inputValue}
      />
    )
  }
}