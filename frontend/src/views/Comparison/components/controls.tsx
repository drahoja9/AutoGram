//#region imports
import * as React from 'react';
import { Button, Icon } from 'antd';
import { Centered } from 'components/Layout';
import styled from 'styled-components';
//#endregion

//#region Styled
const Check = styled(Icon)`
  color: #468F83;
`;

const Cross = styled(Icon)`
  color: #f5222d;
`;

const Wrapper = styled.div`
  font-size: 28px;
`;
//#endregion

//#region Component interfaces
/**
 * @property onSubmit Submission handler for control button.
 */
export interface ControlsProps {
  onSubmit?: () => any;
  pending?: boolean;
  result?: boolean;
}
//#endregion

const Result: React.SFC<{ result?: boolean }> = (props) => (
  props.result === true ?
    <Check type="check-circle" /> : props.result === false ?
      <Cross type="close-circle" /> : null
);

/**
 * Comparison page controls.
 */
const Controls: React.SFC<ControlsProps> = (props) => (
  <Wrapper>
    <Centered>
      <Button onClick={props.onSubmit} loading={props.pending}>
        Compare
      </Button>
    </Centered>
    <br />
    <Centered>
      <Result result={props.result} />
    </Centered>
  </Wrapper>
);


export default Controls;
