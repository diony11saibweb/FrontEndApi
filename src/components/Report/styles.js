import styled from 'styled-components';

export const ReportContainerPage = styled.div`
    width: ${props => props.modoImpressao ? '210mm' : '100%'};
    height: ${props => props.singleMode ? '297mm' : 'auto'};
    background-color: #ededed;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-content: ${props => props.modoImpressao ? 'center' : 'flex-start'};
`;