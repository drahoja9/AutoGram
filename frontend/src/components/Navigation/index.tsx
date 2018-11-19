//#region imports
import * as React from 'react';
import styled from 'styled-components';
import Logo from 'components/Logo.svg';
import { Layout, Menu } from 'antd';
import {
  NavLink,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
//#endregion

//#region Styled
const LogoHeadline = styled.h1`
  text-transform: uppercase;
  font-size: 2.5em;
  font-weight: bold;
  transform: rotate(-90deg);
  //transform-origin: 0% 0%;
  width: 60px;
  display: inline-block;
  padding-top: 10px;
  color: rgba(255, 255, 255, 0.65);
`;
const LogoSection = styled.div`
  width: calc(100% - 75px);
  display: inline-block;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const NavStyle = styled.div`
  height: 100vh;
  .ant-layout-sider{
    width: 300px !important;
    min-width: 300px !important;
    max-width: 300px !important;
    min-height: 100%;
  }
  .ant-menu-inline .ant-menu-item, .ant-menu-inline .ant-menu-submenu-title {
    font-size: 17px;
    text-align: center;
    padding-right: 34px;
    padding-left: 34px !important;
  }
  .ant-menu-submenu .ant-menu-item{
    font-size: 15px;
    padding-left: 34px !important;
  }
  .ant-menu-submenu-arrow{
    right: inherit;
    left: 16px;
  }
  .ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow{
    opacity: 1;
  }
  .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before{
    width: 10px;
    right: -8px;
  }
  .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after{
    width: 10px;
  }
`
//#endregion

function getSelectedKeys(pathname: string) {
  let result: string = pathname;
  let inputIdx: number = pathname.indexOf("/input");
  let resultIdx: number = pathname.indexOf("/result");

  if (inputIdx !== -1) {
    result = pathname.substring(0, inputIdx);
  } else if (resultIdx !== -1) {
    result = pathname.substring(0, resultIdx);
  }

  return result;
}

/**
 * Stateless component. Renders navigation panel for the application.
 *
 * Each menu-submenu item has a link to a app view e.g. "Visualization".
 */
const Navigation: React.SFC<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => (
  <NavStyle>
    <Layout.Sider style={{ width: '300px !important' }}>
      <div>
        <LogoHeadline>Autogram</LogoHeadline>
        <LogoSection>
          <Logo />
        </LogoSection>
      </div>
      <Menu
        mode="inline" theme="dark"
        defaultSelectedKeys={['/vis']}
        selectedKeys={[getSelectedKeys(props.location.pathname)]}
      >
        <Menu.Item key="/vis">
          <NavLink to="/vis">
            Visualization
        </NavLink>
        </Menu.Item>

        <Menu.Item key="/cmp">
          <NavLink to="/cmp">
            Comparison
        </NavLink>
        </Menu.Item>

        <Menu.Item key="/tran">
          <NavLink to="/tran">
            Transformation
        </NavLink>
        </Menu.Item>

        <Menu.SubMenu key="/algo" title="Algorithms">
          <Menu.Item key="/algo/det">
            <NavLink to="/algo/det">
              Determinization
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/min">
            <NavLink to="/algo/min">
              Minimization
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/eps">
            <NavLink to="/algo/eps">
              Elimination of ε-transitions
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/der">
            <NavLink to="/algo/der">
              Derivation
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/cfg_red">
            <NavLink to="/algo/cfg_red">
              CFG reduction
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/cfg_eps">
            <NavLink to="/algo/cfg_eps">
              CFG epsilon removal
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/cfg_unit">
            <NavLink to="/algo/cfg_unit">
              CFG unit rules removal
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/cnf">
            <NavLink to="/algo/cnf">
              CNF
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/rec">
            <NavLink to="/algo/rec">
              Left Recursion Removal
          </NavLink>
          </Menu.Item>

          <Menu.Item key="/algo/cyk">
            <NavLink to="/algo/cyk">
              CYK
          </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  </NavStyle>
);

export default withRouter(Navigation);
