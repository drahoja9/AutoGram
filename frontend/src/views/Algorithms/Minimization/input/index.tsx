//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import AutomatonInput, {
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

export interface InputProps extends InputState {
  defaultValue?: InputState;
  onValueChange: (value: InputState) => any;
  onSubmit: () => any;
  pending: boolean;
}
//#endregion

export default class Controller extends React.Component<InputProps, InputState> {
  constructor(props: InputProps, context: any){
    super(props, context);
    this.state = this.props.defaultValue || Controller.defaultInitialState;
  }

  private handleChange(value: AutomatonInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  public render(){
    return(
      <Layout>
        <Header><h1>Minimization</h1></Header>
        <Layout>
          <InputContent>
            <AutomatonInput
                value={this.state.values}
                onChange={this.handleChange.bind(this)}
              />
          </InputContent>
        </Layout>
        <Footer>
          <Controls
            onSubmit={this.props.onSubmit}
            pending={this.props.pending}
          />
        </Footer>
      </Layout>
    )
  }

  static get defaultInitialState() : InputState {
    return {
      values : {
        header: [], 
        body: []
      }
    }
  }

}
