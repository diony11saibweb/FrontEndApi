import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import {
  slideInDown,
  slideOutUp,
  slideInLeft,
  fadeInLeft,
} from "react-animations";

/* ========== Animações ========== */
const slideInEffect = keyframes`${slideInDown}`;
const slideOutEffect = keyframes`${slideOutUp}`;
const slideInLeftEffect = keyframes`${slideInLeft}`;
const fadeInLeftEffect = keyframes`${fadeInLeft}`;
/* ========== Animações ========== */

export const SideMenuContainer = styled.aside`
  position: fixed;
  height: 100%;
  width: ${(props) => (props.visible ? "100%" : "0")};
  background-color: ${(props) =>
    props.visible ? "rgba(0,0,0,0.5)" : "transparent"};
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.4s;
  z-index: 200;
  display: flex;
`;

export const ClickableBody = styled.div`
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

export const SideMenu = styled.div`
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  padding: 0;
  background-color: #4e2a77 !important;
  height: 100%;
  width: 20rem;
`;

export const SideMenuSubLevel = styled.div`
  padding: 0;
  margin: 0;
  background-color: #4e2a77;
  height: 100%;
  width: 20rem;
  animation: 0.4s ${fadeInLeftEffect};
`;

export const SideMenuSubLevelIndicator = styled.div`
  padding: 0;
  background-color: #4e2a77 !important;
  height: 100%;
  width: 4rem;
  border-right: 2px solid #3d1d61;
  box-shadow: 2px 3px 4px #9e9e9e;
`;

export const SideMenuSubLevelButtonIndicator = styled.button`
  font-size: 18px;
  background-color: transparent;
  border: none;
  outline: 0;
  color: #fff;
  padding: 0 8px;
`;

export const ModuleOptionsContainer = styled.div`
  padding: 4px 0px 4px 20px;
  background-color: #402064;
  overflow: hidden;
  animation: 0.6s ${(props) => (props.exibir ? slideInEffect : slideOutEffect)};
`;

export const ModuleTitle = styled.a`
  color: #fff;
  width: 100%;
  padding: 10px 6px;
  border: 1px solid #4e2a77;
  background-color: ${(props) => (props.ativo ? "#3d1d61" : "#4e2a77")};
  font-size: 16px;
  display: block;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.ativo ? "#3d1d61" : "#402064")};
    border-color: #402064;
    color: #fff;
    cursor: pointer;
  }
`;

export const ToggleIndicator = styled.div`
  float: right;
  top: 10px;
  right: 4px;
`;

export const ToggleIndicatorLeft = styled.div`
  float: left;
  top: 10px;
  left: 2px;
  margin-right: 4px;
`;

export const SideMenuSubLevelLink = styled.a`
  color: ${(props) => (props.ativo ? "#b9b1b1" : "#fff")};
  width: 100%;
  padding: 12px 2px;
  /* background-color: #482d67; */
  font-size: 16px;
  display: block;

  &:hover {
    color: #b9b1b1;
    cursor: pointer;
  }
`;

export const SideMenuLink = styled(NavLink)`
  color: #fff;
  width: 100%;
  padding: 12px 6px;
  /* background-color: '#391b5b'; */
  font-size: 16px;
  display: block;
  text-decoration: none;

  &:hover {
    color: #9e9e9e;
    cursor: pointer;
  }
`;

export const SubModuleHeader = styled.div`
  color: #fff;
  width: 100%;
  padding: 12px 8px;
  background-color: #391b5b;
  font-size: 18px;
  display: block;
`;

export const SubModuleHeaderTitle = styled.span`
  width: 100%;
  font-size: 18px;
  color: #fff;
  margin-left: 8px;
`;

export const SubModuleBackButton = styled.button`
  float: left;
  top: 10px;
  left: 4px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  color: #fff;
  margin-right: 4px;
  outline: 0;

  &:hover {
    color: #9e9e9e;
    cursor: pointer;
  }
`;
