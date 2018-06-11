//#region imports
import * as React from 'react';
import RegexInput, { RegexpInputValue } from 'components/Forms/Regexp';
import GrammarInput, { GrammarInputValue } from 'components/Forms/Grammar';
import AutomatonInput, { AutomatonInputValue } from 'components/Forms/Automaton';
import View from './view';
//#endregion

//#region Component interfaces
export enum InputType {
  Automaton = 'au',
  Grammar = 'gr',
  Regexp = 're',
}

export type InputValue = AutomatonInputValue | GrammarInputValue | RegexpInputValue;

/**
 * Interfaces storing state of each input type.
 */
export interface ValueStore {
  [InputType.Automaton]: AutomatonInputValue;
  [InputType.Grammar]: GrammarInputValue;
  [InputType.Regexp]: RegexpInputValue;
}

export interface ControllerProps {
  defaultValue?: ControllerState;
  onChange: (data: any) => any;
}

interface ControllerState {
  selected: InputType;
  values: ValueStore;
}
//#endregion

/**
 * Language input root component.
 */
export default class Controller extends React.Component<ControllerProps, ControllerState> {
  constructor(props: ControllerProps, context: any) {
    super(props, context);
    this.state = this.props.defaultValue || Controller.defaultInitialState;
    console.log(this.state);
  }
  /**
   * Handles input type change.
   */
  private handleTypeChange(selected: InputType) {
    this.setState({ selected }, () => this.props.onChange(this.state));
  }

  /**
   * Handles changes in value.
   */
  private handleChange(value: InputValue) {
    this.setState({
      values: {
        ...this.state.values,
        [this.state.selected]: value
      }
    }, () => this.props.onChange(this.state));
  }


  public render() {
    return (
      <View
        defaultValue={this.props.defaultValue ? this.props.defaultValue.selected : undefined}
        onChange={this.handleTypeChange.bind(this)}
      >
        { this.renderInput() }
      </View>
    );
  }

  /**
   * Renders an input form compoennt depending on depending on which one is currently selected.
   */
  private renderInput() {
    switch (this.state.selected) {
    case InputType.Automaton:
      return (
        <AutomatonInput
          value={this.state.values[InputType.Automaton]}
          onChange={this.handleChange.bind(this)}
        />
      );

    case InputType.Grammar:
      return (
        <GrammarInput
          value={this.state.values[InputType.Grammar]}
          onChange={this.handleChange.bind(this)}
        />
      );

    case InputType.Regexp:
      return (
        <RegexInput
          value={this.state.values[InputType.Regexp]}
          onChange={this.handleChange.bind(this)}
        />
      );
    }
  }

  static get defaultInitialState(): ControllerState {
    return {
      selected: InputType.Grammar,
      values: {
        [InputType.Automaton]: { header: [], body: [] },
        [InputType.Grammar]: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
        [InputType.Regexp]: ''
      }
    };
  }
}

