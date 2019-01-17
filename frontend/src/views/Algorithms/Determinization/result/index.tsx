//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import AutomatonView from 'components/Results/automaton';
import { NFA, DFA } from 'lib/types';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
//#endregion

class DeterminizationController extends Controller<NFA,DFA> {
  protected get headline(){
    return 'Determinization';
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
)(DeterminizationController);
