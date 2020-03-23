import styled from 'styled-components';

export const InputContainer = styled.div`
    padding: 6px;
`;

export const FormLabel = styled.label`
    color: #9e9e9e;
    font-size: 14px;
    margin-right: 6px;
    font-weight: 600;
`;

export const FormInput = styled.input`
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #9e9e9e;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    /* width: 16rem; */
    width: ${props => props.inputWidth || 16}rem;

    &:focus {
        background-color: #fff;
        border: 1px solid #b196d0;
        outline: 0;
        box-shadow: 0 0 0 0.2rem #b196d0;
    }
`;