//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import AutomatonView from 'components/Results/automaton';
import { ENFA, NFA } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class EpsremovalController extends Controller<ENFA,NFA> {
  protected get headline(){
    return 'Elimination of ε-transitions';
  }
  protected get inputContent(){
    return (
      <AutomatonView 
        value={this.props.inputValue}
      />
    )
  }
  protected get resultContent(){
    return (
      <AutomatonView 
        value={this.props.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpsremovalController);
