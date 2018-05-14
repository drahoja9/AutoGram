//#region imports
import * as React from 'react';
import { Button } from 'antd';
import { Centered } from 'components/Layout';
//#endregion

//#region Component interfaces
/**
 * @property onSubmit Submission handler for control button.
 */
export interface ControlsProps {
  onSubmit?: () => any;
  pending?: boolean;
}
//#endregion

/**
 * Comparison page controls.
 */
const Controls: React.SFC<ControlsProps> = (props) => (
  <Centered>
    <Button onClick={props.onSubmit} loading={props.pending}>
      Compare
    </Button>
  </Centered>
);


export default Controls;
