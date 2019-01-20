//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';
import LangInput, {
  InputType,
  ValueStore
} from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
import { validate } from './validation';
import { ComparisonRequest, ComparisonResponse } from 'lib/types';
import { ValidationError } from 'lib/validate';
import { ParseError } from 'lib/parse';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface ControllerProps {
  result: ComparisonResponse;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onCompare: (data: ComparisonRequest) => any;
}

interface InputValue {
  selected: InputType;
  values: ValueStore;
}

interface ControllerState {
  lhs: InputValue;
  rhs: InputValue;
  error: boolean;
  showResult: boolean;
}
//#endregion

class Controller extends React.Component<ControllerProps, ControllerState> {
  public state = {
    lhs: {
      selected: InputType.Grammar,
      values: {
        au: { header: [], body: [] },
        gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
        re: ''
      }
    },
    rhs: {
      selected: InputType.Grammar,
      values: {
        au: { header: [], body: [] },
        gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
        re: ''
      }
    },
    error: false,
    showResult: false
  };

  /**
   * Handle form submission.
   *
   * @description Performs validation of both inputs. If validation does not any errors,
   * the `onCompare` handler is called. If validation emits any error, the `handleSubmitError`
   * method is called with emitted error as an arguemnt.
   */
  private handleSubmit() {
    try {
      const lhs = validate(this.state.lhs);
      const rhs = validate(this.state.rhs);
      this.setState({showResult: true}, () => this.props.onCompare({ lhs, rhs }));
      this.setState({ error: false });
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
    this.setState({ error: true });
  }

  public componentWillReceiveProps(nextProps: ControllerProps) {
    // Check if an error occoured.
    if (!this.props.meta.error && nextProps.meta.error) {
      const message = 'Connection error';
      const description = 'There appears to be a problem. Please try repeating the action.';
      this.presentError(message, description);
    }
  }

  //#region Rendering
  public render() {
    return (
      <View
        Header={this.renderHeader()}
        Controls={this.renderControls()}
      >
        <Row type="flex" justify="space-around">
          <Col span={10}>
            <LangInput
              onChange={(data: InputValue) => this.setState({ lhs: data, showResult: false })}
            />
          </Col>
          <Col span={10}>
            <LangInput
              onChange={(data: InputValue) => this.setState({ rhs: data, showResult: false })}
            />
          </Col>
        </Row>
      </View>
    );
  }

  private renderHeader() {
    return <h1>Comparison</h1>;
  }

  private renderControls() {
    const { retrieved, pending } = this.props.meta;
    const { error } = this.state;
    return (
      <Controls
        onSubmit={this.handleSubmit.bind(this)}
        pending={this.props.meta.pending}
        result={retrieved && !pending && !error ? this.props.result.result : undefined}
        showResult={this.state.showResult}
      />
    );
  }
  //#endregion
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
