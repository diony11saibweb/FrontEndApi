import styled from 'styled-components';

export const SelectContainer = styled.div`
    padding: 6px;
    display: flex;
    flex-direction: column;
    width: ${props => props.inputWidth || 16}vw;
`;

export const FormLabel = styled.label`
    color: #9e9e9e;
    font-size: 14px;
    margin-bottom: 6px;
    font-weight: 600;
`;

export const FormInput = styled.input`
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #9e9e9e;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    color: #495057;
    background-color: #fff;
    /* width: 16rem; */
    width: ${props => props.inputWidth || 16}vw;

    &:focus {
        background-color: #fff;
        border: 1px solid #b196d0;
        outline: 0;
        box-shadow: 0 0 0 0.2rem #b196d0;
    }
`;