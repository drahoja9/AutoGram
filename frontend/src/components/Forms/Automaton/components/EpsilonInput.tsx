//#region imports
import * as React from 'react';
import { Row, Button } from 'antd';
//#endregion

export interface EpsInputProps{
  onClick: () => any;
  headerValues: string[];
}

/**
 * Renders input for special characters.
 */
const Characters : React.SFC<EpsInputProps> = (props) => {
    return(
      <Row>
        <Button onClick={() => props.onClick()}
                disabled={props.headerValues.indexOf('ε') !== -1}
        >
          Add column for ε-transitions
        </Button>
      </Row>
    )
};

export default Characters;
