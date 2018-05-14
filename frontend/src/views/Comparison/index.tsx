//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import LangInput from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
import { validate } from './validation';
import { ComparisonRequest } from 'lib/types';
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
    const lhs = validate(this.state.lhs);
    const rhs = validate(this.state.rhs);
    if (validate(this.state.lhs) && validate(this.state.rhs)) {
      this.props.onCompare({ lhs, rhs });
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
