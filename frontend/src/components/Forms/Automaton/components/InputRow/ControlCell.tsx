//#region imports
import * as React from 'react';
import { Row, Col, Input, Button, /* Popover */ } from 'antd';
import styled, { StyledComponentClass } from 'styled-components';
import StateIndicator from './StateIndicator';
//#endregion

//#region Styled
/** Creates a control wrapper styped component */
const getControlWrapper = (Anchor: StyledComponentClass<any, any, any>) => (
  styled.div`
    position: absolute;
    top: ${Anchor};
    left: ${Anchor};
    visibility: hidden;
    display: inline-block;
    z-index: 5;
    margin-top: -15px;
    margin-left: -10px;
  `
);

/** Creates a cell content styped component */
const getContent = (ControlWrapper: StyledComponentClass<any, any, any>) => (
  styled.td`
    &:hover {
      ${ControlWrapper} {
        visibility: visible;
      }
    }
  `
);
//#endregion

//#region Component interfaces
export interface ControlCellProps {
  isInitial: boolean;
  isFinal: boolean;
  value: string;
  onValueChange: (value: string) => any;
  onInitialToggle: () => any;
  onFinalToggle: () => any;
  onRemove: () => any;
}

interface ControlProps {
  onInitialToggle: () => any;
  onFinalToggle: () => any;
  onRemove: () => any;
}
//#endregion


/** Actual control buttons. */
const Controls: React.SFC<ControlProps> = (props) => (
  <>
    <Row>
      <Button shape="circle" size="small" onClick={props.onInitialToggle}>I</Button>
    </Row>
    <Row>
      <Button shape="circle" size="small" onClick={props.onFinalToggle}>F</Button>
    </Row>
    <Row>
      <Button icon="close" type="danger" shape="circle" size="small" onClick={props.onRemove} />
    </Row>
  </>
);

/** A control cell component */
const ControlCell: React.SFC<ControlCellProps> = (props) => {
  // Create all of the styled components per render, rather than per module.
  // There might be multiple instances of the component displayed at once and
  // they all have to reference correct elements.
  const Anchor = styled.div``;
  const ControlWrapper = getControlWrapper(Anchor);
  const Content = getContent(ControlWrapper);

  return (
    <Content>
      <Anchor>
        <ControlWrapper>
          <Controls
            onInitialToggle={props.onInitialToggle}
            onFinalToggle={props.onFinalToggle}
            onRemove={props.onRemove}
          />
        </ControlWrapper>
      </Anchor>
      <Row>
        <Col span={12}>
          <StateIndicator
            isFinal={props.isFinal}
            isInitial={props.isInitial}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="a"
            value={props.value}
            onChange={(e) => props.onValueChange(e.currentTarget.value)}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default ControlCell;
