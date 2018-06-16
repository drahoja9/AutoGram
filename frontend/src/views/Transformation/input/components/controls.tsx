//#region imports
import * as React from 'react';
import { Row, Button, Select } from 'antd';
import { Centered } from 'components/Layout';
import { InputType } from 'components/LangInput';
//#endregion

//#region Component interfaces
/**
 * @property onSubmit Submission handler for control button.
 */
export interface ControlsProps {
  defaultValue?: InputType;
  onChange?: (value: InputType) => any;
  onSubmit?: () => any;
  pending?: boolean;
}
//#endregion

/**
 * Transformation page controls.
 */
const Controls: React.SFC<ControlsProps> = (props) => (
  <Row>
    <Centered>
      <Select onChange={props.onChange} defaultValue={props.defaultValue}>
        <Select.Option value={InputType.Grammar}>Grammar</Select.Option>
        <Select.Option value={InputType.Automaton}>Automaton</Select.Option>
        <Select.Option value={InputType.Regexp}>Expression</Select.Option>
      </Select>
      <Button onClick={props.onSubmit} disabled={props.pending}>
        Transform
      </Button>
    </Centered>
  </Row>
);


export default Controls;
