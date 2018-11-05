//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';

import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';

//#endregion

//#region Component interfaces
export interface ResultProps<ResultType> {
  onBack: () => any;
  result: ResultType;
}
//#endregion

export default abstract class Controller<ResultType> extends React.Component<ResultProps<ResultType>>{
  protected abstract get headline(): string;
  protected abstract get content(): JSX.Element;

  public render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={12}>
              <h1>{this.headline}</h1>
            </Col>
            <Col span={12}>
              <PullRight>
                <Button
                  icon="left"
                  size="large"
                  onClick={this.props.onBack}
                  shape="circle-outline"
                />
              </PullRight>
            </Col>
          </Row>
        </Header>
        <Layout>
          {this.content}
        </Layout>
      </Layout>
    )
  }
}


