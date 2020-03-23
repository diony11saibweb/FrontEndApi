import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SideMenu = styled.div`
    padding: 10px 16px;
    background-color: #4e2a77 !important;
    height: 100%;
    border-radius: 0 6px  6px 0;
    box-shadow: 2px 4px 12px #9e9e9e;
`;

export const SectionTitle = styled.h3`
    color: #fff;
    opacity: 0.6;
`;

export const SideMenuLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #9e9e9e;
      font-weight: 600;
    }
`;
