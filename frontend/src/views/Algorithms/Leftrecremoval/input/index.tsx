//#region imports
import * as React from 'react';
import GrammarInput, { GrammarInputValue } from 'components/Forms/Grammar';
import Controller, { InputDefaultProps } from 'components/AlgorithmView/InputView';
//#endregion

//#region Component interfaces
interface InputState {
  values: GrammarInputValue
}
//#endregion

export default class LeftrecremovalController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
  }

  private handleChange(value: GrammarInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  protected get headline() { return 'Left Recursion Removal'; }
  protected get description() { return 'Takes a Context-Free Grammar in Chomsky Normal Form as an input.'; }
  protected get action() { return 'Remove' }
  protected get content() {
    return (
      <GrammarInput
        value={this.state.values}
        onChange={this.handleChange.bind(this)}
      />
    )
  }

  public get defaultInitialState(): InputState {
    return {
      values: {
        nonTerms: '',
        terms: '',
        rules: '',
        startSymbol: '',
      }
    }
  }

}
