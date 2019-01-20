//#region imports
import * as React from 'react';
import { Row, Button } from 'antd';
import { GrammarInputValue } from '.';
//#endregion

interface EpsilonProps {
  onChange: (value: GrammarInputValue) => any;
  value: any;
  cursor: () => number;
}

/**
 * Renders input for special characters.
 */
const Characters: React.SFC<EpsilonProps> = (props) => (
  <Row>
    <Button onClick={() => props.onChange({
      ...props.value,
      ['rules']: props.value.rules.slice(0, props.cursor()) + 'ε' + props.value.rules.slice(props.cursor())
    })}>
      ε
    </Button>
  </Row>
);

export default Characters;
