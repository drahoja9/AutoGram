//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import RegexpInput, { RegexpInputValue } from 'components/Forms/Regexp'
import ExtraStringInput from 'components/Forms/extraString';
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
  values: RegexpInputValue;
  derivationString: string;
}

export interface InputProps extends InputState {
  defaultValue?: InputState;
  onValueChange: (value: InputState) => any;
  onSubmit: () => any;
  pending: boolean;
}
//#endregion

export default class Controller extends React.Component<InputProps, InputState> {
  constructor(props: InputProps, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || Controller.defaultInitialState;
  }

  private handleChangeValue(value: RegexpInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  private handleChangeDerivationString(derivationString: string) {
    this.setState({
      derivationString: derivationString
    }, () => this.props.onValueChange(this.state));
  }

  public render() {
    return (
      <Layout>
        <Header><h1>Regexp derivation</h1></Header>
        <Layout>
          <InputContent>
            <RegexpInput
              value={this.state.values}
              onChange={this.handleChangeValue.bind(this)}
            />
          </InputContent>
          <InputContent>
            <ExtraStringInput
              value={this.state.derivationString}
              onChange={this.handleChangeDerivationString.bind(this)}
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

  static get defaultInitialState(): InputState {
    return {
      values: '',
      derivationString: ''
    }
  }

}
