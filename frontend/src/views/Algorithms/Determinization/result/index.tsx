/*import * as React from 'react';

export default () => {
  console.log('here');
  <h1>Determinization result</h1>};*/


  //#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import {
  AutomatonInputValue,
  
} from 'components/Forms/Automaton';
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
  values: AutomatonInputValue;
}

export interface DeterminizationInputProps extends InputState {
  onValueChange: (value: InputState) => any;
  onSubmit: () => any;
  pending: boolean;
}
//#endregion
console.log("been");
const DeterminizationInput: React.SFC<DeterminizationInputProps> = (props) => (
  <Layout>
    <Header><h1>Determinization</h1></Header>
    <Layout>
      <InputContent>
        
      </InputContent>
    </Layout>
    <Footer>
      <Controls
        onSubmit={props.onSubmit}
        pending={props.pending}
      />
    </Footer>
  </Layout>
);

export default DeterminizationInput;
