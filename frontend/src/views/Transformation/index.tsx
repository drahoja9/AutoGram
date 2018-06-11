//#region imports
import * as React from 'react';
import {
  InputType,
  ValueStore
} from 'components/LangInput';
import { RouteHandler } from 'components';
import { routes } from './routes';
//#endregion

//#region Component interfaces
interface InputState {
  selected: InputType;
  values: ValueStore;
}

interface ControllerState extends InputState {
  target: InputType;
}
//#endregion

export default class Controller extends React.Component<{}, ControllerState> {
  public state = {
    target: InputType.Grammar,
    selected: InputType.Grammar,
    values: {
      au: { header: [], body: [] },
      gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
      re: ''
    }
  };

  private handleSubmit()  {
    console.log('Should transform.');
  }

  private handleTargetChange(target: InputType) {
    this.setState({ target });
  }

  private handleValueChange(change: InputState) {
    this.setState(change);
  }

  public render() {
    return (
      <RouteHandler
        routes={routes}
        onSubmit={this.handleSubmit.bind(this)}
        onTargetChange={this.handleTargetChange.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
      />
    );
  }
}
