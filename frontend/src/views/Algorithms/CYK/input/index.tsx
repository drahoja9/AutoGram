//#region imports
import * as React from 'react';
import GrammarInput, { GrammarInputValue } from 'components/Forms/Grammar';
import ExtraStringInput from 'components/Forms/extraString';
import Controller, { InputDefaultProps } from 'components/AlgorithmView/InputView';
//#endregion

//#region Component interfaces
interface InputState {
  values: GrammarInputValue;
  cykString: string;
}
//#endregion

export default class CykController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
  }

  private handleChange(value: GrammarInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  private handleChangeExtraString(cykString: string) {
    this.setState({
      cykString: cykString
    }, () => this.props.onValueChange(this.state));
  }

  protected get headline() { return 'CYK'; }
  protected get description() { return 'Takes Context-Free Grammar in Chomsky Normal Form as an input.'; }
  protected get action() { return 'Run CYK' }
  protected get content() {
    return (
      <div>
        <GrammarInput
          value={this.state.values}
          onChange={this.handleChange.bind(this)}
        />
        <ExtraStringInput
          header={'String to check'}
          value={this.state.cykString}
          onChange={this.handleChangeExtraString.bind(this)}
        />
      </div>
    )
  }

  public get defaultInitialState(): InputState {
    return {
      values: {
        nonTerms: '',
        terms: '',
        rules: '',
        startSymbol: '',
      },
      cykString: '',
    }
  }

}
