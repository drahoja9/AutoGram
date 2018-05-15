//#region imports
import * as React from 'react';
import Logo from 'components/Logo.svg';
import { Layout, Menu } from 'antd';
import {
  NavLink,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
//#endregion

/**
 * Stateless component. Renders navigation panel for the application.
 *
 * Each menu-submenu item has a link to a app view e.g. "Visualization".
 */
const Navigation: React.SFC<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => (
  <Layout.Sider>
    <Logo />
    <Menu
      mode="inline" theme="dark"
      defaultSelectedKeys={['/vis']}
      selectedKeys={[props.location.pathname]}
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

      <Menu.SubMenu key="/algoalgorithms" title="Algorithms">
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

        <Menu.Item key="/algo/der">
          <NavLink to="/algo/der">
            Derivation
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/algo/cnf">
          <NavLink to="/algo/cnf">
            CNF
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
);

export default withRouter(Navigation);