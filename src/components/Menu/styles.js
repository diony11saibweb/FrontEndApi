import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { slideInDown, slideOutUp } from "react-animations";

export const SideMenu = styled.div`
    padding: 0;
    background-color: #4e2a77 !important;
    height: 100%;
    border-radius: 0 6px  6px 0;
    box-shadow: 2px 4px 12px #9e9e9e;
`;

export const ModuleTitle = styled.a`
    color: #fff;
    width: 100%;    
    padding: 10px 6px;
    border: 1px solid #4e2a77;
    background-color: ${props => props.ativo ? '#391b5b' : '#4e2a77'};
    font-size: 16px;
    display: block;
    width: 100%;

    &:hover {
        background-color: ${props => props.ativo ? '#391b5b' : '#402064'};
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

const slideInEffect = keyframes`${slideInDown}`;
const slideOutEffect = keyframes`${slideOutUp}`;

export const ModuleOptionsContainer = styled.div`
    padding: 10px 0px 10px 20px;
    background-color: #402064;    
    overflow: hidden;
    animation: 0.6s ${props => props.exibir ? slideInEffect : slideOutEffect}
`;

export const SideMenuLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #9e9e9e;
    }
`;
