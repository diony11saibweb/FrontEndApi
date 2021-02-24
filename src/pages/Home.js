import React from "react";
import styled from "styled-components";
import logo from "~/assets/logo.svg";

import { PageContainer } from "~/styles/globalStyles";

const Page = styled(PageContainer)`
  border-radius: 10px;
  height: 60vh;

  h1 {
    color: #33333380;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 400;
  }
`;

const Home = () => {
  return (
    <Page className="container mt-4 d-flex align-items-center justify-content-center">
      <div>
        <h1>Olá Seja Bem-vindo,</h1>
        <img src={logo} />
      </div>
    </Page>
  );
};

export default Home;
