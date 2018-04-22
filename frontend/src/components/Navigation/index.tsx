//#region imports
import * as React from 'react';
import Logo from 'components/Logo.svg';
import { Layout, Menu } from 'antd';
//#endregion

/**
 * Stateless component. Renders navigation panel for the application.
 *
 * Each menu-submenu item has a link to a app view e.g. "Visualization".
 */
const Navigation: React.SFC<{}> = () => (
  <Layout.Sider>
    <Logo />
    <Menu mode="inline" theme="dark">
    <Menu.Item key="visualization">Visualization</Menu.Item>
      <Menu.Item key="comparison">Comparison</Menu.Item>
      <Menu.Item key="transformation">Transformation</Menu.Item>
      <Menu.SubMenu key="algorithms" title="Algorithms">
        <Menu.Item key="determinization">Determinization</Menu.Item>
        <Menu.Item key="minimization">Minimization</Menu.Item>
        <Menu.Item key="derivation">Derivation</Menu.Item>
        <Menu.Item key="cnf">CNF</Menu.Item>
        <Menu.Item key="cyk">CYK</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Layout.Sider>
);

export default Navigation;
