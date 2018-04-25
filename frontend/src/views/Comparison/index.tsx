//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';
import LangInput from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
//#endregion

export default class Controller extends React.Component {
  private handleSubmit() {
    console.log('Should compare.');
  }

  public render() {
    return (
      <View
        Header={this.renderHeader()}
        Controls={this.renderControls()}
      >
        <Row>
          <Col span={12}>
            <LangInput />
          </Col>
          <Col span={12}>
            <LangInput />
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
