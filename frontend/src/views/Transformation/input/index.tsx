//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import LangInput, {
  InputType,
  ValueStore
} from 'components/LangInput';
import Controls from './components/controls';
//#endregion

const { Content, Footer } = Layout;

//#region Styled
const InputContent = styled(Content)`
  padding: 2em;
`;
//#endregion

//#region Component interfaces
interface InputState {
  selected: InputType;
  values: ValueStore;
}

export interface TransformationInputProps extends InputState {
  target: InputType;
  onValueChange: (value: InputState) => any;
  onTargetChange: (value: InputType) => any;
  onSubmit: () => any;
  defaultValue?: InputState;
  pending: boolean;
}
//#endregion

const TransformationInput: React.SFC<TransformationInputProps> = (props) => (
  <Layout>
    <Header><h1>Transformation</h1></Header>
    <Layout>
      <InputContent>
        <LangInput
          defaultValue={props.defaultValue}
          onChange={props.onValueChange}
        />
      </InputContent>
    </Layout>
    <Footer>
      <Controls
        defaultValue={props.target}
        onChange={props.onTargetChange}
        onSubmit={props.onSubmit}
        pending={props.pending}
      />
    </Footer>
  </Layout>
);

export default TransformationInput;
