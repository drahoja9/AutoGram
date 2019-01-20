//#region imports
import * as React from 'react';
import { Layout, Popover } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import LangInput, {
  InputType,
  ValueStore
} from 'components/LangInput';
import Controls from './components/controls';
import QuestionMark from 'components/question_mark.svg';
//#endregion

const { Content, Footer } = Layout;

//#region Styled
const InputContent = styled(Content)`
  padding: 2em;
`;
const QuestionMarkSection = styled.div`
  padding-top: 0.6em;
  fill: darkgray;
`;
const HeaderWithTooltip = styled(Header)`
  display: flex;
  justify-content: space-between;
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
    <HeaderWithTooltip>
      <QuestionMarkSection>
        <Popover placement='rightTop' content={'Comparing only finite automata, regular grammars and regular expressions.'} trigger='hover'>
          <QuestionMark />
        </Popover>
      </QuestionMarkSection>
      <h1>Transformation</h1>
    </HeaderWithTooltip>
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
