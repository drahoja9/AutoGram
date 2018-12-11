import * as React from 'react';
import { Row, Col, Button } from 'antd';
import {
  TopHeader as Header
} from 'components/Layout';

export interface ResultHeaderProps {
  header: string;
  onBack: () => any;
}

const ResultHeader: React.SFC<ResultHeaderProps> = (props) => (
  <Header>
    <Row>
      <Col span={12}>
        <Button
          icon="left"
          size="large"
          onClick={props.onBack}
          shape="circle-outline"
        />
      </Col>
      <Col span={12}>
        <h1>{props.header}</h1>
      </Col>
    </Row>
  </Header>
);

export default ResultHeader;