import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip'

import { navigation } from './navigation';

import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faMoneyBillAlt, faShoppingCart, faHandHoldingUsd, faChartLine, faUserPlus, faTruck, faFileInvoiceDollar, faHome, faClipboard } from '@fortawesome/free-solid-svg-icons'

/* ===== Styles ===== */
import { SideMenuContainer, SideMenu, SideMenuSubLevelIndicator, SideMenuSubLevelButtonIndicator, ClickableBody, SideMenuSubLevel, ModuleTitle, SideMenuLink, ModuleOptionsContainer, ToggleIndicator, ToggleIndicatorLeft, SideMenuSubLevelLink, SubModuleHeader, SubModuleBackButton } from './styles';
/* ===== Styles ===== */

const Menu = ({ exibeMenuProp, fechaMenuFn }) => {

    const [listaOpcoesMenu, setListaOpcoesMenu] = useState([]);
    const browserHistory = useHistory();
    const menuLinkRef = useRef(null);

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

    const recolheMenu = () => {

        fechaMenuFn();
        voltarNivelMenu();

        setExibeMenuOptionsRelatorios(false);
        setExibeMenuOptionsCadastros(false);
    }

    const redirecionarParaRota = (rota) => {

        // menuLinkRef.current.classList.add('lkink-active');
        recolheMenu();
        browserHistory.push(rota);
    }


    const [exibeMenuPrincipal, setExibeMenuPrincipal] = useState(true);

    const [exibeSubmenuFinanceiro, setExibeSubmenuFinanceiro] = useState(false);

    const toggleSubmenuFinanceiro = () => {

        setExibeMenuPrincipal(() => !exibeMenuPrincipal);
        // setExibeSubmenuPrevisoes(() => !exibeSubmenuPrevisoes);

        setExibeSubmenuFinanceiro(() => !exibeSubmenuFinanceiro);
    }

    const [exibeSubmenuPrevisoes, setExibeSubmenuPrevisoes] = useState(false);

    const toggleSubmenuPrevisoes = () => {

        setExibeSubmenuFinanceiro(() => !exibeSubmenuFinanceiro);
        
        setExibeSubmenuPrevisoes(() => !exibeSubmenuPrevisoes);
    }

    

    const voltarNivelMenu = (nivel) => {

        
        if (nivel === "previsoes") {
            setExibeSubmenuPrevisoes(true);
            setExibeSubmenuFinanceiro(false);

        } else if (nivel === "financeiro") {
            setExibeSubmenuFinanceiro(true);
            setExibeSubmenuPrevisoes(false);

        } else {
            setExibeSubmenuFinanceiro(false);
            setExibeSubmenuPrevisoes(false);            

            setExibeMenuPrincipal(true);
        }
        
    }


    const [exibeMenuOptionsRelatorios, setExibeMenuOptionsRelatorios] = useState(false);

    const toggleMenuOptionsRelatorios = () => {

        setExibeMenuOptionsCadastros(false);
        setExibeMenuOptionsRelatorios(() => !exibeMenuOptionsRelatorios);
    }

    const [exibeMenuOptionsCadastros, setExibeMenuOptionsCadastros] = useState(false);

    const toggleMenuOptionsCadastros = () => {

        setExibeMenuOptionsRelatorios(false);
        setExibeMenuOptionsCadastros(() => !exibeMenuOptionsCadastros);
    }

    return (
        
        <SideMenuContainer visible={exibeMenuProp}>            
        
            <SideMenu>
            {exibeSubmenuFinanceiro &&

                (                    
                    <SideMenuSubLevel>
                    
                        <SubModuleHeader>
                            <SubModuleBackButton onClick={() => { toggleSubmenuFinanceiro() }}>
                                <i className={`pi pi-arrow-left`}></i>
                            </SubModuleBackButton>                            
                            Financeiro
                        </SubModuleHeader>
                        <ModuleOptionsContainer exibir={true}>
                            <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />&nbsp;&nbsp;
                                Contas a Receber
                            </SideMenuSubLevelLink>

                            <SideMenuSubLevelLink onClick={() => { toggleSubmenuPrevisoes() }}>
                                <FontAwesomeIcon icon={faChartLine} />&nbsp;&nbsp;
                                Previsões
                                <ToggleIndicator>
                                    <i className="pi pi-chevron-right"></i>
                                </ToggleIndicator>
                            </SideMenuSubLevelLink>
                        </ModuleOptionsContainer>

                    </SideMenuSubLevel>                    
                )  
            }

            {exibeSubmenuPrevisoes &&

                (                    
                    <SideMenuSubLevel>
                    
                        <SubModuleHeader>
                            <SubModuleBackButton onClick={() => { toggleSubmenuPrevisoes() }}>
                                <i className={`pi pi-arrow-left`}></i>
                            </SubModuleBackButton>                            
                            Previsões
                        </SubModuleHeader>
                        <ModuleOptionsContainer exibir={true}>
                            <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                Fluxo de Caixa
                            </SideMenuSubLevelLink>

                            <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                Cobranças Recorrentes
                            </SideMenuSubLevelLink>
                        </ModuleOptionsContainer>

                    </SideMenuSubLevel>                    
                )  
            }

            {exibeMenuPrincipal &&
            
                (
                    <>
                        <ModuleTitle ativo={false}>
                            <FontAwesomeIcon icon={faHome} />&nbsp;
                            Home
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={exibeMenuOptionsRelatorios} onClick={toggleMenuOptionsRelatorios}>
                            <FontAwesomeIcon icon={faChartBar} />&nbsp;
                            Relatórios
                            <ToggleIndicator>
                                <i className={exibeMenuOptionsRelatorios ? `pi pi-chevron-up` : `pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        {exibeMenuOptionsRelatorios &&
                        
                            (
                                <ModuleOptionsContainer exibir={true}>
                
                                    <SideMenuSubLevelLink onClick={() => { toggleSubmenuFinanceiro() }}>
                                        <FontAwesomeIcon icon={faMoneyBillAlt} />&nbsp;&nbsp;
                                        Financeiro
                                        <ToggleIndicator>
                                            <i className="pi pi-chevron-right"></i>
                                        </ToggleIndicator>
                                    </SideMenuSubLevelLink>

                                    <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                        <FontAwesomeIcon icon={faShoppingCart} />&nbsp;&nbsp;
                                        Vendas                                        
                                    </SideMenuSubLevelLink>

                                    <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                        <FontAwesomeIcon icon={faHandHoldingUsd} />&nbsp;&nbsp;
                                        Contábil
                                    </SideMenuSubLevelLink>
                                </ModuleOptionsContainer>
                            )

                        }                        

                        <ModuleTitle ativo={false}>
                            <FontAwesomeIcon icon={faMoneyBillAlt} />&nbsp;
                            Financeiro
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={false}>
                            <FontAwesomeIcon icon={faShoppingCart} />&nbsp;
                            Vendas
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>

                        <ModuleTitle ativo={exibeMenuOptionsCadastros} onClick={toggleMenuOptionsCadastros}>
                            <FontAwesomeIcon icon={faClipboard} />&nbsp;
                            Cadastros
                            <ToggleIndicator>
                                <i className={`pi pi-chevron-down`}></i>
                            </ToggleIndicator>
                        </ModuleTitle>


                        {exibeMenuOptionsCadastros &&
                        
                            (
                                <ModuleOptionsContainer exibir={true}>
                
                                    <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/clientes") }}>
                                        <FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;
                                        Cadastro de Clientes                                        
                                    </SideMenuSubLevelLink>

                                    <SideMenuSubLevelLink onClick={() => { redirecionarParaRota("/") }}>
                                        <FontAwesomeIcon icon={faTruck} />&nbsp;&nbsp;
                                        Cadastro de Fornecedores                                        
                                    </SideMenuSubLevelLink>
                                </ModuleOptionsContainer>
                            )

                        }

                    </>
                )    

            }

            </SideMenu>


            {exibeSubmenuFinanceiro &&

                (
                    <SideMenuSubLevelIndicator>
                        <SubModuleHeader>
                            <SideMenuSubLevelButtonIndicator
                             onClick={() => { voltarNivelMenu() }}
                             data-for="indicador-relatorios"
                             data-tip="Relatórios"
                             data-iscapture="true"
                            >
                                <FontAwesomeIcon icon={faChartBar} />
                            </SideMenuSubLevelButtonIndicator>

                            <ReactTooltip id="indicador-relatorios" place="bottom" type="info" effect="solid" multiline={false} />
                        </SubModuleHeader>
                    </SideMenuSubLevelIndicator>
                )

            }

            {exibeSubmenuPrevisoes &&

                (
                    <>

                        <SideMenuSubLevelIndicator>
                            <SubModuleHeader>
                                <SideMenuSubLevelButtonIndicator 
                                    onClick={() => { voltarNivelMenu("financeiro") }}
                                    data-for="indicador-financeiro"
                                    data-tip="Financeiro"
                                    data-iscapture="true"
                                >
                                    <FontAwesomeIcon icon={faMoneyBillAlt} />
                                </SideMenuSubLevelButtonIndicator>

                                <ReactTooltip id="indicador-financeiro" place="bottom" type="info" effect="solid" multiline={false} />                                                     
                            </SubModuleHeader>
                        </SideMenuSubLevelIndicator>

                        <SideMenuSubLevelIndicator>
                            <SubModuleHeader>
                                <SideMenuSubLevelButtonIndicator 
                                    onClick={() => { voltarNivelMenu() }}
                                    data-for="indicador-relatorios"
                                    data-tip="Relatórios"
                                    data-iscapture="true"
                                >
                                    <FontAwesomeIcon icon={faChartBar} />
                                </SideMenuSubLevelButtonIndicator> 

                                <ReactTooltip id="indicador-relatorios" place="bottom" type="info" effect="solid" multiline={false} />                                                     
                            </SubModuleHeader>
                        </SideMenuSubLevelIndicator>
                        
                    </> 

                )

            }            

            <ClickableBody onClick={() => { recolheMenu() }} />
        </SideMenuContainer>    
        
    )
};

export default Menu;