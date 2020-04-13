import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 8vh;
  
`;

export const NavBar = styled.nav`
  padding: 6px 20px 0 20px;
  height: 100%;
  width: 100%;
  background-color: #ececec;
`;

export const NavBarButtonMenu = styled.button`
  padding: 2px;
  margin-right: 10px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

export const NavbarLogo = styled.img`
  width: 80px;
`;

export const NavbarOptionsContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 28px;
  width: 600px;
  height: 6vh;
  /* background-color: #349e45; */
  display: flex;
  flex-direction: row;
`;

export const NavbarOptionsCell = styled.div`
  width: 33.33%;
  padding: 0 2px;
  display: flex;
`;

export const NavbarUserAvatar = styled.div`
  width: 40px;
  height: 6vh;
  border-radius: 50%;
  border: 1px solid #d9d7d7;
  box-shadow: 2px 4px 8px #d9d7d7;
  background-image: url('https://avatars3.githubusercontent.com/u/8881422?s=460&u=556988fc43256221e43e865ed8b4f35c29638eb9&v=4');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 10px;
`;

export const NavbarUserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #9e9e9e;
  margin-top: 10px;
`;