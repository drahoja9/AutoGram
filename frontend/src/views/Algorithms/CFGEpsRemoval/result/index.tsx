//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import GrammarView from 'components/Results/grammar';
import { CFGEpsRemovalRequest, CFGEpsRemovalResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class CFGEpsRemovalController extends Controller<CFGEpsRemovalRequest, CFGEpsRemovalResponse> {
  protected get headline() {
    return 'Context-free grammar epsilon removal';
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
)(CFGEpsRemovalController);
