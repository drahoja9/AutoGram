//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import CnfStepsView from './components/cnfSteps';
import GrammarView from 'components/Results/grammar';
import { CNFRequest, CNFResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class CnfController extends Controller<CNFRequest, CNFResponse> {
  protected get headline(){
    return 'CNF Transformation';
  }
  protected get inputContent(){
    return (
      <GrammarView
        value = {this.props.inputValue}
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
      <CnfStepsView
        value = {this.props.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CnfController);
