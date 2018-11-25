//#region imports
import * as React from 'react';
import { Row, Col, Input, Button } from 'antd';
import styled, { StyledComponentClass } from 'styled-components';
import StateIndicator from './StateIndicator';
import CellInput from '../CellInput';
//#endregion

//#region Styled
/** Creates a control wrapper styped component */
const getControlWrapper = (Anchor: StyledComponentClass<any, any, any>) => (
  styled.div`
    position: absolute;
    top: ${Anchor};
    left: ${Anchor};
    display: none;
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
        display: inline-block;
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
  <div>
    <Row>
      <Button shape="circle" size="small" onClick={props.onInitialToggle}>I</Button>
    </Row>
    <Row>
      <Button shape="circle" size="small" onClick={props.onFinalToggle}>F</Button>
    </Row>
    <Row>
      <Button icon="close" type="danger" shape="circle" size="small" onClick={props.onRemove} />
    </Row>
  </div>
);

/**
 * A control cell component
 */
class ControlCell extends React.Component<ControlCellProps> {
  private Anchor: StyledComponentClass<any, any, any>;
  private ControlWrapper: StyledComponentClass<any, any, any>;
  private Content: StyledComponentClass<any, any, any>;

  constructor(props: ControlCellProps, context: any) {
    super(props, context);
    // Create all of the styled components per component, rather than per module.
    // There might be multiple instances of the component displayed at once and
    // they all have to reference correct elements.
    //
    // Note: This is intentionally not a simple function. We need to create each of styled
    // component only once for every component. Making a style component per each render
    // would cause in re-rendering of the actual HTML elements, which would not only be
    // less performent, but also cause input to lose focus.
    this.Anchor = styled.div``;
    this.ControlWrapper = getControlWrapper(this.Anchor);
    this.Content = getContent(this.ControlWrapper);
  }

  public render() {
    const { Anchor, ControlWrapper, Content, props } = this;
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
          <Col span={8}>
            <StateIndicator
              isFinal={props.isFinal}
              isInitial={props.isInitial}
            />
          </Col>
          <Col span={16}>
            <CellInput>
              <Input
                placeholder="a"
                value={props.value}
                onChange={(e) => props.onValueChange(e.currentTarget.value)}
              />
            </CellInput>
          </Col>
        </Row>
      </Content>
    );
  }
};

export default ControlCell;
