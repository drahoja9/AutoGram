//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import { Centered } from 'components/Layout';
import { CYKResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
import styled from 'styled-components';
import { Icon } from 'antd';
//#endregion

const Check = styled(Icon)`
  color: #468F83;
`;

const Cross = styled(Icon)`
  color: #f5222d;
`;

const Result: React.SFC<{ result?: boolean }> = (props) => (
  props.result === true ?
    <Check type="check-circle" /> : props.result === false ?
      <Cross type="close-circle" /> : null
);

class CykController extends Controller<CYKResponse> {
  protected get headline(){
    return 'CYK result';
  }
  protected get content(){
    return (
      <Centered>
        <Result result={this.props.result.result} />
      </Centered>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CykController);
