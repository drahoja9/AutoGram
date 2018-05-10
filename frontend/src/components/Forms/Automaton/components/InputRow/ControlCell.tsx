//#region imports
import * as React from 'react';
import { Row, Col, Input, Button, Popover } from 'antd';
//#endregion

export interface ControlCellProps {
  isInitial: boolean;
  isFinal: boolean;
  value: string;
  onValueChange: (value: string) => any;
  onInitialToggle: () => any;
  onFinalToggle: () => any;
  onRemove: () => any;
}

const Controls: React.SFC<ControlCellProps> = (props) => (
  <div>
    <Button onClick={() => props.onInitialToggle()}>Inital</Button>
    <Button onClick={() => props.onFinalToggle()}>Final</Button>
    <Button type="danger" onClick={() => props.onRemove()}>Remove</Button>
  </div>
)

const ControlCell: React.SFC<ControlCellProps> = (props) => (
  <td>
    <Popover placement="left" content={<Controls {...props} />} trigger="hover">
      <Row>
        <Col span={12}>
        {
          props.isFinal && props.isInitial ?
            '<->'
            : props.isFinal ?
              '<-'
              : props.isInitial ?
                '->'
                : null
        }
        </Col>
        <Col span={12}>
          <Input
            placeholder="a"
            value={props.value}
            onChange={(e) => props.onValueChange(e.currentTarget.value)}
          />
        </Col>
      </Row>
    </Popover>
  </td>
);

export default ControlCell;
