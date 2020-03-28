// Menu

import React, { useState, useEffect } from 'react';

import { navigation } from './navigation';

/* ===== Styles ===== */
import { SideMenu, ModuleTitle, SideMenuLink, ModuleOptionsContainer, ToggleIndicator } from './styles';
/* ===== Styles ===== */

const Menu = () => {

    const [listaOpcoesMenu, setListaOpcoesMenu] = useState([]);

    useEffect(() => {
        console.log("opções do menu", navigation);

        setListaOpcoesMenu(navigation);
    }, [listaOpcoesMenu]);

    const toggleExibeOpcoes = (tituloModulo) => {        
        
        setListaOpcoesMenu(() => {
            let tempListaOpcoes = [];

            listaOpcoesMenu.forEach(element => {
                element.modulo.ativo = element.modulo.titulo === tituloModulo;
                tempListaOpcoes.push(element);
            })
            return tempListaOpcoes;
        })
    }

    const desenhaItensMenuFn = (listaOpcoesMenu) => {
        
        return listaOpcoesMenu.map(op => (
            <>
                <ModuleTitle key={op.modulo.titulo} ativo={op.modulo.ativo} onClick={() => { toggleExibeOpcoes(op.modulo.titulo) }}>
                    <i className={`pi ${op.modulo.icone}`}></i> 
                    &nbsp;{op.modulo.titulo}
                    <ToggleIndicator>
                        <i className={`pi ${op.modulo.ativo ? "pi-chevron-up" : "pi-chevron-down"}`}></i>
                    </ToggleIndicator>
                </ModuleTitle>
                
                {op.modulo.ativo ?
                    (
                        <ModuleOptionsContainer exibir={op.modulo.ativo}>
                            {op.modulo.paginas ?
                                op.modulo.paginas.map(pagina => (
                                    <p>
                                        <SideMenuLink to={pagina.path} exact activeStyle={{color: "#bebbbe"}}>{pagina.titulo}</SideMenuLink>
                                    </p>
                                ))
                                : null
                            }
                        </ModuleOptionsContainer>                        
                    )
                    : null
                }              
            </>    
        ));
    }

    return (

        <SideMenu>

            { desenhaItensMenuFn(listaOpcoesMenu) }

        </SideMenu>        
            
    )
};

export default Menu;