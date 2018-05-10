//#region imports
import styled from 'styled-components';
import { Layout } from 'antd';
//#endregion

/**
 * Simple component, that wrapps default antd `Header` component
 * and makes it's default background transparent.
 */
const Header = styled(Layout.Header)`
  background-color: transparent;
`;

export default Header;

