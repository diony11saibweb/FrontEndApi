import React, { useRef } from "react";

import {
  HeaderContainer,
  NavBar,
  NavBarButtonMenu,
  MenuIcon,
  NavbarLogo,
  NavbarOptionsContainer,
  NavbarOptionsCell,
  NavbarUserAvatar,
  NavbarUserName,
} from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from "react-router-dom";

import logo from "~/assets/logo.svg";
import SelectUnform from "~/components/SelectUnform";
import { Form } from "@unform/web";
import * as Yup from "yup";
import CustomButton from "~/components/CustomButton";
import { Container, Row, Col } from "react-bootstrap";

export default function Navbar({ toggleMenuFn }) {
  const formRef = useRef(null);
  let history = useHistory();

  const optionOneValues = [
    { value: "1", label: "Módulo" },
    { value: "2", label: "NF-e" },
  ];

  const optionTwoValues = [
    { value: "1", label: "Empresa" },
    { value: "2", label: "Saibweb" },
  ];

  const schema = Yup.object().shape({
    CLIE_TIPO: Yup.string().required("Selecione o Tipo Endereço"),
  });

  return (
    <HeaderContainer>
      <NavBar>
        <Container fluid>
          <Row>
            <Col xs={6} className="d-flex align-items-center">
              <NavBarButtonMenu
                className=" p-0 m-0 p-2 mt-2 mr-2"
                onClick={toggleMenuFn}
              >
                <MenuIcon />
                <MenuIcon />
                <MenuIcon />
              </NavBarButtonMenu>
              <NavbarLogo
                src={logo}
                style={{ width: "120px", marginLeft: "10px" }}
                alt="Saibweb Tecnologia"
                onClick={() => {
                  history.push("/");
                }}
              />
            </Col>
            <Col xs={6}>
              <Form ref={formRef}>
                <NavbarOptionsContainer className="d-flex justify-content-end">
                  <SelectUnform
                    name="optionOne"
                    optionsList={optionOneValues}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <SelectUnform
                    name="optionTwo"
                    optionsList={optionTwoValues}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <div className="pt-2">
                    <CustomButton
                      text="Entrar"
                      icon="sing-in"
                      className="mt-0"
                    ></CustomButton>
                  </div>
                </NavbarOptionsContainer>
              </Form>
            </Col>
          </Row>
        </Container>
      </NavBar>
    </HeaderContainer>
  );
}
