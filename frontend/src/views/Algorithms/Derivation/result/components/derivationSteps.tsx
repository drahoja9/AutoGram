//#region imports
import * as React from 'react';
import styled from 'styled-components';

import { RE } from 'lib/types';
import { Centered } from 'components/Layout';
import MonoText from 'components/Results/components/MonoText';
import { regexpToString } from 'components/Results/regexp/stringify';
//#endregion

const Text = styled(MonoText)`
  font-size: 16px;
`;

const CenteredUnderneath = styled(Centered)`
  display: block;
  text-align: center;
`;

export interface DerivationStepsProps {
  value: RE[];
}

const DerivationStepsView: React.SFC<DerivationStepsProps> = (props) => (
  <CenteredUnderneath>
    {
      props.value.map((step: RE, idx: Number) => (
        <Text key={`step-row.${idx}`}>
          {regexpToString(step)} =
        </Text>
      ))
    }
  </CenteredUnderneath>
);

export default DerivationStepsView;
