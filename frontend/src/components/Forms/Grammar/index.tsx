//#region imports
import * as React from 'react';
import { Layout, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { PullRight, TextColor, LargeText } from 'components/Layout';
import EpsilonInput from './EpsilonInput';
import TextArea from 'antd/lib/input/TextArea';
//#endregion

//#region Styled
const MonospacedInput = styled.div`
  textarea {
    font-family: monospace;
  }
  input {
    font-family: monospace;
  }
`;
const RowMargin = styled.div`
  .ant-row {
    margin: 3px;
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
  onChange: (value: GrammarInputValue) => any;
  value: GrammarInputValue;
}
//#endregion


/**
 * Grammar input component.
 */
class GrammarInput extends React.Component<GrammarInputProps> {
  private input: TextArea | null = null;
  private cursor: number = 0;

  private handleEpsilonInput(value: GrammarInputValue) {
    if (this.input) {
      this.input.focus();
    }
    this.props.onChange(value);
  }

  private handleRulesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.cursor = e.currentTarget.selectionStart;
    this.props.onChange({ ...this.props.value, ['rules']: e.currentTarget.value });
  }

  public getCursor(): number {
    return this.cursor;
  }

  public render() {
    return (
      <RowMargin>
        <MonospacedInput>
          <LargeText>
            <Layout>
              <Row align={'middle'}>
                <TextColor><Col className={'large-text'} span={12}>Non-terminal characters:</Col></TextColor>
                <Col span={12}>
                  <Input
                    placeholder="A, B"
                    value={this.props.value.nonTerms}
                    onChange={(e) => this.props.onChange({
                      ...this.props.value,
                      ['nonTerms']: e.currentTarget.value,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <TextColor><Col className={'large-text'} span={12}>Terminal characters:</Col></TextColor>
                <Col span={12}>
                  <Input
                    placeholder="a, b"
                    value={this.props.value.terms}
                    onChange={(e) => this.props.onChange({
                      ...this.props.value,
                      ['terms']: e.currentTarget.value,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <PullRight>
                    <EpsilonInput
                      {...this.props}
                      onChange={this.handleEpsilonInput.bind(this)}
                      cursor={this.getCursor.bind(this)}
                    />
                  </PullRight>
                </Col>
              </Row>
              <Row>
                <TextColor><Col className={'large-text'} span={6}>Rules:</Col></TextColor>
                <Col span={18}>
                  <Input.TextArea
                    ref={(input) => this.input = input}
                    placeholder="A -> aB"
                    autosize={{
                      minRows: 4,
                      maxRows: 16
                    }}
                    value={this.props.value.rules}
                    onChange={(e) => this.handleRulesChange(e)}
                    onClick={(e) => this.cursor = e.currentTarget.selectionStart}
                    onKeyUp={(e) => this.cursor = e.currentTarget.selectionStart}
                  />
                </Col>
              </Row>
              <Row>
                <TextColor><Col className={'large-text'} span={12}>Start symbol:</Col></TextColor>
                <Col span={6} offset={6}>
                  <Input
                    placeholder="A"
                    value={this.props.value.startSymbol}
                    onChange={(e) => this.props.onChange({
                      ...this.props.value,
                      ['startSymbol']: e.currentTarget.value,
                    })}
                  />
                </Col>
              </Row>
            </Layout>
          </LargeText>
        </MonospacedInput>
      </RowMargin>
    );
  }
}

export default GrammarInput;
