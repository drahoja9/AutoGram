//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
//#endregion

const { Content, Header, Footer } = Layout;

//#region Styled
const InputContent = styled(Content)`
  padding: 2em;
`;
//#endregion

//#region Component interfaces
export interface LayoutProps {
  Header?: React.ReactNode | string;
  Controls: React.ReactNode;
}
//#endregion

/**
 * Transformation page layout component.
 */
const View: React.SFC<LayoutProps> = (props) => (
  <Layout>
    <Header>{ props.Header }</Header>
    <Layout>
      <InputContent>
        { props.children }
      </InputContent>
    </Layout>
    <Footer>
      { props.Controls }
    </Footer>
  </Layout>
);

export default View;
