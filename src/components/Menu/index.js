import React from 'react';

/* ===== Styles ===== */
import { SideMenu, SectionTitle, SideMenuLink } from './styles';
/* ===== Styles ===== */

const Menu = () => {
    return (
       
        <SideMenu>
            <SectionTitle>Home</SectionTitle>

            <p>
                <SideMenuLink to="/" exact>Início</SideMenuLink>
            </p>

            <SectionTitle>Clientes</SectionTitle>
                
            <p>
                <SideMenuLink to="/clientes" exact>Cadastro de Clientes</SideMenuLink>
            </p>
                        
        </SideMenu>
    )
};

export default Menu;