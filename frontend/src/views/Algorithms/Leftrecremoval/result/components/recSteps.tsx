//#region imports
import * as React from 'react';

import { LeftRecRemovalResponse } from 'lib/types';
import { Header } from 'components/Layout';
import GrammarView from 'components/Results/grammar';
//#endregion


interface RecStepsProps {
  value: LeftRecRemovalResponse
}

const RecStepsView: React.SFC<RecStepsProps> = (props) => (
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

export default RecStepsView;
