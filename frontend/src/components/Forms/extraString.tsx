//#region imports
import * as React from 'react';
import { Layout } from 'antd';

import styled from 'styled-components';

import SpecialChars from './Regexp/SpecialCharacters';
import TextArea from 'antd/lib/input/TextArea';

import { Monospaced } from './Regexp/index'
//#endregion

//#region Styled
export const HeaderStyle = styled.div`
    font-size: 1.3em;
`;
//#endregion

//#region Component interfaces
export interface ExtraStringInputProps {
  onChange: (value: any) => any;
  value: string;
  header: string;
  specialChars: boolean;
}
//#endregion

/**
 * Extra string input component.
 */
class ExtraStringInput extends React.Component<ExtraStringInputProps> {
  private input: TextArea | null = null;

  private handleInputSpecialCharacher(value: string) {
    if (this.input) {
      this.input.focus();
    }
    this.props.onChange(value);
  }

  public render() {
    return (
      <Layout>
        <HeaderStyle>{this.props.header}:</HeaderStyle>
        <Layout>
          <Layout.Content>
            {
              this.props.specialChars
                ?
                <SpecialChars
                  value={this.props.value || ''}
                  onChange={this.handleInputSpecialCharacher.bind(this)}
                />
                :
                null
            }
          </Layout.Content>
        </Layout>
        <Layout>
          <Layout.Content>
            <Monospaced>
              <TextArea
                ref={(input) => this.input = input}
                placeholder="abc"
                autosize={{
                  minRows: 1,
                  maxRows: 3
                }}
                value={this.props.value}
                onChange={(e) => this.props.onChange(e.currentTarget.value)}
              />
            </Monospaced>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default ExtraStringInput;
