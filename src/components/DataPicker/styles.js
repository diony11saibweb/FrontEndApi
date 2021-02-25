import styled from "styled-components";

export const InputContainer = styled.div`
  padding: 6px;
  width: "100%";
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  color: #4e2a77;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const FormInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #cac8c8;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: #495057;
  background-color: #fff;
  /* width: 16rem; */
  width: ${(props) => props.inputWidth || 16}vw;

  &:focus {
    background-color: #fff;
    border: 1px solid #b196d0;
    outline: 0;
    box-shadow: 0 0 0 0.2rem #b196d0;
  }
`;
