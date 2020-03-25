import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SideMenu = styled.div`
    padding: 0;
    background-color: #4e2a77 !important;
    height: 100%;
    border-radius: 0 6px  6px 0;
    box-shadow: 2px 4px 12px #9e9e9e;
`;

export const ModuleTitle = styled.button`
    color: #fff;
    width: 100%;    
    padding: 10px 0;
    border: 1px solid #4e2a77;
    background-color: ${props => props.exibir ? '#391b5b' : '#4e2a77'};
    font-size: 16px;

    &:hover {
        background-color: ${props => props.exibir ? '#391b5b' : '#402064'};
        border-color: #402064;
        cursor: pointer;
    }
`;

export const ModuleOptionsContainer = styled.div`
    padding: 10px 0px 10px 20px;
    background-color: #402064;
    display: ${props => props.exibir ? 'block' : 'none'};
    overflow: hidden;
`;

export const SideMenuLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #9e9e9e;
    }
`;
