//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import GrammarView from 'components/Results/grammar';
import { CFGReductionRequest, CFGReductionResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class CFGReductionController extends Controller<CFGReductionRequest, CFGReductionResponse> {
  protected get headline() {
    return 'Context-free grammar reduction result';
  }
  protected get content() {
    return (
      <GrammarView
        value={this.props.result}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CFGReductionController);
