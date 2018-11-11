//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import CnfStepsView from './components/cnfSteps';
import { CNFResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class CnfController extends Controller<CNFResponse> {
  protected get headline(){
    return 'CNF Transformation result';
  }
  protected get content(){
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
