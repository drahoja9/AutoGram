import * as React from 'react';
import ControlCell from './components/InputRow/ControlCell';
import style from 'styled-components';

const Table = style.table`
  border: 1px solid black;
  td {
    border: 1px solid black;
  }
`;

export default (props: any) => (
  <Table>
    <thead>
      <tr><td>δ</td></tr>
    </thead>

    <tbody>
      <tr>
        <ControlCell
          onInitialToggle={() => console.log('Initial toggle')}
          onFinalToggle={() => console.log('Final toggle')}
          onRemove={() => console.log('Remove')}
          onValueChange={(value: string) => console.log(value)}
          value=""
          isInitial={true}
          isFinal={false}
        />
      </tr>
    </tbody>
  </Table>
);

