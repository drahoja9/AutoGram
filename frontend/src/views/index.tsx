//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import {
  Navigation,
  RouteHandler
} from 'components';
import { routes } from './routes';
//#endregion

const { Content } = Layout;


/**
 * Application root component.
 * Defined basic layout as well as routing for the app.
 */
export default class App extends React.Component {
  public componentDidMount() {
    console.log('App component did mount');
  }

  public render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Navigation />
        <Layout>
          <Content>
            <RouteHandler routes={routes} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
