import React, { Fragment } from 'react';
import { Document } from "@react-pdf/renderer";

import { reportData } from './reportData';
/* ===== Styles ===== */
import { ReportContainer, TitleContainer, Title, Header, HeaderText, HeaderTextSubTitle, TenantLogo, TenantLogoContainer, HeaderTextContainer, PageHeaderContainer, PageHeaderTextBox, PageHeaderText, DetailsHeaderContainer, DetailsHeaderCell, DetailsText, DetailsContainer, DetailsLineSeparator } from './styles';

const imageSource = "saibweb-logo.png";

const Report = () => {

    return (
        <Document>            

            {reportData.map((item, index) => (

                <ReportContainer  key={index}>
                    
                    {index === 0 && 
                        (
                            <Fragment>
                                <Header>
                                    <TenantLogoContainer>
                                        <TenantLogo source={imageSource} />
                                    </TenantLogoContainer>
                                    <HeaderTextContainer>
                                        <HeaderText>Saibweb Tecnologia LTDA - C.N.P.J.: 15.005.689/001-14</HeaderText>
                                        <HeaderTextSubTitle>Data Inicial: 01/04/2020 - Data Final: 09/04/2020</HeaderTextSubTitle>
                                    </HeaderTextContainer>
                                </Header>
                                <TitleContainer>
                                    <Title>Clientes por Cidade</Title>
                                </TitleContainer>
                            </Fragment>
                        )
                    }
                    
                    <DetailsLineSeparator />
                    
                    <PageHeaderContainer>
                        <PageHeaderTextBox>
                            <PageHeaderText>Cidade: {item.cidade}</PageHeaderText>
                        </PageHeaderTextBox>
                        <PageHeaderTextBox>
                            <PageHeaderText>Clientes: {item.clientes.length}</PageHeaderText>
                        </PageHeaderTextBox>
                    </PageHeaderContainer>
                        
                    {item.clientes.map(cliente => (
                        <Fragment key={cliente.CLI_ID}>
                            
                            <DetailsHeaderContainer>
                                <DetailsHeaderCell>
                                    <DetailsText>
                                        Nome: {cliente.CLI_NOME} - C.P.F. / C.N.P.J.: {cliente.CLI_CNPJ_CPF}
                                    </DetailsText>
                                </DetailsHeaderCell>                    
                            </DetailsHeaderContainer>

                            {cliente.CLIENTE_E.map((e, index) => (
                                <Fragment key={index}>
                                    <DetailsContainer>
                                        <DetailsText>
                                            {`${e.CLIE_ENDERECO}, ${e.CLIE_BAIRRO} - ${e.CLIE_CIDADE}, ${e.CLIE_UF}`}
                                        </DetailsText>
                                    </DetailsContainer>

                                    {index < cliente.CLIENTE_E.length -1 &&
                                        (
                                            <DetailsLineSeparator />
                                        )
                                    }
                                </Fragment>
                                
                            ))}
                        </Fragment>
                    ))}
                    
                </ReportContainer>
                
            ))} 
            
        </Document>
    )
};

export default Report;