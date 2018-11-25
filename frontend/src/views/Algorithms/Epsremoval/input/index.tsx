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

export default class EpsremovalController extends Controller<InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || this.defaultInitialState;
  }

  private handleChange(value: AutomatonInputValue) {
    this.setState({
      values: value
    }, () => this.props.onValueChange(this.state));
  }

  protected get headline() { return 'Elimination of ε-transitions'; }
  protected get action() { return 'Eliminate' }
  protected get content() {
    return (
      <AutomatonInput
        value={this.state.values}
        onChange={this.handleChange.bind(this)}
        isEpsilon={true}
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
