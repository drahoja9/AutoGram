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
  padding-top: 0.6em;
  fill: darkgray;
`;
const HeaderWithTooltip = styled(Header)`
  display: flex;
  justify-content: space-between;
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
    <HeaderWithTooltip>
      <QuestionMarkSection>
        <Popover placement='rightTop' content={'Comparing only finite automata, regular grammars and regular expressions.'} trigger='hover'>
          <QuestionMark />
        </Popover>
      </QuestionMarkSection>
      {props.Header}
    </HeaderWithTooltip>
    <Layout>
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
