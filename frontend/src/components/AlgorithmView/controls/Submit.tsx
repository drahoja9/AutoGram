//#region imports
import * as React from 'react';
import { Row, Button } from 'antd';
import { Centered } from 'components/Layout';
//#endregion

//#region Component interfaces
/**
 * @property onSubmit Submission handler for control button.
 */
export interface ControlsProps {
  onSubmit?: () => any;
  pending?: boolean;
  text: string;
}
//#endregion

/**
 * Transformation page controls.
 */
const Controls: React.SFC<ControlsProps> = (props) => (
  <Row>
    <Centered>
      <Button onClick={props.onSubmit} loading={props.pending}>
        {props.text}
      </Button>
    </Centered>
  </Row>
);


export default Controls;
