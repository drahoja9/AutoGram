//#region imports
import * as React from 'react';
import { Layout } from 'antd';

import SpecialChars from './Regexp/SpecialCharacters';
import TextArea from 'antd/lib/input/TextArea';

import { Monospaced } from './Regexp/index'
//#endregion

//#region Component interfaces
export interface ExtraStringInputProps {
  onChange: (value: any) => any;
  value: string;
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
        <Layout>
          <Layout.Content>
            <SpecialChars
              value={this.props.value || ''}
              onChange={this.handleInputSpecialCharacher.bind(this)}
            />
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
