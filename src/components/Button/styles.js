import styled from 'styled-components';

export const BaseButton = styled.button`
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 22px;
    outline: none;
    margin-right: 6px;
`;

export const DefaultButton = styled(BaseButton)`
    background-color: transparent;
    color: #4e2a77;
    border: 2px solid #4e2a77;    

    &:hover {
        background-color: #4e2a77;
        color: #fff;
        border: 2px solid #4e2a77;
        cursor: pointer;
    }
`;

export const PrimaryButton = styled(BaseButton)`
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