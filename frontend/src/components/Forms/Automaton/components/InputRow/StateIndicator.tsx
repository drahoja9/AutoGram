//#region imports
import * as React from 'react';
import { Arrows } from 'components';
//#endregion

//#region Component interfaces
export interface StateIndicatorProps {
  isInitial: boolean;
  isFinal: boolean;
}
//#endregion

/** Renders appropriate state attribute. */
const StateIndicator: React.SFC<StateIndicatorProps> = (props) => (
  props.isFinal && props.isInitial ?
    <Arrows.Double /> : props.isInitial ?
      <Arrows.Right /> : props.isFinal ?
        <Arrows.Left /> : null
);

export default StateIndicator;
