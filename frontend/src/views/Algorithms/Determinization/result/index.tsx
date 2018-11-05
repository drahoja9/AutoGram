//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import AutomatonView from 'components/Results/automaton';
import { DFA } from 'lib/types';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
//#endregion

class DeterminizationController extends Controller<DFA> {
  protected get headline(){
    return 'Determinization result';
  }
  protected get content(){
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
