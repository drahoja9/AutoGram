//#region imports
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { notification } from 'antd';
import { connect } from 'react-redux';

import {
  InputType,
  ValueStore
} from 'components/LangInput';
import { RouteHandler } from 'components';
import { ValidationError } from 'lib/validate';
import { ParseError } from 'lib/parse';
import {
  TransformRequest,
  TransformationTarget
} from 'lib/types';

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
  onTransform: (data: TransformRequest) => any;
  onCancelTransform: () => any;
}

interface InputState {
  selected: InputType;
  values: ValueStore;
}

interface ControllerState extends InputState {
  target: InputType;
}
//#endregion

class Controller extends React.Component<ControllerProps, ControllerState> {
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

  public componentWillReceiveProps(nextProps: ControllerProps) {
    if (this.props.meta.pending && !nextProps.meta.pending && nextProps.meta.retrieved) {
      if (!nextProps.meta.error) {
        nextProps.history.push(`/tran/result/${this.state.target}`);
      }
    }
  }

  private getSource(): TransformationTarget {
    switch (this.state.target) {
    case InputType.Automaton: return TransformationTarget.FA;
    case InputType.Grammar: return TransformationTarget.RRG;
    case InputType.Regexp: return TransformationTarget.Regexp;
    default:
      console.error(`Unexpected case '${this.state.target}'`)
      throw new TypeError();
    }
  }

  private handleSubmit()  {
    try {
      const { selected, values } = this.state;
      const value = validate({ selected, values });

      this.props.onTransform({
        target: this.getSource(),
        source: value
      });
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
    if (this.props.meta.pending) {
      this.props.onCancelTransform();
    }
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
        pending={this.props.meta.pending}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Controller));
