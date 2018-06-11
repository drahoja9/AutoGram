//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';

import { InputType } from 'components/LangInput';
import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';
import { FA, GR, RE } from 'lib/types';
//#endregion

const { Content } = Layout;


//#region Component interfaces
export interface TransformationResultProps {
  target: InputType;
  value: FA | GR | RE;
  onBack: () => any;
}
//#endregion

const TransformationResult: React.SFC<TransformationResultProps> = (props) => (
  <Layout>
    <Header>
      <Row>
        <Col span={12}>
          <h1>Transformation Result</h1>
        </Col>
        <Col span={12}>
          <PullRight>
            <Button
              icon="left"
              size="large"
              onClick={props.onBack}
              shape="circle-outline"
            />
          </PullRight>
        </Col>
      </Row>
    </Header>
    <Layout>
      <Content>
        Result
      </Content>
    </Layout>
  </Layout>
);

export default TransformationResult;
