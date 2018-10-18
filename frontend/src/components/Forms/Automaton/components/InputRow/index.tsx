//#region imports
import * as React from 'react';
import AddCell from '../AddCell';
import ControlCell from './ControlCell';
//#endregion

//#region Component interfaces
export interface InputRowProps {
  value: string;
  isInitial: boolean;
  isFinal: boolean;
  onValueChange: (value: string) => any;
  onInitialToggle: () => any;
  onFinalToggle: () => any;
  onRemove: () => any;
  onAddCol: () => any;
}
//#endregion

const InputRow: React.SFC<InputRowProps> = (props) => (
  <tr>
    <ControlCell
      value={props.value}
      isInitial={props.isInitial}
      isFinal={props.isFinal}
      onValueChange={props.onValueChange}
      onInitialToggle={props.onInitialToggle}
      onFinalToggle={props.onFinalToggle}
      onRemove={props.onRemove}
    />

    { props.children }

    <AddCell
      isFirst={false}
      onClick={props.onAddCol}
    />
  </tr>
);

export default InputRow;
