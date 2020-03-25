import React, { useState, useEffect } from 'react';

import { navigation } from './navigation';
import MenuListaOpcoes from './MenuListaOpcoes';

/* ===== Styles ===== */
import { SideMenu, ModuleTitle, SideMenuLink, ModuleOptionsContainer } from './styles';
/* ===== Styles ===== */

const Menu = () => {

    const [listaOpcoesMenu, setListaOpcoesMenu] = useState([]);

    useEffect(() => {
        console.log("opções do menu", navigation);

        setListaOpcoesMenu(navigation);
    }, [listaOpcoesMenu]);

    const [exibeOpcoesHome, setExibeOpcoesHome] = useState(false);
    const [exibeOpcoesCadastros, setExibeOpcoesCadastros] = useState(false);

    const toggleExibeOpcoes = (tituloModulo) => {
        
        let tempListaOpcoes = listaOpcoesMenu;

        tempListaOpcoes.forEach( element => {
            
            if (element.modulo.titulo === tituloModulo) {
                element.modulo.ativo = true;
            } else {
                element.modulo.ativo = false;
            }
        });

        setListaOpcoesMenu(tempListaOpcoes);

        console.log("toggleExibeOpcoes", tempListaOpcoes);
    }

    const listaOpcoesFn = (paginas, ativo) => {
        return (
            <MenuListaOpcoes opcoes={paginas} exibirOpcoes={ativo} />
        )
    }

    return (
       
        // <SideMenu>
        //     <ModuleTitle exibir={exibeOpcoesHome} onClick={toggleOpcoesHome}><i className="pi pi-home"></i> Home</ModuleTitle>
        //     <ModuleOptionsContainer exibir={exibeOpcoesHome}>
        //         <p>
        //             <SideMenuLink to="/" exact>Início</SideMenuLink>
        //         </p>
        //     </ModuleOptionsContainer>            

        //     <ModuleTitle exibir={exibeOpcoesCadastros} onClick={toggleOpcoesCadastros}><i className="pi pi-pencil"></i> Cadastros</ModuleTitle>
        //     <ModuleOptionsContainer exibir={exibeOpcoesCadastros}>
        //         <p>
        //             <SideMenuLink to="/clientes" exact>Cadastro de Clientes</SideMenuLink>
        //         </p>
        //     </ModuleOptionsContainer>
                        
        // </SideMenu>


        <SideMenu>

            {
                listaOpcoesMenu.map(nav => (

                    <>
                        <ModuleTitle 
                            key={nav.modulo.titulo} 
                            exibir={nav.modulo.ativo} 
                            onClick={() => { toggleExibeOpcoes(nav.modulo.titulo) }} 
                        >
                            <i className={`pi ${nav.modulo.icone}`}></i> {nav.modulo.titulo}
                        </ModuleTitle>
                        
                        { listaOpcoesFn(nav.modulo.paginas, nav.modulo.ativo) }
                    </>

                ))
            }

        </SideMenu>        
            
    )
};

export default Menu;