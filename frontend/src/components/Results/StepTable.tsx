//#region imports
import styled from 'styled-components';
//#endregion

/**
 * Style for basic step tables - with grey <th> cells and transparent <td> cells
 */
const StepTable = styled.table`
  display: block;
  border-collapse: separate;
  border-spacing: 0;
  color: #666666;
  td,th {
    border: solid #666666;
    border-width: 2px 0px 0px 2px;
    height: 48px;
    width: 100px;
    text-align: center;
  }
  th {
    background-color: #DDDDDD;
    font-weight: bold;
  }
  thead td, 
  thead th {
    border-top-width: 1px;
  }
  thead td:first-child,
  thead th:first-child {
    border-top-left-radius: 5px;
    border-left-width: 1px;
  }
  thead td:last-child,
  thead th:last-child {
    border-top-right-radius: 5px;
    border-right-width: 1px;
  }
  tbody td:first-child,
  tbody th:first-child {
    border-left-width: 1px;
  }
  tbody td:last-child,
  tbody th:last-child{
    border-right-width: 1px;
  }
  tbody tr:last-child td,
  tbody tr:last-child th {
    border-bottom-width: 1px;
  }
  tbody tr:last-child td:last-child,
  tbody tr:last-child th:last-child{
    border-bottom-right-radius: 5px;
  }
  tbody tr:last-child td:first-child,
  tbody tr:last-child th:first-child{
    border-left-width: 1px;
    border-bottom-left-radius: 5px; 
  }
`;

export default StepTable;

