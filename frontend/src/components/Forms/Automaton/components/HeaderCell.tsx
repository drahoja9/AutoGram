//#region imports
import * as React from 'react';
import { Button, Input } from 'antd';
import styled, { StyledComponentClass } from 'styled-components';
import CellInput from './CellInput'
//#endregion

//#region Styled
/** Creates a control wrapper styped component */
const getControlWrapper = () => (
  styled.div`
    position: absolute;
    top: -21px;
    right: 0;
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

const ControlButton = styled(Button) `
  width: 20px;
  height: 20px;
  border-radius: 10px 10px 0px 0px;
  font-size: 12px;
  padding: 1px 0 0 0 !important;
  margin: 0;
  &.ant-btn-danger{
    background-color: white;
    &:hover{
      background-color: red;
    }
  }
`
//#endregion

//#region Component interfaces
export interface HeaderCellProps {
  onRemove: () => any;
  onChange: (value: string) => any;
  value: string;
  isEpsilonOn?: boolean
}
//#endregion

class HeaderCell extends React.Component<HeaderCellProps> {
  private ControlWrapper: StyledComponentClass<any, any, any>;
  private Content: StyledComponentClass<any, any, any>;

  constructor(props: HeaderCellProps, context: any) {
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
          {
            props.isEpsilonOn ?
              null
              :
              <ControlButton
                icon="close"
                type="danger"
                onClick={props.onRemove}
              />
          }
        </ControlWrapper>
        <CellInput>
          <Input
            disabled={props.isEpsilonOn ? true : false}
            onChange={(e) => props.onChange(e.currentTarget.value)}
            value={props.value}
          />
        </CellInput>
      </Content>
    );
  }
}

export default HeaderCell;
