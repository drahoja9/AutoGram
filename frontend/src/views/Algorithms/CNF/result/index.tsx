//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import GrammarView from 'components/Results/grammar';
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
      <GrammarView
        value = {this.props.result.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CnfController);
