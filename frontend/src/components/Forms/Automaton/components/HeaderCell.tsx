//#region imports
import * as React from 'react';
import { Button, Input } from 'antd';
import styled, { StyledComponentClass } from 'styled-components';
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
export interface HeaderCellProps {
  onRemove: () => any;
  onChange: (value: string) => any;
  value: string;
  isEpsilonOn?: boolean
}
//#endregion

class HeaderCell extends React.Component<HeaderCellProps> {
  private Anchor: StyledComponentClass<any, any, any>;
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
            <Button
              icon="close"
              type="danger"
              shape="circle"
              size="small"
              onClick={props.onRemove}
            />
          </ControlWrapper>
        </Anchor>
        <Input
          disabled={props.isEpsilonOn ? true : false}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          value={props.value}
        />
      </Content>
    );
  }
}

export default HeaderCell;
