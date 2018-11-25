//#region imports
import styled from 'styled-components';
//#endregion

//#region styled
const CellInput = styled.div`
  .ant-input{
    background-color: rgba(0, 0, 0, 0);
    border: none;
    transition: none;
    text-align: center;
    margin: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    font-weight: inherit;
  }
  .ant-input:focus{
    border-width: 1px;
    box-shadow: none;
    border-color: #468F83;
    border-style: dashed;
  }
`
//#endregion

export default CellInput;