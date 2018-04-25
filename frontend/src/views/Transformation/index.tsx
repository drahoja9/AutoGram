//#region imports
import * as React from 'react';
import LangInput from 'components/LangInput';
import View from './view';
import Controls from './components/controls';
//#endregion

interface ControllerState {
  target: string;
}

export default class Controller extends React.Component<{}, ControllerState> {
  public state = { target: '' };

  private handleSubmit()  {
    console.log('Should transform.');
  }

  private handleTargetChange(target: string) {
    this.setState({ target });
    console.log(target);
  }

  public render() {
    return (
      <View
        Header={this.renderHeader()}
        Controls={this.renderControls()}
      >
        <LangInput />
      </View>
    );
  }

  private renderHeader() {
    return <h1>Transformation</h1>;
  }

  private renderControls() {
    return (
      <Controls
        onChange={this.handleTargetChange.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
}
