//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Centered } from 'components/Layout';

import { DerivationRequest, DerivationResponse } from 'lib/types';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import DerivationStepsView from './components/derivationSteps';

import Controller from 'components/AlgorithmView//ResultView';
import RegexpView from 'components/Results/regexp';

//#region styled
const DerivationString = styled(Centered)`
  font-size: 14px;
  font-family: monospace;
`;
const StrongText = styled.span`
  font-weight: bold;
  white-space: pre
`;
//#endregion

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
        <DerivationString>
          <StrongText>Derivation string: </StrongText>
          {this.props.inputValue.derivation_string}
        </DerivationString>
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
        derivation_string={this.props.inputValue.derivation_string}
      />
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DerivationController);
