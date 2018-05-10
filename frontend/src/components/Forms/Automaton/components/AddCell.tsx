//#region imports
import * as React from 'react';
//#endregion

export interface AddCellProps {
  isFirst: boolean;
  onClick: () => any;
}

/**
 * Represents a single cell for add row/column of the table.
 */
const AddCell: React.SFC<AddCellProps> = (props) => (
  <td onClick={() => props.onClick()}>
    { props.isFirst ? '+' : null }
  </td>
);

export default AddCell;
