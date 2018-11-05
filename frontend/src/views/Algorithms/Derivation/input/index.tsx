//#region imports
import * as React from 'react';

import RegexpInput, { RegexpInputValue } from 'components/Forms/Regexp'
import ExtraStringInput, { HeaderStyle } from 'components/Forms/extraString';

import Controller , {InputDefaultProps} from 'components/AlgorithmView/InputController';

//#endregion


//#region Component interfaces
interface InputState {
  values: RegexpInputValue;
  derivationString: string;
}
//#endregion

export default class DerivationController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
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

  protected get headline() { return 'Regexp derivation'; }
  protected get action() {return 'Derivate'}
  protected get content(){
    return(
      <div>
        <HeaderStyle>Regexp to be derived:</HeaderStyle>
          <RegexpInput
            value={this.state.values}
            onChange={this.handleChangeValue.bind(this)}
          />
          <ExtraStringInput
            header={'Derivation string'}
            value={this.state.derivationString}
            onChange={this.handleChangeDerivationString.bind(this)}
          />
      </div>
    )
  }

  public get defaultInitialState(): InputState {
    return {
      values: '',
      derivationString: ''
    }
  }

}
