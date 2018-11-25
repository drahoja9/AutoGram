//#region imports
import * as React from 'react';
import { Row, Col, Input, Button } from 'antd';
import styled, { StyledComponentClass } from 'styled-components';
import StateIndicator from './StateIndicator';
import CellInput from '../CellInput';
//#endregion

//#region Styled
/** Creates a control wrapper styped component */
const getControlWrapper = () => (
  styled.div`
    position: absolute;
    top: -1px;
    left: -29px;
    display: none;
    z-index: 5;
  `
);

/** Creates a cell content styped component */
const getContent = (ControlWrapper: StyledComponentClass<any, any, any>) => (
  styled.td`
    position: relative;
    &:hover {
      ${ControlWrapper} {
        display: inline-block;
      }
    }
  `
);

const StateWrapper = styled.div`
  margin-top: 7px;
  padding-left: 5px;
  padding-right: 2px;
`

const ControlButton = styled(Button)`
  font-size: 18px;
  line-height: 0px;
  width: 28px;
  height: 16px;
  margin: 0;
  padding: 0;
  padding-bottom: 2px;
  padding-left: 1px;
  border-radius: 8px 0px 0px 8px;
  display: block;
  &.ant-btn-danger{
    font-size: 11px;
    line-height: 0px;
    padding-left: 0px;
    padding-bottom: 2px;
    background-color: white;
    &:hover{
      background-color: red;
    }
  }
  &.ant-btn-primary{
    background-color: #468F83;
    color: white;
    border-color: #d9d9d9;
    &.ant-btn:focus{
      border-color: white;
      color: white;
      background-color: #367F73;
    }
    &.ant-btn:hover{
      border-color: white;
      color: white;
      background-color: #367F73;
    }
  }
`
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
  isInitial: boolean;
  isFinal: boolean;
  onInitialToggle: () => any;
  onFinalToggle: () => any;
  onRemove: () => any;
}
//#endregion


/** Actual control buttons. */
const Controls: React.SFC<ControlProps> = (props) => (
  <div>
    <ControlButton type={props.isInitial ? "primary" : undefined} onClick={props.onInitialToggle}>{"\u2192"}</ControlButton>
    <ControlButton type={props.isFinal ? "primary" : undefined} onClick={props.onFinalToggle}>{"\u2190"}</ControlButton>
    <ControlButton icon="close" type="danger" onClick={props.onRemove} />
  </div>
);

/**
 * A control cell component
 */
class ControlCell extends React.Component<ControlCellProps> {
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
    this.ControlWrapper = getControlWrapper();
    this.Content = getContent(this.ControlWrapper);
  }

  public render() {
    const { ControlWrapper, Content, props } = this;
    return (
      <Content>
          <ControlWrapper>
            <Controls
              onInitialToggle={props.onInitialToggle}
              onFinalToggle={props.onFinalToggle}
              onRemove={props.onRemove}
              isInitial={props.isInitial}
              isFinal={props.isFinal}
            />
          </ControlWrapper>
        <Row>
          <Col span={8}>
            <StateWrapper>
              <StateIndicator
                isFinal={props.isFinal}
                isInitial={props.isInitial}
              />
            </StateWrapper>
          </Col>
          <Col span={16}>
            <CellInput>
              <Input
                placeholder="state"
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
