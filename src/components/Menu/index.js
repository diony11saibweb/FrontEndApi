import React, { useState, useEffect, useRef, Fragment } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { navigation } from "./navigation";

import "./styles.css";

/* ===== Styles ===== */
import {
  SideMenuContainer,
  SideMenu,
  SideMenuSubLevelIndicator,
  SideMenuSubLevelButtonIndicator,
  ClickableBody,
  SideMenuSubLevel,
  ModuleTitle,
  ModuleOptionsContainer,
  ToggleIndicator,
  SideMenuSubLevelLink,
  SubModuleHeader,
  SubModuleHeaderTitle,
  SubModuleBackButton,
} from "./styles";
/* ===== Styles ===== */

const Menu = ({ exibeMenuProp, fechaMenuFn }) => {
  const [listaOpcoesMenu, setListaOpcoesMenu] = useState([]);
  const browserHistory = useHistory();
  const menuLinkRef = useRef(null);

  useEffect(() => {
    setListaOpcoesMenu(navigation);
  }, []);

  const [nivelAtualItemMenu, setNivelAtualItemMenu] = useState(null);
  const [moduloAtual, setModuloAtual] = useState(null);

  const toggleExibeOpcoes = (identificadorModulo) => {
    const opcaoMenuSelecionada = listaOpcoesMenu.find(
      (modulo) => modulo.identificador === identificadorModulo
    );

    setModuloAtual(opcaoMenuSelecionada);

    let tempListaOpcoes = [];

    listaOpcoesMenu.forEach((modulo) => {
      if (modulo.identificador === identificadorModulo) {
        modulo.ativo = !modulo.ativo;
      } else {
        modulo.ativo = false;
      }

      tempListaOpcoes.push(modulo);
    });

    setListaOpcoesMenu(tempListaOpcoes);
  };

  const [listaNiveisMenu, setListaNiveisMenu] = useState([]);

  const toggleSubnivelMenu = (itemMenu) => {
    setListaNiveisMenu((prevState) => [...prevState, itemMenu]);

    setNivelAtualItemMenu(itemMenu);
  };

  const recolheMenu = () => {
    fechaMenuFn();

    let tempListaOpcoes = [];

    listaOpcoesMenu.forEach((modulo) => {
      modulo.ativo = false;
      tempListaOpcoes.push(modulo);
    });

    setListaOpcoesMenu(tempListaOpcoes);
    setNivelAtualItemMenu(null);
    setListaNiveisMenu([]);
  };

  const redirecionarParaRota = (rota) => {
    // menuLinkRef.current.classList.add('lkink-active');
    recolheMenu();
    browserHistory.push(rota);
  };

  const voltarNivelMenu = (voltarParaRaiz = false) => {
    // pega o penúltimo item da lista e o transforma no nível atual
    const tempNivelAtual = listaNiveisMenu[listaNiveisMenu.length - 2];
    console.log("voltar nivel", tempNivelAtual);

    /* a flag voltarPraRaiz indica que o usuário deseja voltar para
     * a seleção de módulos. Caso não seja informada volta para o nível anterior
     */
    if (tempNivelAtual && !voltarParaRaiz) {
      // remove o ultimo item da lista de níveis
      const indexRemover = listaNiveisMenu.length - 1;
      const tempListaNiveis = listaNiveisMenu;
      tempListaNiveis.splice(indexRemover, 1);

      setListaNiveisMenu(tempListaNiveis);
      setNivelAtualItemMenu(tempNivelAtual);
    } else {
      // caso não tenha subníveis para voltar exibe os módulos
      setNivelAtualItemMenu(null);
      setListaNiveisMenu([]);
    }
  };

  const desenhaMenuPrincipalFn = (listaOpcoesMenu) => {
    let listaNiveisExibir = [...listaNiveisMenu] || [];
    listaNiveisExibir = listaNiveisExibir.reverse();

    console.log("desenha indicadores", listaNiveisMenu);

    if (!nivelAtualItemMenu) {
      return (
        <SideMenu>
          {listaOpcoesMenu.map((modulo) => (
            <Fragment key={modulo.titulo}>
              <ModuleTitle
                className="py-3 px-4 text-decoration-none"
                key={modulo.titulo}
                ativo={modulo.ativo}
                onClick={() => {
                  toggleExibeOpcoes(modulo.identificador);
                }}
              >
                <FontAwesomeIcon className="mr-2" icon={modulo.icone} />
                &nbsp;&nbsp;
                {modulo.titulo}
                <ToggleIndicator>
                  <i
                    className={
                      modulo.ativo ? `pi pi-chevron-up` : `pi pi-chevron-down`
                    }
                  ></i>
                </ToggleIndicator>
              </ModuleTitle>

              {modulo.ativo && (
                <ModuleOptionsContainer exibir={modulo.ativo}>
                  {modulo.itens.map((itemMenu) => (
                    <Fragment key={itemMenu.titulo}>
                      {itemMenu.subniveis.length > 0 ? (
                        <SideMenuSubLevelLink
                          className="py-3 px-4 text-decoration-none"
                          key={itemMenu.titulo}
                          onClick={() => {
                            toggleSubnivelMenu(itemMenu);
                          }}
                        >
                          <FontAwesomeIcon icon={itemMenu.icone} />
                          &nbsp;&nbsp;
                          {itemMenu.titulo}
                          <ToggleIndicator>
                            <i className="pi pi-chevron-right"></i>
                          </ToggleIndicator>
                        </SideMenuSubLevelLink>
                      ) : (
                        <SideMenuSubLevelLink
                          key={itemMenu.titulo}
                          className="py-3 px-4 text-decoration-none"
                          onClick={() => {
                            redirecionarParaRota(itemMenu.path);
                          }}
                        >
                          <FontAwesomeIcon icon={itemMenu.icone} />
                          &nbsp;&nbsp;
                          {itemMenu.titulo}
                        </SideMenuSubLevelLink>
                      )}
                    </Fragment>
                  ))}
                </ModuleOptionsContainer>
              )}
            </Fragment>
          ))}
        </SideMenu>
      );
    } else {
      return (
        <Fragment>
          <SideMenu>
            <SideMenuSubLevel>
              <SubModuleHeader className="py-3 px-4 text-decoration-none">
                <SubModuleBackButton
                  onClick={() => {
                    voltarNivelMenu();
                  }}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                </SubModuleBackButton>

                <SubModuleHeaderTitle className="py-3 px-4 text-decoration-none">
                  {nivelAtualItemMenu.titulo}
                </SubModuleHeaderTitle>
              </SubModuleHeader>

              {nivelAtualItemMenu && (
                <ModuleOptionsContainer exibir={true}>
                  {nivelAtualItemMenu.subniveis.map((subnivelItem) => (
                    <Fragment key={subnivelItem.titulo}>
                      {subnivelItem.subniveis &&
                      subnivelItem.subniveis.length > 0 ? (
                        <SideMenuSubLevelLink
                          className="py-3 px-4 text-decoration-none"
                          key={subnivelItem.titulo}
                          onClick={() => {
                            toggleSubnivelMenu(subnivelItem);
                          }}
                        >
                          <FontAwesomeIcon icon={subnivelItem.icone} />
                          &nbsp;&nbsp;
                          {subnivelItem.titulo}
                          <ToggleIndicator>
                            <i className="pi pi-chevron-right"></i>
                          </ToggleIndicator>
                        </SideMenuSubLevelLink>
                      ) : (
                        <SideMenuSubLevelLink
                          className="py-3 px-4 text-decoration-none"
                          key={subnivelItem.titulo}
                          onClick={() => {
                            redirecionarParaRota(subnivelItem.path);
                          }}
                        >
                          <FontAwesomeIcon icon={subnivelItem.icone} />
                          &nbsp;&nbsp;
                          {subnivelItem.titulo}
                        </SideMenuSubLevelLink>
                      )}
                    </Fragment>
                  ))}
                </ModuleOptionsContainer>
              )}
            </SideMenuSubLevel>
          </SideMenu>

          {listaNiveisExibir.map((nivelMenu) => {
            // Evita que seja exibido o identificador do nivel atual
            if (nivelAtualItemMenu.identificador !== nivelMenu.identificador) {
              return (
                <SideMenuSubLevelIndicator key={nivelMenu.identificador}>
                  <SubModuleHeader>
                    <SideMenuSubLevelButtonIndicator
                      onClick={() => {
                        voltarNivelMenu();
                      }}
                      data-for={nivelMenu.identificador}
                      data-tip={nivelMenu.titulo}
                      data-iscapture="true"
                      className="my-1"
                    >
                      <FontAwesomeIcon icon={nivelMenu.icone} />
                    </SideMenuSubLevelButtonIndicator>

                    <ReactTooltip
                      id={nivelMenu.identificador}
                      place="bottom"
                      type="info"
                      effect="solid"
                      multiline={false}
                    />
                  </SubModuleHeader>
                </SideMenuSubLevelIndicator>
              );
            }
            return null;
          })}

          {moduloAtual && nivelAtualItemMenu && (
            <SideMenuSubLevelIndicator>
              <SubModuleHeader>
                <SideMenuSubLevelButtonIndicator
                  onClick={() => {
                    voltarNivelMenu(true);
                  }}
                  data-for={moduloAtual.identificador}
                  data-tip={moduloAtual.titulo}
                  data-iscapture="true"
                  className="my-1"
                >
                  <i className="pi pi-home"></i>
                </SideMenuSubLevelButtonIndicator>

                <ReactTooltip
                  id={moduloAtual.identificador}
                  place="bottom"
                  type="info"
                  effect="solid"
                  multiline={false}
                />
              </SubModuleHeader>
            </SideMenuSubLevelIndicator>
          )}
        </Fragment>
      );
    }
  };

  return (
    <SideMenuContainer visible={exibeMenuProp}>
      {desenhaMenuPrincipalFn(listaOpcoesMenu)}

      <ClickableBody
        onClick={() => {
          recolheMenu();
        }}
      />
    </SideMenuContainer>
  );
};

export default Menu;
