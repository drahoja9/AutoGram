//#region imports
import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { TopHeader as Header } from 'components/Layout';
import Controls from 'components/AlgorithmView/controls/Submit';
//#endregion

const { Content, Footer } = Layout;

//#region Styled
const InputContent = styled(Content)`
  padding: 2em;
`;
//#endregion

//#region Component interfaces
export interface InputDefaultProps<InputState> {
  defaultValue?: InputState;
  onValueChange: (value: InputState) => any;
  onSubmit: () => any;
  pending: boolean;
}

//#endregion

export default abstract class Controller<InputState> extends React.Component<InputDefaultProps<InputState>, InputState> {
  constructor(props: InputDefaultProps<InputState>, context: any) {
    super(props, context);
  }

  protected abstract get headline() : string;
  protected abstract get action() : string;
  protected abstract get content() : JSX.Element;
  
  public render() {
    return (
      <Layout>
        <Header><h1>{this.headline}</h1></Header>
        <Layout>
          <InputContent>
            {this.content}
          </InputContent>
        </Layout>
        <Footer>
          <Controls
            onSubmit={this.props.onSubmit}
            pending={this.props.pending}
            text={this.action}
          />
        </Footer>
      </Layout>
    )
  }
}
