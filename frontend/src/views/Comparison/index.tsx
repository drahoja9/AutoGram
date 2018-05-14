//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';
import LangInput from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
import { validate } from './validation';
//#endregion

export default class Controller extends React.Component<{}, any> {
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
    console.log(validate(this.state.lhs));
    console.log(validate(this.state.rhs));
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
      />
    );
  }
}
