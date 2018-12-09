//#region imports
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AutomatonView from 'components/Results/automaton';
import { MinimizationResponse } from 'lib/types';
import StepTable from 'components/Results/StepTable';
import { Centered } from 'components/Layout';
import { Row, Col } from 'antd';
import StateIndicator from 'components/Results/automaton/StateIndicator'

import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';
import Controller from 'components/AlgorithmView//ResultView';
//#endregion

const StateWrapper = styled.div`
  padding-left: 5px;
  padding-right: 2px;
`;

const MinStepTable = styled(StepTable)`
  margin-top: 10px;
  td, th {
    width: 70px;
  }
  .double{
    border-left-style: double;
    border-left-width: 6px;
  }
`

const ResultContainer = styled.div`
  padding-top: 10px;
`

class MinimizationController extends Controller<MinimizationResponse> {
  protected get headline(){
    return 'Minimization result';
  }
  protected get content(){
    return (
      <div>
      <Centered>
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
                            {automatonState.value}
                          </Col>
                        </Row>
                      </th>
                    ].concat(
                      automatonState.values.map((value:string, valIdx: number) =>
                        <td key={`${stateIdx}.-1.${valIdx}`}>{value}</td>
                      )
                    )
                  }
                  {
                    //go through steps
                    this.props.result.steps.map((step:any, stepIdx:number) =>
                      [
                        <th className={"double"} key={`${stateIdx}.${stepIdx}.${-1}`}>
                          { 
                            step.filter( (s:any) => s.state === automatonState.value).map((state: any) => state.group)
                          }
                        </th>
                      ].concat(
                        this.props.defaultValue.values.header.map((value: any, valueIdx: number) => 
                          <td key={`${stateIdx}.${stepIdx}.${valueIdx}`}>
                            {
                              step.filter( (s:any) => s.state === automatonState.value).map((s: any) => 
                                s.transitions.filter( (t:any) => t.input === value ).map((t:any) =>
                                  t.to
                                )
                              )
                            }
                          </td>
                        )
                      )
                    )
                  }
                  <th className={"double"} key={`added.${stateIdx}`}>
                  {
                    //print the last iteration
                    this.props.result.steps[this.props.result.steps.length - 1].filter((s:any) => s.state === automatonState.value)
                      .map((s:any) => s.group)
                  }
                  </th>
                </tr>
              )
            }
          </tbody>
        </MinStepTable>
      </Centered>
      <ResultContainer>
        <AutomatonView 
          value={this.props.result.result}
        />
      </ResultContainer>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinimizationController);
