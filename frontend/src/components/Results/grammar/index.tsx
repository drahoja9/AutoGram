//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { GR } from 'lib/types';
import { PullRight } from 'components/Layout'
import MonoText from '../components/MonoText';
import { grammarRulesToString } from './stringify';
//#endregion

//#region Styled
const Label = styled(Col)`
  padding-right: 1em;
`;
//#endregion

//#region Component interfaces
export interface GrammarViewProps {
  value: GR;
}

interface ContentRowProps {
  label?: string;
}
//#endregion

const ContentRow: React.SFC<ContentRowProps> = (props) => (
  <Row>
    {
      props.label ?
        <Label span={8}>
          <PullRight><b>{props.label}</b></PullRight>
        </Label> :
        <Col offset={8} />
    }
    <Col span={16}>
      {props.children}
    </Col>
  </Row>
);

const GrammarView: React.SFC<GrammarViewProps> = (props) => (
  <>
    <ContentRow label="Non-terminal alphabet">
      <MonoText>{props.value.nonterminal_alphabet.join(', ')}</MonoText>
    </ContentRow>

    <ContentRow label="Terminal alphabet">
      <MonoText>{props.value.terminal_alphabet.join(', ')}</MonoText>
    </ContentRow>

    <ContentRow label="Initial symbol">
      <MonoText>{props.value.initial_symbol}</MonoText>
    </ContentRow>

    <ContentRow label="Rules">
      {
        grammarRulesToString(props.value)
          .map((rules, idx) => <MonoText key={idx}>{rules}</MonoText>)
      }
    </ContentRow>
  </>
);

export default GrammarView;