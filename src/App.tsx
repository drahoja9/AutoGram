import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const logo = require('./logo.svg');

//#region Styled
const SpinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppLogo = styled.img`
  animation: ${SpinAnimation} infinite 20s linear;
  height: 80px;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppIntro = styled.p`
  font-size: large;
`;
//#endregion

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />
          <AppTitle>Welcome to React</AppTitle>
        </AppHeader>
        <AppIntro>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </AppIntro>
      </AppContainer>
    );
  }
}

export default App;
