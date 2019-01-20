//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AutomatonView from 'components/Results/automaton';
import { MinimizationResponse, DFA } from 'lib/types';
import StepTable from 'components/Results/StepTable';
import { Row, Col } from 'antd';
import StateIndicator from 'components/Results/automaton/StateIndicator'

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
import { symbolToString, statesToString } from 'components/Results/automaton/stringify';
import { trimWhitespace } from 'lib/assemble/common'
//#endregion

const StateWrapper = styled.div`
  padding-left: 5px;
  padding-right: 2px;
`;

const MinStepTable = styled(StepTable) `
  margin-top: 10px;
  td, th {
    width: 70px;
  }
  .double{
    border-left-style: double;
    border-left-width: 6px;
  }
`

class MinimizationController extends Controller<DFA, MinimizationResponse> {
  protected get headline() {
    return 'Minimization';
  }
  protected get inputContent() {
    return (
      <AutomatonView
        value={this.props.inputValue}
      />
    )
  }
  protected get resultContent() {
    return (
      <AutomatonView
        value={this.props.result.result}
      />
    )
  }
  protected get stepsContent() {
    return (
      <MinStepTable>
        <thead>
          <tr>
            <th>δ</th>
            {
              //generate header for table for original automaton
              this.props.defaultValue.values.header.map((value: string, valueIdx: number) =>
                <th key={`min_table_header=${-1}.${valueIdx}`}>
                  {this.props.defaultValue.values.header[valueIdx]}
                </th>
              )
            }
            {
              //generate headers for minimization steps
              this.props.result.steps.map((step: any, stepIdx: number) =>
                [
                  <th className={"double"} key={`min_table_header=-1.-1`}>{`δ${stepIdx}`}</th>
                ].concat(
                  this.props.defaultValue.values.header.map((value: string, valueIdx: number) =>
                    <th key={`min_table_header=${stepIdx}.${valueIdx}`}>
                      {this.props.defaultValue.values.header[valueIdx]}
                    </th>
                  ))
              )
            }
            <th className={"double"} key={`min_table_header=added`}>
              {`δ${this.props.result.steps.length}`}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //loop through all original automaton states
            this.props.defaultValue.values.body.map((automatonState: any, stateIdx: number) =>
              <tr key={`min_table_row=${stateIdx}`}>
                {
                  //print original automaton
                  ...[
                    <th key={`${stateIdx}.${-1}.-1`}>
                      <Row>
                        <Col span={12}>
                          <StateWrapper>
                            <StateIndicator
                              isInitial={automatonState.isInitial}
                              isFinal={automatonState.isFinal}
                            />
                          </StateWrapper>
                        </Col>
                        <Col span={12}>
                          {trimWhitespace(automatonState.value)}
                        </Col>
                      </Row>
                    </th>
                  ].concat(
                    automatonState.values.map((value: string, valIdx: number) =>
                      <td key={`${stateIdx}.-1.${valIdx}`}>{trimWhitespace(value)}</td>
                    )
                  )
                }
                {
                  //go through steps
                  this.props.result.steps.map((step: any, stepIdx: number) =>
                    [
                      <th className={"double"} key={`${stateIdx}.${stepIdx}.${-1}`}>
                        {
                          symbolToString(
                            step.filter((s: any) => s.state === trimWhitespace(automatonState.value.replace(/<|>/gi, '')))
                              .map((state: any) => state.group)[0]
                          )
                        }
                      </th>
                    ].concat(
                      this.props.defaultValue.values.header.map((value: any, valueIdx: number) =>
                        <td key={`${stateIdx}.${stepIdx}.${valueIdx}`}>
                          {
                            statesToString(
                              step.filter((s: any) => s.state === trimWhitespace(automatonState.value.replace(/<|>/gi, '')))
                                .map((s: any) =>
                                  s.transitions.filter((t: any) => t.input === value).map((t: any) =>
                                    t.to
                                  )
                                )[0])
                          }
                        </td>
                      )
                    )
                  )
                }
                <th className={"double"} key={`added.${stateIdx}`}>
                  {
                    //print the last iteration
                    symbolToString(
                      this.props.result.steps[this.props.result.steps.length - 1]
                        .filter((s: any) => s.state === trimWhitespace(automatonState.value.replace(/<|>/gi, '')))
                        .map((s: any) => s.group)[0]
                    )
                  }
                </th>
              </tr>
            )
          }
        </tbody>
      </MinStepTable>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinimizationController);
