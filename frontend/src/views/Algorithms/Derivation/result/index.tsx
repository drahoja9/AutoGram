//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';
import { DerivationResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import DerivationStepsView from './components/derivationSteps';
//#endregion

//#region Component interfaces
/*export interface DerivationResultProps extends DerivationResponse {
  onBack: () => any;
}*/
export interface DerivationResultProps {
  onBack: () => any;
  result: DerivationResponse;
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
      <DerivationStepsView
        steps={props.result.steps}
        trimmed_steps={props.result.trimmed_steps}
      />
    </Layout>
  </Layout>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DerivationResult);
