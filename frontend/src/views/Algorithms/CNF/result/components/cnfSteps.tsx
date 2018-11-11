//#region imports
import * as React from 'react';

import { CNFResponse } from 'lib/types';
import { Header } from 'components/Layout';
import GrammarView from 'components/Results/grammar';
//#endregion


interface DerivationStepsProps {
  value: CNFResponse
}

const CnfStepsView: React.SFC<DerivationStepsProps> = (props) => (
  <div>
    <Header>State after reduction:</Header>
    <GrammarView value={props.value.after_reduction}/>

    <Header>State after epsilon removal:</Header>
    <GrammarView value={props.value.after_epsilon}/>

    <Header>State after unit rules removal:</Header>
    <GrammarView value={props.value.after_unit_rules}/>

    <Header>Result:</Header>
    <GrammarView value={props.value.result}/>
  </div>
);

export default CnfStepsView;
