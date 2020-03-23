import styled from 'styled-components';
import { PageTitle, PageTitleContainer } from '../../styles/globalStyles';

export const ModalBodyContainer = styled.section`
    display: flex;
    flex-direction: row;
    border: 1px solid #ededed;
    border-radius: 4px;
`;

export const ModalReportSectionInfo = styled.div`
    width: 50%;
    border-right: 1px solid #ededed;
    padding: 8px;
`;

export const ModalReportSectionAddress = styled(ModalReportSectionInfo)`
    border: none;
`;

export const ModalReportTitleContainer = styled(PageTitleContainer)`
    color: #9e9e9e;
    border-bottom: 1px solid #9e9e9e;
`;

export const ModalReportTitle = styled(PageTitle)`
    font-size: 16px;
    color: #9e9e9e;
`;

export const ModalPersonalInfoRow = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    color: #9e9e9e;
`;