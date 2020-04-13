import React from 'react';

import { HeaderContainer, NavBar, NavBarButtonMenu, NavbarLogo, NavbarOptionsContainer, NavbarOptionsCell, NavbarUserAvatar, NavbarUserName } from './styles';

export default function Navbar({ toggleMenuFn }) {



  return (
    <HeaderContainer>
        <NavBar>
          <NavBarButtonMenu onClick={toggleMenuFn}>
              <i className="pi pi-bars" style={{'fontSize': '28px', color: '#4e2a77'}}></i>
          </NavBarButtonMenu>
          <NavbarLogo src="saibweb-logo.png" alt="Saibweb Tecnologia" />
          <NavbarOptionsContainer>
            <NavbarOptionsCell>
              <select style={{width: '100%', padding: '4px'}}>
                <option value="">Módulo</option>
                <option value="NF-E">NF-e</option>
              </select>
            </NavbarOptionsCell>
            <NavbarOptionsCell>
              <select style={{width: '100%', padding: '4px'}}>
                <option value="">Empresa</option>
                <option value="SAIBWEB">Saibweb</option>
              </select>
            </NavbarOptionsCell>
            <NavbarOptionsCell>
              <NavbarUserAvatar />
              
              <NavbarUserName>
                Welker Arantes
              </NavbarUserName>
            </NavbarOptionsCell>
          </NavbarOptionsContainer>
        </NavBar>
    </HeaderContainer>
  );
}
