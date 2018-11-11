//#region imports
import * as React from 'react';
import GrammarInput, { GrammarInputValue } from 'components/Forms/Grammar';
import Controller, { InputDefaultProps } from 'components/AlgorithmView/InputView';
//#endregion

//#region Component interfaces
interface InputState {
  values: GrammarInputValue;
}
//#endregion

export default class CFGreductionController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
  }

  private handleChange(value: GrammarInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  protected get headline() { return 'Context-free grammar reduction'; }
  protected get action() { return 'CFGreduce' }
  protected get content() {
    return (
      <GrammarInput
        onChange={this.handleChange}
        value={this.state.values}
      />
    )
  }

  public get defaultInitialState(): InputState {
    return {
      values: {
        nonTerms: '',
        terms: '',
        rules: '',
        startSymbol: ''
      }
    }
  }

}
