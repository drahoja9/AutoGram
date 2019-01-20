//#region imports
import * as React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { FA } from 'lib/types';
import { Centered } from 'components/Layout';
import StateIndicator from './StateIndicator'

import {
  statesToString,
  automatonTransitionsToString,
  TransitionMap
} from './stringify';
//#endregion

//#region Styled
const Table = styled.table`
border-collapse: separate;
border-spacing: 0;
color: #666666;
td {
  border: solid #666666;
  border-width: 0px 2px 2px 0px;
  height: 48px;
  width: 100px;
  text-align: center;
}
thead td {
  background-color: #DDDDDD;
  font-weight: bold;
  border-top-width: 1px;
}
thead td:first-child {
  border-top-left-radius: 5px;
  border-left-width: 1px;
}
thead td:last-child {
  border-top-right-radius: 5px;
  border-right-width: 1px;
}
tbody td:first-child {
  background-color: #DDDDDD;
  font-weight: bold;
  border-left-width: 1px;
}
tbody td:last-child{
  border-right-width: 1px;
}
tbody tr:last-child td {
  border-bottom-width: 1px;
}
tbody tr:last-child td:last-child{
  border-right-width: 1px;
  border-bottom-right-radius: 5px;
}
tbody tr:last-child td:first-child{
  border-left-width: 1px;
  border-bottom-left-radius: 5px; 
}
`;
const StateWrapper = styled.div`
  padding-left: 5px;
  padding-right: 2px;
`;
//#endregion

//#region Component
export interface AutomatonViewProps {
  value: FA;
  isEpsilon?: boolean;
}
//#endregion

const TableHead: React.SFC<AutomatonViewProps> = (props) => (
  <thead><tr>
    {
      [<td key={-1}>δ</td>]
        .concat(
          props.value.input_alphabet.map((symbol, idx) => (
            <td key={idx}>{symbol}</td>
          ))
        )
    }
    {
      props.isEpsilon ?
        <td key={'eps'}>ε</td>
        :
        null
    }
  </tr></thead>
);

const TableBody: React.SFC<AutomatonViewProps & { transitions: TransitionMap }> = (props) => {
  const initial = new Set(statesToString(props.value.initial_states));
  const final = new Set(statesToString(props.value.final_states));
  const states = statesToString(props.value.states);

  return (
    <tbody>
      {
        states.map((state, idxi) => (
          <tr key={`${idxi}`}>
            {
              ...[
                <td key={`${idxi}.${-1}`}>
                  <Row>
                    <Col span={8}>
                      <StateWrapper>
                        <StateIndicator
                          isInitial={initial.has(state)}
                          isFinal={final.has(state)}
                        />
                      </StateWrapper>
                    </Col>
                    <Col span={16}>
                      {state}
                    </Col>
                  </Row>
                </td>
              ].concat(
                props.value.input_alphabet.map((symbol, idxj) => (
                  <td key={`${idxi}.${idxj}`}>{props.transitions[state][symbol]}</td>
                ))
              )
            }
            {
              props.isEpsilon ?
                <td key={`${idxi}.eps`}>{props.transitions[state]['ε']}</td>
                :
                null
            }
          </tr>
        ))
      }
    </tbody>
  );
};

const AutomatonView: React.SFC<AutomatonViewProps> = (props) => (
  <Centered>
    <Table>
      <TableHead {...props} />
      <TableBody {...props} transitions={automatonTransitionsToString(props.value)} />
    </Table>
  </Centered>
);

export default AutomatonView;
