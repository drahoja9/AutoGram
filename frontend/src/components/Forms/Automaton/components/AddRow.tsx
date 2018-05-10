//#region imports
import * as React from 'react';
import { range } from 'lodash';
import AddCell from './AddCell';
//#endregion

//#region Component interfaces
export interface AddRowProps {
  width: number;
  onClick: () => any;
}
//#endregion

/**
 * Represents add row.
 */
const AddRow: React.SFC<AddRowProps> = (props) => (
  <tr>
  {
    range(props.width + 1).map((_: any, idx: number) => (
      <AddCell isFirst={idx === 0} onClick={props.onClick} />
    ))
  }
  </tr>
);

export default AddRow;
