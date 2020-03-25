import styled from 'styled-components';

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 8px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SearchInput = styled.input`
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #9e9e9e;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;    
    width: 100%;
    text-transform: uppercase;

    &:focus {
        background-color: #fff;
        border: 1px solid #b196d0;
        outline: 0;
        box-shadow: 0 0 0 0.2rem #b196d0;
    }
`;

export const ResultsContainer = styled.div`
    width: 98%;
    padding: 8px;
    background-color: #ededed;
    color: #9e9e9e;
    font-weight: 600;
    font-size: 14px;
    border-radius: 0 0 8px 8px;
    box-shadow: 1px 3px 4px #9e9e9e;
`;

export const ResultsItem = styled.li`
    list-style-type: none;

    &:hover {
        color: #000;
        cursor: pointer;
    }
`;

export const CloseButtonContainer = styled.div`
    position: relative;
    top: 8px;
    right: 30px;  
`;

export const CloseButton = styled.span`
    color: red;

    &:hover {
        cursor: pointer;
    }
`;