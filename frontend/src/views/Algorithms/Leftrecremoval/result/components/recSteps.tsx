//#region imports
import * as React from 'react';
import styled from 'styled-components';

import { LeftRecRemovalResponse } from 'lib/types';
import GrammarView from 'components/Results/grammar';
//#endregion


//#region styled
const StepsContainer = styled.div`
  min-width: 50%;
`
const StepsHeader = styled.div`
  font-size: 18px;
  padding-top: 20px;
  padding-bottom: 10px;
`
//#endregion

interface RecStepsProps {
  value: LeftRecRemovalResponse
}

const RecStepsView: React.SFC<RecStepsProps> = (props) => (
  <StepsContainer>
    <StepsHeader>State after reduction:</StepsHeader>
    <GrammarView value={props.value.after_reduction}/>

    <StepsHeader>State after epsilon removal:</StepsHeader>
    <GrammarView value={props.value.after_epsilon}/>

    <StepsHeader>State after unit rules removal:</StepsHeader>
    <GrammarView value={props.value.after_unit_rules}/>

    <StepsHeader>State after left recursion removal:</StepsHeader>
    <GrammarView value={props.value.result}/>
  </StepsContainer>
);

export default RecStepsView;
