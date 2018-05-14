//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';
import LangInput from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
//#endregion

export default class Controller extends React.Component<{}, any> {

  private handleSubmit() {

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
              onChange={(data: any) => console.log(data)}
            />
          </Col>
          <Col span={12}>
            <LangInput
              onChange={(data: any) => console.log(data)}
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
