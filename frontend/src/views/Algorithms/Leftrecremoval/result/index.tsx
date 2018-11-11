//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import GrammarView from 'components/Results/grammar';
import { LeftRecRemovalResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';

//#endregion

class LeftrecremovalController extends Controller<LeftRecRemovalResponse> {
  protected get headline(){
    return 'Left Recursion Removal result';
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
)(LeftrecremovalController);
