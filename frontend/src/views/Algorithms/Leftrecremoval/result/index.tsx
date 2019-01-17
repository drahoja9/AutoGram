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
import GrammarView from 'components/Results/grammar';

//#endregion

class LeftrecremovalController extends Controller<LeftRecRemovalRequest,LeftRecRemovalResponse> {
  protected get headline(){
    return 'Left Recursion Removal';
  }
  protected get inputContent(){
    return (
      <GrammarView 
        value={this.props.inputValue}
      />
    )
  }
  protected get resultContent(){
    return (
      <GrammarView
        value = {this.props.result.result}
      />
    )
  }
  protected get stepsContent(){
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
