//#region imports
import * as React from 'react';
import { Row, Button, Select } from 'antd';
import { Centered } from 'components/Layout';
//#endregion

//#region Component interfaces
/**
 * @property onSubmit Submission handler for control button.
 */
export interface ControlsProps {
  onChange?: (value: string) => any;
  onSubmit?: () => any;
}
//#endregion

/**
 * Transformation page controls.
 */
const Controls: React.SFC<ControlsProps> = (props) => (
  <Row>
    <Centered>
      <Select onChange={props.onChange} defaultValue="gr">
        <Select.Option value="gr">Grammar</Select.Option>
        <Select.Option value="au">Automaton</Select.Option>
        <Select.Option value="ex">Expression</Select.Option>
      </Select>
      <Button onClick={props.onSubmit}>
        Transform
      </Button>
    </Centered>
  </Row>
);


export default Controls;
