import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import Routes from "./routes";

import Menu from "./components/Menu";

import { ToastProvider } from "react-toast-notifications";

/* CSS da lib PrimeReact */
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

/* CSS da lib AG-Grid */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { fadeInLeftEffect } from "~/styles/globalStyles";
import Navbar from "./components/Navbar/index";

import "bootstrap/dist/css/bootstrap.min.css";

/* ============ Styles ============ */

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 8vh;
`;

const NavBar = styled.nav`
  padding: 6px 20px 0 20px;
  height: 100%;
  width: 100%;
  background-color: #ececec;
`;

const NabvBarButtonMenu = styled.button`
  padding: 2px;
  margin-right: 10px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const NavBarButtonMenuIcon = styled.i`
  color: #4e2a77;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
  overflow-y: hidden;
`;

const SideMenuContainer = styled.aside`
  position: fixed;
  height: 100%;
  width: ${(props) => (props.visible ? "100%" : "0")};
  background-color: ${(props) =>
    props.visible ? "rgba(0,0,0,0.5)" : "transparent"};
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.8s;
  z-index: 200;
  display: flex;
`;

const SideMenuCloseButton = styled.button`
  position: fixed;
  top: 12px;
  right: 16px;
  border: none;
  z-index: 210;
  background-color: #4e2a77;
  border-radius: 50%;
  padding: 6px;
  outline: 0;
  animation: 1.6s ${fadeInLeftEffect};

  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  transition: margin-left 0.5s;
`;

const MainContainer = styled.div`
  /* background: #ececec; */
  background-color: #f2f2f2;
  padding: 0 18px 18px 18px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

/* ============ End Styles ============ */

function App() {
  const [exibeMenu, setExibeMenu] = useState(false);

  const toggleMenu = () => {
    setExibeMenu(() => !exibeMenu);
  };

  return (
    <Router>
      <AppContainer>
        <ToastProvider
          placement="top-center"
          autoDismiss={true}
          autoDismissTimeout={4000}
        >
          <Menu exibeMenuProp={exibeMenu} fechaMenuFn={toggleMenu} />

          <Main>
            {/* <HeaderContainer>
              <NavBar>
                <NabvBarButtonMenu onClick={toggleMenu}>
                  <NavBarButtonMenuIcon className="pi pi-bars" style={{'fontSize': '28px'}}></NavBarButtonMenuIcon>
                </NabvBarButtonMenu>
                <span><strong>SaibWeb</strong></span>
              </NavBar>
            </HeaderContainer> */}
            <Navbar toggleMenuFn={toggleMenu} />

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
