//#region imports
import * as React from 'react';
import { Row, Button } from 'antd';
import { GrammarInputProps } from './index';
//#endregion

/**
 * Renders input for special characters.
 */
const Characters: React.SFC<GrammarInputProps> = (props) => (
  <Row>
    <Button onClick={() => props.onChange({
      ...props.value,
      ['rules']: props.value.rules + 'ε',
    })}>
      ε
    </Button>
  </Row>
);

export default Characters;
