//#region imports
import * as React from 'react';
import styled from 'styled-components';
import { Layout, Row, Col, Collapse } from 'antd';
import { Centered } from 'components/Layout';

import {
  ResultHeader as Header
} from 'components/Layout';

//#endregion

//#region styled
const SectionCol = styled(Col)`
  height: calc(100% - 60px);
`

const SectionHeadline = styled.h2`
  font-size: 2em;
  color: #7D6F7F;
`
const SectionContainer = styled.div`
  margin: 30px 0px;
  padding: 10px 20px;
  height: 100%;
  &.left-border{
    border-left: 1px solid #ccc;
  }
`

const StepsContainer = styled.div`
  margin: 0px 20px;
  padding: 20px 0px;
  border-top: 1px solid #ccc;
`

const StepsCollapse = styled(Collapse)`
  background-color: rgba(0, 0, 0, 0);
  & > .ant-collapse-item > .ant-collapse-header{
    font-size: 2em;
    color: #7D6F7F;
    //padding-left: 0px;
  }
  & > .ant-collapse-item > .ant-collapse-header .arrow{
    //left: 100px;
    left: 0px;
    //right: 16px;
    font-size: 20px
  }

  &.ant-collapse-borderless > .ant-collapse-item{
    border-style: none;
  }
`

const StepsPanel = styled(Collapse.Panel)`
  border-style: none;
`
//#endregion

//#region Component interfaces
export interface ResultProps<InputType, ResultType> {
  defaultValue: any;
  inputValue: InputType;
  onBack: () => any;
  result: ResultType;
}
//#endregion

export default abstract class Controller<InputType, ResultType> extends React.Component<ResultProps<InputType, ResultType>>{
  protected abstract get headline(): string;
  protected abstract get inputContent(): JSX.Element;
  protected abstract get resultContent(): JSX.Element;
  protected get stepsContent(): JSX.Element | null {
    return null;
  }
  //protected abstract get content(): JSX.Element;

  public render() {
    return (
      <Layout>
        <Header
          header={this.headline}
          onBack={this.props.onBack}
        />
        <Layout>
          <Row>
            <SectionCol span={12}>
              <SectionContainer>
                <SectionHeadline>Input</SectionHeadline>
                {this.inputContent}
              </SectionContainer>
            </SectionCol>
            <SectionCol span={12}>
              <SectionContainer className={"left-border"}>
                <SectionHeadline>Result</SectionHeadline>
                {this.resultContent}
              </SectionContainer>
            </SectionCol>
          </Row>
          {
            this.stepsContent !== null ?
              <Row>
                <StepsContainer>
                  <StepsCollapse bordered={false}>
                    <StepsPanel key={"1"} header={"Steps"}>
                      <Centered>
                        {this.stepsContent}
                      </Centered>
                    </StepsPanel>
                  </StepsCollapse>
                </StepsContainer>
              </Row>
              :
              null
          }

        </Layout>
      </Layout>
    )
  }
}


