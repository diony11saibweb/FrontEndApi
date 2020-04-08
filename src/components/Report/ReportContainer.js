import React from 'react';

import { ReportContainerPage } from './styles';

const ReportContainer = ({children, visualizarImpressao, id}) => (
    <ReportContainerPage modoImpressao={visualizarImpressao} id={id} >
        {children}
    </ReportContainerPage>
); 

export default ReportContainer;