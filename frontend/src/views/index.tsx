import * as React from 'react';
import Logo from 'components/Logo.svg';
import { Layout, Menu } from 'antd';
const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Sider width={200}>
          <Logo />
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="visualization">Visualization</Menu.Item>
            <Menu.Item key="comparison">Comparison</Menu.Item>
            <Menu.Item key="transformation">Transformation</Menu.Item>
            <SubMenu key="algorithms" title="Algorithms">
              <Menu.Item key="determinization">Determinization</Menu.Item>
              <Menu.Item key="minimization">Minimization</Menu.Item>
              <Menu.Item key="derivation">Derivation</Menu.Item>
              <Menu.Item key="cnf">CNF</Menu.Item>
              <Menu.Item key="cyk">CYK</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );
  }
}
