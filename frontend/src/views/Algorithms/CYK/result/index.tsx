//#region imports
import * as React from 'react';
import { connect } from 'react-redux';

import { Centered, PullRight } from 'components/Layout';
import { CYKRequest, CYKResponse } from 'lib/types';

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
import styled from 'styled-components';
import { Icon, Row, Col } from 'antd';
import StepTable from 'components/Results/StepTable';
import GrammarView from 'components/Results/grammar';
//#endregion


//#region styled
const Check = styled(Icon) `
  color: #468F83;
`;

const Cross = styled(Icon) `
  color: #f5222d;
`;

const ResultContainer = styled.div`
  padding-top: 20px;
  i {
    font-size: 28px;
  }
`

const HighlightDiv = styled.div`
  margin: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 2px dashed #468F83;
  text-align: center;
  line-height: 36px;
`

const TextRow = styled(Row)`
  margin-top: 30px;
  font-size: 14px;
`;
const StrongRight = styled(PullRight)`
  font-weight: bold;
  white-space: pre;
`;
const MonoText = styled.p`
  font-family: monospace;
  margin-top: -1px;
`
const Label = styled(Col)`
  padding-right: 0em;
`
//#endregion

const Result: React.SFC<{ result?: boolean }> = (props) => (
  props.result === true ?
    <Check type="check-circle" /> : props.result === false ?
      <Cross type="close-circle" /> : null
);

class CykController extends Controller<CYKRequest, CYKResponse> {
  protected get headline() {
    return 'CYK';
  }
  protected get inputContent() {
    return (
      <div>
        <GrammarView
          value={this.props.inputValue.grammar}
        />
        <TextRow>
          <Label span={12}>
            <StrongRight>String to check: </StrongRight>
          </Label>
          <Col span={12}>
            <MonoText>{this.props.inputValue.cyk_string}</MonoText>
          </Col>
        </TextRow>
      </div>
    )
  }
  protected get resultContent() {
    return (
      <Centered>
        <ResultContainer>
          <Result result={this.props.result.result} />
        </ResultContainer>
      </Centered>
    )
  }
  protected get stepsContent() {
    return (
      <Centered>
        <StepTable>
          <thead>
            <tr>
              <th></th>
              {
                this.props.result.step_table.map((col: any, idx: number) =>
                  <th key={`cyk_table_header=${idx + 1}`}>{idx + 1}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.result.step_table[0].map((first_cell: any, ridx: number) =>
                <tr key={`cyk_table_row=${ridx}`}>
                  <th>{this.props.defaultValue.cykString[ridx]}</th>
                  {
                    this.props.result.step_table.map((col: any, cidx: number) =>
                      <td key={`cyk_table_cell=${ridx}.${cidx}`}>
                        {
                          (ridx === 0 && cidx === this.props.result.step_table.length - 1) ?
                            <HighlightDiv> {this.props.result.step_table[cidx][ridx]} </HighlightDiv>
                            :
                            this.props.result.step_table[cidx].length < ridx + 1 ? "---" : this.props.result.step_table[cidx][ridx]
                        }
                      </td>
                    )
                  }
                </tr>
              )
            }
          </tbody>
        </StepTable>
      </Centered>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CykController);
