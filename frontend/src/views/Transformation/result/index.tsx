//#region imports
import * as React from 'react';
import { Layout, Row, Col } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { InputType } from 'components/LangInput';
import {
  ResultHeader as Header,
} from 'components/Layout';
import { NFA, RRG, RE } from 'lib/types';
import AutomatonView from 'components/Results/automaton';
import GrammarView from 'components/Results/grammar';
import RegexpView from 'components/Results/regexp';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region styled
const SectionCol = styled(Col)`
  height: calc(100% - 60px);
`

const SectionHeadline = styled.h2`
  font-size: 2em;
  color: #707070;
`
const SectionContainer = styled.div`
  margin: 30px 0px;
  padding: 10px 20px;
  height: 100%;
  &.left-border{
    border-left: 1px solid #ccc;
  }
`
//#endregion

//#region Component interfaces
export interface TransformationResultProps {
  target: InputType;
  value: NFA | RRG | RE | null;
  onBack: () => any;
  inputType: InputType;
  inputValue: NFA | RRG | RE | null;
}
//#endregion


const TransformationResult: React.SFC<TransformationResultProps> = (props) => (
  <Layout>
    <Header
      header={'Transformation'}
      onBack={props.onBack} />

    <Layout>
      <Row>
        <SectionCol span={12}>
          <SectionContainer>
            <SectionHeadline>Input</SectionHeadline>
            {renderValue(props.inputType, props.inputValue)}
          </SectionContainer>
        </SectionCol>
        <SectionCol span={12}>
          <SectionContainer className={"left-border"}>
            <SectionHeadline>Result</SectionHeadline>
            {renderValue(props.target, props.value)}
          </SectionContainer>
        </SectionCol>
      </Row>
    </Layout>
  </Layout>
);

const renderValue = (type: InputType, value: NFA | RRG | RE | null) => {
  switch (type) {
    case InputType.Automaton:
      return (
        <AutomatonView
          value={value as NFA}
        />
      );
    case InputType.Grammar:
      return (
        <GrammarView
          value={value as RRG}
        />
      );
    case InputType.Regexp:
      return (
        <RegexpView
          value={value as RE}
        />
      );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformationResult);
