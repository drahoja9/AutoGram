//#region imports
import * as React from 'react';
import { Layout, Input } from 'antd';
import styled from 'styled-components';

import SpecialChars from './SpecialCharacters';
//#endregion

//#region Styled
const Monospaced = styled.div`
  textarea {
    font-family: monospace;
  }
`;
//#endregion

//#region Component interfaces
export interface RegexpInputProps {
  onChange: (value: any) => any;
  value: any;
}
//#endregion

/**
 * Regular expression input component.
 */
const RegexpInput: React.SFC<RegexpInputProps> = (props) => (
  <Layout>
    <Layout>
      <Layout.Content>
        <SpecialChars value={props.value || ''} onChange={props.onChange} />
      </Layout.Content>
    </Layout>
    <Layout>
      <Layout.Content>
        <Monospaced>
          <Input.TextArea
            placeholder="(a + b)*"
            autosize={{
              minRows: 4,
              maxRows: 16
            }}
            value={props.value}
            onChange={(e) => props.onChange(e.currentTarget.value)}
          />
        </Monospaced>
      </Layout.Content>
    </Layout>
  </Layout>
);

export default RegexpInput;
