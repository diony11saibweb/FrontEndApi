import styled from "styled-components";

export const BaseButton = styled.button`
  /* reset */
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
`;

export const DefaultButton = styled(BaseButton)`
  /* custom */
  width: 100%;
  margin-top: 5px;
  display: inline-block;
  position: relative;
  padding: 6px 12px;
  top: 0;
  font-size: 16px;
  font-family: "Open Sans", Helvetica;
  border-radius: 5px;
  border-bottom: 1px solid rgba(78, 42, 119, 0.5);
  background: rgba(78, 42, 119, 1);
  color: #fff;
  box-shadow: 0px 0px 0px rgba(78, 42, 119, 0.1);

  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -ms-transition: all 0.2s ease;
  transition: all 0.2s ease;

  &:hover {
    top: -10px;
    box-shadow: 0px 10px 10px rgba(78, 42, 119, 0.2);

    -webkit-transform: rotateX(20deg);
    -moz-transform: rotateX(20deg);
    -ms-transform: rotateX(20deg);
    transform: rotateX(20deg);
  }

  &:active {
    top: 0px;
    box-shadow: 0px 0px 0px rgba(78, 42, 119, 0);
    background: rgba(20, 224, 133, 1);
  }
`;

export const PrimaryButton = styled(BaseButton)`
  width: 100%;
  background-color: #4e2a77;
  color: #fff;
  border: 2px solid #4e2a77;

  &:hover {
    background-color: #4e2a77;
    color: #fff;
    border: 2px solid #4e2a77;
    cursor: pointer;
  }
`;

export const GridButton = styled(DefaultButton)`
  width: 100%;
  padding: 4px 10px;
  margin-right: 4px;
  border: none;

  &:hover {
    background-color: #4e2a77;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;
