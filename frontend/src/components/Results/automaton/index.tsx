//#region imports
import * as React from 'react';
import styled from 'styled-components';
import { FA } from 'lib/types';
import { Centered } from 'components/Layout';
import StateIndicator from './StateIndicator'

import {
  automatonTransitionsToString,
  TransitionMap
} from './stringify';
//#endregion

//#region Styled
const Table = styled.table`
  border: 1px solid black;
  td {
    border: 1px solid black;
  }
`;
//#endregion

//#region Component
export interface AutomatonViewProps {
  value: FA;
}
//#endregion

const TableHead: React.SFC<AutomatonViewProps> = (props) => (
  <thead><tr>
  {
    [<td key={-1}>δ</td>]
    .concat(
      props.value.input_alphabet.map((symbol, idx) => (
        <td key={idx}>{ symbol }</td>
      ))
    )
  }
  </tr></thead>
);

const TableBody: React.SFC<AutomatonViewProps & { transitions: TransitionMap }> = (props) => {
  const initial = new Set(props.value.initial_states);
  const final = new Set(props.value.final_states);

  return (
    <tbody>
    {
      props.value.states.map((state, idxi) => (
        <tr key={`${idxi}`}>
        {
          ...[
            <td key={`${idxi}.${-1}`}>
              <StateIndicator
                isInitial={initial.has(state)}
                isFinal={final.has(state)}
              /> { state }
            </td>
          ].concat(
            props.value.input_alphabet.map((symbol, idxj) => (
              <td key={`${idxi}.${idxj}`}>{ props.transitions[state][symbol] }</td>
            ))
          )
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
