import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';

import Routes from './routes';

import Menu from './components/Menu';

import { ToastProvider } from 'react-toast-notifications'

/* CSS da lib PrimeReact */
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/* CSS da lib AG-Grid */
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

/* ============ Styles ============ */

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 6vh;
  
`;

const NavBar = styled.nav`
  padding: 16px 20px 0 20px;
  height: 100%;
  width: 100%;
  background-color: #ececec;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 94vh;
`;

const SideMenuContainer = styled.aside`
  width: 11%;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div`
  background: #ececec;
  padding: 0 18px 18px 18px;
  width: 100%;
  height: 100%;
`;

/* ============ End Styles ============ */

function App() {
  return (
    <Router>
      <HeaderContainer>
        <NavBar>
          <h3>Saib Web</h3>
        </NavBar>
      </HeaderContainer>

      <AppContainer>
        
        <ToastProvider placement="top-center" autoDismiss={true} autoDismissTimeout={4000} >

          <SideMenuContainer>
            <Menu />
          </SideMenuContainer>
          <Main>
            <MainContainer>
              <Routes />
            </MainContainer>
          </Main>

        </ToastProvider>   
        
      </AppContainer>
    </Router>
  );
}

export default App;
