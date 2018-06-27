//#region imports
import * as React from 'react';
import { Input } from 'antd';
//#endregion

//#region Component interfaces
export interface InputCellProps {
  onChange: (value: string) => any;
  value: string;
}
//#endregion

/**
 * Simple input cell component, that renders a single input
 * form wrapped inside of a `td`.
 */
const InputCell: React.SFC<InputCellProps> = (props) => (
  <td>
    <Input
      onChange={(e) => props.onChange(e.currentTarget.value)}
      value={props.value}
    />
  </td>
)

export default InputCell;
