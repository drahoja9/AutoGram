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

interface DerivationStepsProps {
  steps: RE[];
  trimmed_steps: RE[];
}

const DerivationStepsView: React.SFC<DerivationStepsProps> = (props) => (
  <Centered>
    <ol>
      {
        props.steps.map((step: RE, idx: number) => (
          <li key={`step-row.${idx}`}>
            <Text>
              {regexpToString(step)} = {regexpToString(props.trimmed_steps[idx])}
            </Text>
          </li>
        ))
      }
    </ol>
  </Centered>
);

export default DerivationStepsView;
