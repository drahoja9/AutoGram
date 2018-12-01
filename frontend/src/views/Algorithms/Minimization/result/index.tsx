//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import AutomatonView from 'components/Results/automaton';
import { MinimizationResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class MinimizationController extends Controller<MinimizationResponse> {
  protected get headline(){
    return 'Minimization result';
  }
  protected get content(){
    return (
      <AutomatonView 
        value={this.props.result.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinimizationController);
