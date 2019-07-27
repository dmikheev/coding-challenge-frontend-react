import { CssBaseline, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { StylesProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { createGlobalStyle, css } from 'styled-components';
import IncidentsPageContainer from './incidentsPage/IncidentsPageContainer';
import logo from './logo.svg';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
`;

const App: React.FC = () => (
  <React.Fragment>
    <StylesProvider injectFirst={true}>
      <CssBaseline/>
      <GlobalStyle/>
      <div>
        <Header/>
        <BrowserRouter>
          <Route component={StyledIncidentsPageContainer}/>
        </BrowserRouter>
      </div>
    </StylesProvider>
  </React.Fragment>
);
export default App;

const pageContentStyles = css`
  margin: 0 auto;
  width: 1140px;
`;

const Header: React.FC = () => (
  <StyledHeader>
    <HeaderContentWrap>
      <LogoImage src={logo} alt="logo"/>
      <HeaderText variant="h2">Stolen bikes</HeaderText>
    </HeaderContentWrap>
  </StyledHeader>
);
const StyledHeader = styled.header`
  padding: 10px 0;
  background-color: ${grey[300]};
`;
const HeaderContentWrap = styled.div`
  ${pageContentStyles};
  display: flex;
  align-items: center;
`;
const LogoImage = styled.img`
  margin: 0 -10px 0 -20px;
  height: 80px;
`;
const HeaderText = styled(Typography)`
  font-weight: 500;
`;

const StyledIncidentsPageContainer = styled(IncidentsPageContainer)`
  ${pageContentStyles};
  padding: 20px 0 40px;
`;
