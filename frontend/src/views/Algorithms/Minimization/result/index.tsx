//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';
import AutomatonView from 'components/Results/automaton';
import { DFA } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface MinimizationResultProps {
  value: DFA;
  onBack: () => any;
}
//#endregion

const DeterminizationResult: React.SFC<MinimizationResultProps> = (props) => (
  <Layout>
    <Header>
      <Row>
        <Col span={12}>
          <h1>Minimization Result</h1>
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
      <AutomatonView 
        value={props.value}
      />
    </Layout>
  </Layout>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeterminizationResult);
