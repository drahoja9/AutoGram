//#region imports
import * as React from 'react';
import { Row, Button } from 'antd';
//#endregion


//#region Component interfaces
interface RegexpInputProps {
  onChange: (value: any) => any;
  value: any;
  cursor: () => number;
}

interface CharInputProps extends RegexpInputProps {
  char: string;
}
//#endregion

/**
 * Button for input of special characters.
 */
const CharBtn: React.SFC<CharInputProps> = (props) => (
  <Button onClick={() => props.onChange(props.value.slice(0, props.cursor()) + props.char + props.value.slice(props.cursor()))}>
    {props.char}
  </Button>
);

/**
 * Renders input for special characters.
 */
const Characters: React.SFC<RegexpInputProps> = (props) => (
  <Row>
    <CharBtn {...props} char="ε" />
    <CharBtn {...props} char="∅" />
  </Row>
);

export default Characters;
