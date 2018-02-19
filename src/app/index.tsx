//#region imports
import * as React from 'react';
import styled from 'styled-components';
import {
  Navigation,
  RouteHandler
} from 'components';
import { routes } from './routes';
//#endregion

//#region Styled
const Container = styled.div`
  padding: 0;
  margin: 0;
  margin-top: 50px;
`;
//#endregion

export default () => (
  <Container>
    <Navigation />
    <RouteHandler
      routes={routes}
    />
  </Container>
);
