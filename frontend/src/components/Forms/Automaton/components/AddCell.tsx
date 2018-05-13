//#region imports
import * as React from 'react';
import styled from 'styled-components';
//#endregion

//#region Styled
const Cell = styled.td`
  text-align: center;
  cursor: pointer;
`;
//#endregion

//#region Component interfaces
export interface AddCellProps {
  isFirst: boolean;
  onClick: () => any;
}
//#endregion

/**
 * Represents a single cell for add row/column of the table.
 */
const AddCell: React.SFC<AddCellProps> = (props) => (
  <Cell onClick={() => props.onClick()}>
    { props.isFirst ? '+' : null }
  </Cell>
);

export default AddCell;
