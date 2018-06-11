//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';

import { GR } from 'lib/types';
import { Centered } from 'components/Layout';
import MonoText from '../components/MonoText';
import { grammarRulesToString } from './stringify';
//#endregion

export interface GrammarViewProps {
  value: GR;
}

interface ContentRowProps {
  label?: string;
}

const ContentRow: React.SFC<ContentRowProps> = (props) => (
  <Row>
  {
    props.label ?
      <Col span={8}><b>{ props.label }</b></Col> :
      <Col offset={8} />
  }
    <Col span={16}>
      { props.children }
    </Col>
  </Row>
);

const GrammarView: React.SFC<GrammarViewProps> = (props) => (
  <Centered>
    <ContentRow label="Terminal alphabet">
      <MonoText>{ props.value.nonterminal_alphabet.join(', ') }</MonoText>
    </ContentRow>

    <ContentRow label="Terminal alphabet">
      <MonoText>{ props.value.terminal_alphabet.join(', ') }</MonoText>
    </ContentRow>

    <ContentRow label="Initial symbol">
      <MonoText>{ props.value.initial_symbol }</MonoText>
    </ContentRow>

    <ContentRow label="Rules">
    {
      grammarRulesToString(props.value)
      .map((rules) => <MonoText>{ rules }</MonoText>)
    }
    </ContentRow>

  </Centered>
);

export default GrammarView;
