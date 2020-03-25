import styled from 'styled-components';

export const BaseModal = styled.div`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    background-color: #fff;
    padding: 18px;
    border-radius: 6px;
    width: 80%;
    position: absolute;
    top: 38px;
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 18px;
    right: 16px;
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

