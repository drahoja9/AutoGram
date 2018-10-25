//#region imports
import * as React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

//import { RouteHandler } from 'components';
import { InputType } from 'components/LangInput';
import {
  TopHeader as Header,
  PullRight
} from 'components/Layout';
import { NFA, RRG, RE } from 'lib/types';
import AutomatonView from 'components/Results/automaton';
import GrammarView from 'components/Results/grammar';
import RegexpView from 'components/Results/regexp';

//import { routes } from './routes';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface TransformationResultProps {
  target: InputType;
  value: NFA | RRG | RE | null;
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
      { renderResult(props) }
    </Layout>
  </Layout>
);

const renderResult = (props: TransformationResultProps) => {
  switch(props.target){
    case InputType.Automaton:
      return (
        <AutomatonView
          value={props.value as NFA}
        />
      );
    case InputType.Grammar:
      return (
        <GrammarView
          value={props.value as RRG}
        />
      );
    case InputType.Regexp:
      return (
        <RegexpView
          value={props.value as RE}
        />
      );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformationResult);
