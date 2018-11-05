//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import { DerivationResponse } from 'lib/types';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import DerivationStepsView from './components/derivationSteps';

import Controller from 'components/AlgorithmView//ResultView';

class DerivationController extends Controller<DerivationResponse> {
  protected get headline(){
    return 'Regexp derivation result';
  }
  protected get content(){
    return (
      <DerivationStepsView
        steps={this.props.result.steps}
        trimmed_steps={this.props.result.trimmed_steps}
      />
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DerivationController);
