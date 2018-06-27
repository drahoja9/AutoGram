//#region imports
import * as React from 'react';
import { Layout, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { PullRight } from 'components/Layout';
import EpsilonInput from './EpsilonInput';
//#endregion

//#region Styled
const Monospaced = styled.div`
  textarea {
    font-family: monospace;
  }
  input {
    font-family: monospace;
  }
`;
//#endregion

//#region Component interfaces
export interface GrammarInputValue {
  nonTerms: string;
  terms: string;
  rules: string;
  startSymbol: string;
}

export interface GrammarInputProps {
  onChange: (value: any) => any;
  value: GrammarInputValue;
}
//#endregion

/**
 * Grammar input component.
 */
const GrammarInput: React.SFC<GrammarInputProps> = (props) => (
  <Monospaced>
    <Layout>
      <Row>
        <Col span={12}>Non-terminal characters:</Col>
        <Col span={12}>
          <Input
            placeholder="A, B"
            value={props.value.nonTerms}
            onChange={(e) => props.onChange({
              ...props.value,
              ['nonTerms']: e.currentTarget.value,
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>Terminal characters:</Col>
        <Col span={12}>
          <Input
            placeholder="a, b"
            value={props.value.terms}
            onChange={(e) => props.onChange({
              ...props.value,
              ['terms']: e.currentTarget.value,
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <PullRight>
            <EpsilonInput {...props} />
          </PullRight>
        </Col>
      </Row>
      <Row>
        <Col span={6}>Rules:</Col>
        <Col span={18}>
          <Input.TextArea
            placeholder="A -> aB"
            autosize={{
              minRows: 4,
              maxRows: 16
            }}
            value={props.value.rules}
            onChange={(e) => props.onChange({
              ...props.value,
              ['rules']: e.currentTarget.value,
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>Start symbol:</Col>
        <Col span={6} offset={6}>
          <Input
            placeholder="A"
            value={props.value.startSymbol}
            onChange={(e) => props.onChange({
              ...props.value,
              ['startSymbol']: e.currentTarget.value,
            })}
          />
        </Col>
      </Row>
    </Layout>
  </Monospaced>
);

export default GrammarInput;
