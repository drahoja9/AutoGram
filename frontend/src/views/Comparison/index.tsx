//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';
import LangInput from 'components/LangInput';
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

export interface ControllerProps {
  result: boolean;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onCompare: (data: ComparisonRequest) => any;
}

class Controller extends React.Component<ControllerProps, any> {
  public state = {
    lhs: {
      selected: 'gr',
      values: {
        au: { header: [], body: [] },
        gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
        re: ''
      }
    },
    rhs: {
      selected: 'gr',
      values: {
        au: { header: [], body: [] },
        gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
        re: ''
      }
    }
  };

  private handleSubmit() {
    try {
      const lhs = validate(this.state.lhs);
      const rhs = validate(this.state.rhs);
      this.props.onCompare({ lhs, rhs });
    } catch (err) {
      if (err instanceof ValidationError) {
        notification.error({
          message: err.name,
          description: err.getMessage()
        });
      } else {
        notification.error({
          message: 'Unexpected error',
          description: 'There was an unexpected error. Try repeating the action and/or reviewing the syntax.'
        });
      }
    }
  }

  public componentWillReceiveProps(nextProps: ControllerProps) {
    if (!this.props.meta.error && nextProps.meta.error) {
      notification.error({
        message: 'Connection error',
        description: 'There appears to be a problem. Please try repeating the action.'
      });
    }
  }

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
    return (
      <Controls
        onSubmit={this.handleSubmit.bind(this)}
        pending={this.props.meta.pending}
        result={this.props.meta.retrieved ? this.props.result : undefined}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
