import React from 'react';

import { ReportContainerPage } from './styles';

const ReportContainer = ({children, singleMode, visualizarImpressao, id}) => (
    <ReportContainerPage singleMode={singleMode} modoImpressao={visualizarImpressao} id={id} >
        {children}
    </ReportContainerPage>
); 

export default ReportContainer;