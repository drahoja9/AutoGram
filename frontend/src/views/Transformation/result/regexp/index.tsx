//#region imports
import * as React from 'react';
import styled from 'styled-components';

import { RE } from 'lib/types';
import { Centered } from 'components/Layout';
import MonoText from '../components/MonoText';
import { regexpToString } from './stringify';
//#endregion

const Text = styled(MonoText)`
  font-size: 16px;
`;

export interface RegexpViewProps {
  value: RE;
}

const RegexpView: React.SFC<RegexpViewProps> = (props) => (
  <Centered>
    <Text>
      { regexpToString(props.value) }
    </Text>
  </Centered>
);

export default RegexpView;
