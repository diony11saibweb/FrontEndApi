import React, { useState, useEffect } from 'react';

import { navigation } from './navigation';

/* ===== Styles ===== */
import { SideMenu, ModuleTitle, SideMenuLink, ModuleOptionsContainer, ToggleIndicator, SideMenuSubLevelLink, MenuItemSeparator, SubModuleHeader, SubModuleBackButton } from './styles';
/* ===== Styles ===== */

const Menu = ({ resetState }) => {

    const [listaOpcoesMenu, setListaOpcoesMenu] = useState([]);


    useEffect(() => {
        console.log("opções do menu", navigation);

        setListaOpcoesMenu(navigation);
    }, [listaOpcoesMenu]);

    useEffect(() => {
        setExibeSubmenu(false);
    }, [resetState])

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

    const [exibeSubmenu, setExibeSubmenu] = useState(false);

    const toggleSubmenu = () => {

        setExibeSubmenu(() => !exibeSubmenu);
    }

    return (

        <SideMenu>
            {exibeSubmenu ?

                (
                    <>
                        <SubModuleHeader>
                            <SubModuleBackButton onClick={() => { toggleSubmenu() }}>
                                <i className={`pi pi-arrow-left`}></i>
                            </SubModuleBackButton>                            
                            &nbsp; Relatórios / Financeiro
                        </SubModuleHeader>
                        <ModuleOptionsContainer exibir={true}>
                            <SideMenuLink to="/">
                                Contas a Receber
                            </SideMenuLink>

                            <MenuItemSeparator />

                            <SideMenuLink to="/">
                                Fluxo de Caixa
                            </SideMenuLink>
                        </ModuleOptionsContainer>
                    </>
                )
                :
                (
                    <>
                        <ModuleTitle ativo={false}>
                            <i className={`pi pi-home`}></i> 
                            &nbsp;Home
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={true}>
                            <i className={`pi pi-list`}></i> 
                            &nbsp;Relatórios
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-up`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>
                        <ModuleOptionsContainer exibir={true}>
                
                            <SideMenuSubLevelLink onClick={() => { toggleSubmenu() }}>
                                Financeiro
                                <ToggleIndicator>
                                    <i className="pi pi-chevron-right"></i>
                                </ToggleIndicator>
                            </SideMenuSubLevelLink>

                            <MenuItemSeparator />

                            <SideMenuSubLevelLink>
                                Vendas
                                <ToggleIndicator>
                                    <i className="pi pi-chevron-right"></i>
                                </ToggleIndicator>
                            </SideMenuSubLevelLink>

                            <MenuItemSeparator />

                            <SideMenuLink to="/">
                                Contábil
                            </SideMenuLink>
                        </ModuleOptionsContainer>

                        <ModuleTitle ativo={false}>
                            <i className={`pi pi-money-bill`}></i> 
                            &nbsp;Financeiro
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={false}>
                            <i className={`pi pi-shopping-cart`}></i> 
                            &nbsp;Vendas
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={false}>
                            <i className="pi pi-folder-open"></i> 
                            &nbsp;Cadastros
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>
                    </>    
                )
            }

        </SideMenu>        
            
    )
};

export default Menu;