//#region imports
import * as React from 'react';

import RegexpInput, { RegexpInputValue } from 'components/Forms/Regexp'
import ExtraStringInput from 'components/Forms/extraString';
import { TextColor, LargeText } from 'components/Layout';

import Controller, { InputDefaultProps } from 'components/AlgorithmView/InputView';

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
  protected get description() { return ''; }
  protected get action() { return 'Derivate' }
  protected get content() {
    return (
      <div>
        <LargeText>
          <TextColor className={'large-text'}>Regexp to be derived:</TextColor>
          <RegexpInput
            value={this.state.values}
            onChange={this.handleChangeValue.bind(this)}
          />
          <ExtraStringInput
            header={'Derivation string'}
            value={this.state.derivationString}
            onChange={this.handleChangeDerivationString.bind(this)}
          />
        </LargeText>
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
