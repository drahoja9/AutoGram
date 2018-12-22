//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import RecStepsView from './components/recSteps';
import { LeftRecRemovalRequest, LeftRecRemovalResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class LeftrecremovalController extends Controller<LeftRecRemovalRequest,LeftRecRemovalResponse> {
  protected get headline(){
    return 'Left Recursion Removal result';
  }
  protected get content(){
    return (
      <RecStepsView
        value = {this.props.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftrecremovalController);
