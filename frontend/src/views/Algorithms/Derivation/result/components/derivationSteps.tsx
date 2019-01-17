//#region imports
import * as React from 'react';
import styled from 'styled-components';

import { RE } from 'lib/types';
import { Centered } from 'components/Layout';
import MonoText from 'components/Results/components/MonoText';
import { regexpToString } from 'components/Results/regexp/stringify';
//#endregion

const Text = styled(MonoText)`
  font-size: 14px;
`;
const StrongText = styled.span`
  font-weight: bold;
`;
const List = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

interface DerivationStepsProps {
  steps: RE[];
  trimmed_steps: RE[];
  derivation_string: string;
}

const DerivationStepsView: React.SFC<DerivationStepsProps> = (props) => (
  <Centered>
    <List>
      {
        props.steps.map((step: RE, idx: number) => (
          <li key={`step-row.${idx}`}>
            <Text>
              <StrongText>
                {`${props.derivation_string[idx]}: `}
              </StrongText>
              {regexpToString(step)} = {regexpToString(props.trimmed_steps[idx])}
            </Text>
          </li>
        ))
      }
    </List>
  </Centered>
);

export default DerivationStepsView;
