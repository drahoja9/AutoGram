//#region imports
import * as React from 'react';
import AddCell from './AddCell';
//#endregion

//#region Component interfaces
export interface HeaderRowProps {
  onAddCol: () => any;
}
//#endregion

/** Header for automaton form table. */
const HeaderRow: React.SFC<HeaderRowProps> = (props) => (
  <tr>
    <td>δ</td>
    { props.children }
    <AddCell
      isFirst
      onClick={props.onAddCol}
    />
  </tr>
);


export default HeaderRow;
