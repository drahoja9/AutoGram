//#region imports
import * as React from 'react';
import { Layout, Row, Col } from 'antd';

import {
  ResultHeader as Header
} from 'components/Layout';

//#endregion

//#region Component interfaces
export interface ResultProps<InputType, ResultType> {
  defaultValue: any;
  inputValue: InputType;
  onBack: () => any;
  result: ResultType;
}
//#endregion

export default abstract class Controller<InputType, ResultType> extends React.Component<ResultProps<InputType, ResultType>>{
  protected abstract get headline(): string;
  protected abstract get inputContent(): JSX.Element;
  protected abstract get resultContent(): JSX.Element;
  //protected abstract get stepsContent(): JSX.Element | null;
  //protected abstract get content(): JSX.Element;

  public render() {
    return (
      <Layout>
        <Header 
          header={this.headline} 
          onBack={this.props.onBack} 
        />
        <Layout>
          <Row>
            <Col span={12}>
              {this.inputContent}
            </Col>
            <Col span={12}>
              {this.resultContent}
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}


