//#region imports
import * as React from 'react';
import AutomatonInput, { AutomatonInputValue } from 'components/Forms/Automaton';
import Controller, { InputDefaultProps } from 'components/AlgorithmView/InputView';
//#endregion

//#region Component interfaces
interface InputState {
  values: AutomatonInputValue;
}
//#endregion

export default class MinimizationController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
  }

  private handleChange(value: AutomatonInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  protected get headline() { return 'Minimization'; }
  protected get action() { return 'Minimize' }
  protected get content() {
    return (
      <AutomatonInput
        value={this.state.values}
        onChange={this.handleChange.bind(this)}
      />
    )
  }

  public get defaultInitialState(): InputState {
    return {
      values: {
        header: [],
        body: []
      }
    }
  }

}
