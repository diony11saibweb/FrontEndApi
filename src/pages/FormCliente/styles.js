import { styled } from 'styled-components';
import { PageTitleContainer, PageTitle } from './../../styles/PageTitleContainer';

export const PageBodyContainer = styled.section`
    display: flex;
    flex-direction: column;
    border: 1px solid #ededed;
    border-radius: 4px;
`;

export const PageSectionInfo = styled.div`
    width: 100%;
    padding: 8px;
`;

export const PageSectionAddress = styled(PageSectionInfo)`
    border: none;
`;

export const PageFormTitleContainer = styled(PageTitleContainer)`
    color: #9e9e9e;
    border-bottom: 1px solid #9e9e9e;
`;

export const PageFormTitle = styled(PageTitle)`
    font-size: 16px;
    color: #9e9e9e;
`;

export const PageFormBodyContainer = styled.div`
    display: flex;
    padding: 6px;
`;

export const FormButton = styled.button`
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 22px;
    outline: none;
    margin-right: 6px;
    background-color: transparent;
    color: #4e2a77;
    border: 2px solid #4e2a77;    

    &:hover {
        background-color: #4e2a77;
        color: #fff;
        border: 2px solid #4e2a77;
        cursor: pointer;
    }
    margin: 0 0 10px 8px; 
`;

export const ModalFormButton = styled(FormButton)`
    margin-top: 12px;
`;