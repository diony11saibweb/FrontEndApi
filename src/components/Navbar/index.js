import React, { useRef } from "react";

import {
  HeaderContainer,
  NavBar,
  NavBarButtonMenu,
  NavbarLogo,
  NavbarOptionsContainer,
  NavbarOptionsCell,
  NavbarUserAvatar,
  NavbarUserName,
} from "./styles";

import { useHistory } from "react-router-dom";

import logo from "~/assets/logo.svg";
import { Row, Col } from "react-bootstrap";
import SelectUnform from "~/components/SelectUnform";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Button from "~/components/Button";

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
        <Row>
          <Col xs={6} className="">
            <NavBarButtonMenu
              className=" p-0 m-0 p-2 mt-2 align-bottom"
              onClick={toggleMenuFn}
            >
              <i
                className="pi pi-bars p-0 m-0"
                style={{ fontSize: "28px", color: "#4e2a77" }}
              ></i>
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
            <div>
              <Form ref={formRef}>
                <NavbarOptionsContainer className="d-flex justify-content-end">
                  <SelectUnform
                    name="optionOne"
                    width={15}
                    optionsList={optionOneValues}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <SelectUnform
                    name="optionTwo"
                    width={15}
                    optionsList={optionTwoValues}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <div className="pt-2">
                    <Button text="Entrar" icon="sing-in" />
                  </div>
                </NavbarOptionsContainer>
              </Form>
            </div>
          </Col>
        </Row>
      </NavBar>
    </HeaderContainer>
  );
}
