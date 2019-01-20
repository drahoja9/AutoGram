//#region imports
import * as React from 'react';
import { Layout } from 'antd';

import styled from 'styled-components';

import SpecialChars from './SpecialCharacters';
import TextArea from 'antd/lib/input/TextArea';
//#endregion

//#region Styled
export const Monospaced = styled.div`
  textarea {
    font-family: monospace;
  }
`;
//#endregion

//#region Component interfaces
export type RegexpInputValue = string;
export interface RegexpInputProps {
  onChange: (value: any) => any;
  value: RegexpInputValue;
}
//#endregion

/**
 * Regular expression input component.
 */
class RegexpInput extends React.Component<RegexpInputProps> {
  private input: TextArea | null = null;
  private cursor: number = 0;

  private handleInputSpecialCharacher(value: string) {
    if (this.input) {
      this.input.focus();
    }
    this.props.onChange(value);
  }

  private handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.cursor = e.currentTarget.selectionStart;
    this.props.onChange(e.currentTarget.value)
  }

  public getCursor(): number {
    return this.cursor;
  }

  public render() {
    return (
      <Layout>
        <Layout>
          <Layout.Content>
            <SpecialChars
              value={this.props.value || ''}
              onChange={this.handleInputSpecialCharacher.bind(this)}
              cursor={this.getCursor.bind(this)}
            />
          </Layout.Content>
        </Layout>
        <Layout>
          <Layout.Content>
            <Monospaced>
              <TextArea
                ref={(input) => this.input = input}
                placeholder="(a + b)*"
                autosize={{
                  minRows: 4,
                  maxRows: 16
                }}
                value={this.props.value}
                onChange={(e) => { this.handleOnChange(e) }}
                onClick={(e) => this.cursor = e.currentTarget.selectionStart}
                onKeyUp={(e) => this.cursor = e.currentTarget.selectionStart}
              />
            </Monospaced>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default RegexpInput;
