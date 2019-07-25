import { CssBaseline } from '@material-ui/core';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import IncidentsPage from './incidentsPage/IncidentsPage';
import logo from './logo.svg';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App: React.FC = () => (
  <React.Fragment>
    <CssBaseline/>
    <GlobalStyle/>
    <div>
      <Header/>
      <IncidentsPage/>
    </div>
  </React.Fragment>
);
export default App;

const Header: React.FC = () => (
  <header>
    <LogoImage src={logo} alt="logo"/>
    <div>Stolen bikes</div>
  </header>
);

const LogoImage = styled.img`
    height: 50px;
`;
