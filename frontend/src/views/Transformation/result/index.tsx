//#region imports
import * as React from 'react';
import { Layout} from 'antd';
import { connect } from 'react-redux';

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

//#region Component interfaces
export interface TransformationResultProps {
  target: InputType;
  value: NFA | RRG | RE | null;
  onBack: () => any;
}
//#endregion


const TransformationResult: React.SFC<TransformationResultProps> = (props) => (
  <Layout>
    <Header 
      header={'Transformation Result'} 
      onBack = {props.onBack} />
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
