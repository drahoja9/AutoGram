//#region imports
import * as React from 'react';
import RegexInput from 'components/Forms/Regexp';
import GrammarInput from 'components/Forms/Grammar';
import AutomatonInput from 'components/Forms/Automaton';
import View from './view';
//#endregion

//#region Component interfaces
interface ValueStore {
  [key: string]: any;
}

interface ControllerState {
  selected: string;
  values: ValueStore;
}
//#endregion

export default class Controller extends React.Component<{}, ControllerState> {
  public state = {
    selected: 'gr',
    values: {
      au: { header: [], body: [] },
      gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
      re: ''
    }
  };

  /**
   * Handles input type change
   */
  private handleTypeChange(selected: string) {
    this.setState({ selected });
  }

  /**
   * Handles changes in value.
   */
  private handleChange(value: any) {
    this.setState({
      values: {
        ...this.state.values,
        [this.state.selected]: value
      }
    });
  }


  public render() {
    return (
      <View onChange={this.handleTypeChange.bind(this)}>
        { this.renderInput() }
      </View>
    );
  }

  private renderInput() {
    let C;
    switch (this.state.selected) {
    case 'gr':
      C = GrammarInput;
      break;
    case 'au':
      C = AutomatonInput;
      break;
    case 'ex':
      C = RegexInput;
      break;
    default:
      throw new TypeError('Unexpected input type');
    }
    return (
      <C
        value={this.state.values[this.state.selected]}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

