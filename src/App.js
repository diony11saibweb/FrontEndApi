import React, { useState } from 'react';
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
  overflow-y: hidden;
`;

const SideMenuContainer = styled.aside`
  height: 100%;
  width: ${props => props.visible ? 14 : 0}rem;
  overflow-x: hidden;
  transition: 0.5s;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  transition: margin-left .5s;
`;

const MainContainer = styled.div`
  background: #ececec;
  padding: 0 18px 18px 18px;
  width: 100%;
  height: 100%;
`;

/* ============ End Styles ============ */

function App() {

  const [exibeMenu, setExibeMenu] = useState(false);

  const toogleMenu = () => {

    setExibeMenu( () => !exibeMenu );
  }

  return (
    <Router>
      <HeaderContainer>
        <NavBar>
          <button onClick={toogleMenu}>Menu</button>
          <h3>Saib Web</h3>
        </NavBar>
      </HeaderContainer>

      <AppContainer>
        
        <ToastProvider placement="top-center" autoDismiss={true} autoDismissTimeout={4000} >

          <SideMenuContainer visible={true}>
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
