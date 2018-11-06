//#region imports
import * as React from 'react';
import { Cell } from './AddCell';
//#endregion

//#region Component interfaces
export interface AddEpsilonCellProps {
  onClick: () => any;
}
//#endregion

/**
 * Represents a single cell for add row/column of the table.
 */
const AddEpsilonCell: React.SFC<AddEpsilonCellProps> = (props) => (
  <Cell onClick={() => props.onClick()}>
    ε
  </Cell>
);

export default AddEpsilonCell;
