import React from "react";

import ModalContainer from "./ModalContainer";
// import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* ======== Styles ========== */
import {
  BaseModal,
  ModalContent,
  ModalCloseButton,
  TitleBar,
  CModal,
} from "./styles";

import { Container, Row, Col } from "react-bootstrap";

/* ======== Styles ========== */

const Modal = ({ isOpen, closeDialogFn, title, size, children }) => {
  const getDialogSize = () => {
    let dialogSize = "32%";

    switch (size) {
      case "sm":
        dialogSize = "32%";
        break;
      case "md":
        dialogSize = "50%";
        break;
      case "lg":
        dialogSize = "80%";
        break;

      default:
        break;
    }
    return dialogSize;
  };

  return (
    <ModalContainer>
      <BaseModal isOpen={isOpen}>
        <Container>
          <ModalContent size={getDialogSize}>
            <TitleBar wd="100%">
              <Row className="w-100 justify-content-between">
                <Col sm={11}>
                  <h1>{title}</h1>
                </Col>
                <Col
                  sm={1}
                  className="p-0 m-0"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button type="button" onClick={closeDialogFn}>
                    <FontAwesomeIcon icon="times" color="#61098a" />
                  </button>
                </Col>
              </Row>
            </TitleBar>

            <CModal wd="100%">{children}</CModal>
          </ModalContent>
        </Container>
      </BaseModal>
    </ModalContainer>
  );
};

export default Modal;
