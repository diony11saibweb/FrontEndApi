import styled, { keyframes } from "styled-components";
import { slideInDown, slideOutUp } from "react-animations";

const slideInEffect = keyframes`${slideInDown}`;
const slideOutEffect = keyframes`${slideOutUp}`;

export const BaseModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  animation: 0.6s ${(props) => (props.isOpen ? slideInEffect : slideOutEffect)};
`;

export const ModalContent = styled.div`
  background-color: #fafafa;
  border-radius: 6px;
  width: ${(props) => props.size};
  top: 12vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  float: right;
  top: 18px;
  right: 6px;
  font-size: 16px;
  background-color: transparent;
  color: #4e2a77;
  border: none;

  &:hover {
    background-color: #4e2a77;
    color: #fff;
    cursor: pointer;
  }
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  width: ${(props) => props.wd};
  height: auto;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #4e2a77;
  margin-bottom: 5px;
  justify-content: space-between;

  h1 {
    font-size: 22px;
    font-weight: 500;
    margin: 5px 0 0 10px;
    color: #4e2a77;
  }

  button {
    border: 0;
    background: none;
  }
`;

export const CModal = styled.div`
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  margin: 0 auto;
  padding: 10px 20px;
  background: #fafafa;
  border-radius: 6px;
`;
