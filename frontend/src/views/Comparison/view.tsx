//#region imports
import * as React from 'react';
import { Layout, Popover } from 'antd';
import styled from 'styled-components';
import { TopHeader as Header } from 'components/Layout';
import QuestionMark from 'components/question_mark.svg';
//#endregion

const { Content, Footer } = Layout;

//#region Styled
const InputContent = styled(Content)`
  padding: 2em;
`;
const QuestionMarkSection = styled.div`
  text-align: right;
  padding-top: 1.5em;
  padding-right: 1.5em;
  fill: darkgray;
`;
//#endregion

//#region Component interfaces
export interface LayoutProps {
  Header?: React.ReactNode | string;
  Controls: React.ReactNode;
}
//#endregion

/**
 * Comparison page layout component.
 */
const View: React.SFC<LayoutProps> = (props) => (
  <Layout>
    <Header>{props.Header}</Header>
    <Layout>
      <QuestionMarkSection>
        <Popover placement='leftTop' content={'Comparing only finite automata, regular grammars and regular expressions.'} trigger='hover'>
          <QuestionMark />
        </Popover>
      </QuestionMarkSection>
      <InputContent>
        {props.children}
      </InputContent>
    </Layout>
    <Footer>
      {props.Controls}
    </Footer>
  </Layout>
);

export default View;
