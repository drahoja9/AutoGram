//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';
import RegexpView from 'components/Results/regexp';
import { RE } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface DerivationResultProps {
  value: RE;
  onBack: () => any;
}
//#endregion

const DerivationResult: React.SFC<DerivationResultProps> = (props) => (
  <Layout>
    <Header>
      <Row>
        <Col span={12}>
          <h1>Regexp derivation result</h1>
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
      <RegexpView
        value={props.value}
      />
    </Layout>
  </Layout>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DerivationResult);
