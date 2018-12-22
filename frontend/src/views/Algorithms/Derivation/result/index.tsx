//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import { DerivationRequest, DerivationResponse } from 'lib/types';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import DerivationStepsView from './components/derivationSteps';

import Controller from 'components/AlgorithmView//ResultView';
import RegexpView from 'components/Results/regexp';

class DerivationController extends Controller<DerivationRequest, DerivationResponse> {
  protected get headline() {
    return 'Regexp derivation';
  }
  protected get inputContent() {
    return (
      <div>
        <RegexpView
          value={this.props.inputValue.regexp}
        />
        <p>{this.props.inputValue.derivation_string}</p>
      </div>
    )
  }
  protected get resultContent() {
    return (
        <RegexpView
          value={this.props.result.trimmed_steps[this.props.result.trimmed_steps.length - 1]}
        />
    )
  }
  protected get stepsContent() {
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
