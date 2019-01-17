//#region imports
import styled from 'styled-components';
import { Layout } from 'antd';
//#endregion

/**
 * Simple component, that wrapps default antd `Header` component
 * and makes it's default background transparent, and adds border.
 */
const Header = styled(Layout.Header)`
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  h1 {
    color: dimgray;
    font-size: 2.4em;
    font-weight: bold;
    text-align: right;
  }
`;

export default Header;

