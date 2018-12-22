//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import GrammarView from 'components/Results/grammar';
import { CFGUnitRemovalRequest, CFGUnitRemovalResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class CFGUnitRemovalController extends Controller<CFGUnitRemovalRequest, CFGUnitRemovalResponse> {
  protected get headline() {
    return 'Context-free grammar unit rules removal';
  }
  protected get inputContent() {
    return (
      <GrammarView
        value={this.props.inputValue}
      />
    )
  }
  protected get resultContent() {
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
)(CFGUnitRemovalController);
