//#region imports
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
//import { notification } from 'antd';
import { connect } from 'react-redux';

import {
  AutomatonInputValue
} from 'components/Forms/Automaton';
import { RouteHandler } from 'components';
//import AutomatonInput from 'components/Forms/Automaton';
//import { ValidationError } from 'lib/validate';
//import { ParseError } from 'lib/parse';
import {
  NFA,
  //DFA
} from 'lib/types';

import { routes } from './routes';
//import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
//#endregion

//#region Component interfaces
export interface ControllerProps extends RouteComponentProps<any> {
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
  onSubmit: (data: NFA ) => any;
  onCancel: () => any;
}

interface ControllerState {
  values: AutomatonInputValue;
}
//#endregion

class Controller extends React.Component<ControllerProps, ControllerState>{
  public state = {
    values: {
      header: [], 
      body: []
    }
  };

  public componentdDidMount() {
    if (this.props.location.pathname !== '/algo/det/input') {
      this.props.history.push('/algo/det/input');
    }
  }

  public componentWillReceiveProps(nextProps: ControllerProps) {
    if (this.props.meta.pending && !nextProps.meta.pending && nextProps.meta.retrieved) {
      if (!nextProps.meta.error) {
        nextProps.history.push('/algo/det/result');
      }
    }
  }

  /*private getSource() : NFA {
    
  }*/

  private handleSubmit() {
    console.log("submit");
    console.log(this.state.values);
  }

  /*private handleSubmitError(err: Error) {

  }*/

  /*private presentError(message: string, description: string) {

  }*/

  private handleNavigateBack(){
    this.props.history.goBack();
  }

  private handleValueChange(change: ControllerState) {
    this.setState(change);
  }

  /*public render() {
    return (<AutomatonInput
      value={this.state.values}
      onChange={this.handleValueChange.bind(this)}
    />)
  }*/

  public render() {
    //console.log("rendering determinization top");
    return (
      <RouteHandler
        routes={routes}
        onBack={this.handleNavigateBack.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onValueChange={this.handleValueChange.bind(this)}
        pending={this.props.meta.pending}
      />
    
    )
  }



  
}

//export default () => <h1>Determinimization</h1>;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Controller));
