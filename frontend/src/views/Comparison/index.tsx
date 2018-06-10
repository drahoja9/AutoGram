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
import { ComparisonRequest } from 'lib/types';
import { ValidationError } from 'lib/validate';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface ControllerProps {
  result: boolean;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onCompare: (data: ComparisonRequest) => any;
}

interface ControllerState {
  lhs: {
    selected: InputType;
    values: ValueStore;
  };
  rhs: {
    selected: InputType;
    values: ValueStore;
  }
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
    }
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
      this.props.onCompare({ lhs, rhs });
    } catch (err) {
      this.handleSubmitError(err);
    }
  }

  /**
   * Handle form submission error.
   *
   * @description If passed error is an instance of a custom error (`ValidationError`),
   * use name and description of that error to present an error notification.
   * If the error is not of any expected type, present user with default erro name
   * and description.
   *
   * @param err An error emitted during input validation process.
   */
  private handleSubmitError(err: Error) {
    if (err instanceof ValidationError) {
      this.presentError(err.name, err.getMessage());
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
        <Row>
          <Col span={12}>
            <LangInput
              onChange={(data: any) => this.setState({lhs: data})}
            />
          </Col>
          <Col span={12}>
            <LangInput
              onChange={(data: any) => this.setState({rhs: data})}
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
    const { retrieved, error } = this.props.meta;
    return (
      <Controls
        onSubmit={this.handleSubmit.bind(this)}
        pending={this.props.meta.pending}
        result={retrieved && !error ? this.props.result : undefined}
      />
    );
  }
  //#endregion
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
