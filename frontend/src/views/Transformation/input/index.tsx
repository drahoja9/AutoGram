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
}
//#endregion

const TransformationInput: React.SFC<TransformationInputProps> = (props) => (
  <Layout>
  <Header><h1>Transformation</h1></Header>
  <Layout>
    <InputContent>
      <LangInput
        onChange={props.onValueChange}
      />
    </InputContent>
  </Layout>
  <Footer>
    <Controls
      onChange={props.onTargetChange}
      onSubmit={props.onSubmit}
    />
  </Footer>
</Layout>
);

export default TransformationInput;
