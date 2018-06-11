//#region imports
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

class Controller extends React.Component<RouteComponentProps<any>, ControllerState> {
  public state = {
    target: InputType.Grammar,
    selected: InputType.Grammar,
    values: {
      au: { header: [], body: [] },
      gr: { nonTerms: '', terms: '', rules: '', startSymbol: '' },
      re: ''
    }
  };

  public componentDidMount() {
    if (this.props.location.pathname !== '/tran/input') {
      this.props.history.push('/tran/input');
    }
  }

  private handleSubmit()  {
    this.props.history.push(`/tran/result/${this.state.target}`);
  }

  private handleNavigateBack() {
    this.props.history.goBack();
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
        onBack={this.handleNavigateBack.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onTargetChange={this.handleTargetChange.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
        defaultValue={this.state}
      />
    );
  }
}

export default withRouter(Controller);
