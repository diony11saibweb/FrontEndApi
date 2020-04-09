import React, { useState } from 'react';
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";

import Report from '~/components/Report';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
 
/* ===== Styles ===== */
import { PageContainer, GridOptionsBar, ModalBodyContainer, ModalBodyInner } from '~/styles/globalStyles';
import './styles.css';
/* ===== Styles ===== */

const reportStyles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "90vh",
    display: "flex"
  }
})

const reportData = [
    {
      nome: "PAULA FERREIRA DA SILVA 1",
      qtdParcelas: 1,
      valor: 850.00
    },
    {
      nome: "IGOR ARANTES DE CARVALHO 2",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "ANGELA MARQUES DE CASTRO 3",
      qtdParcelas: 3,
      valor: 2450.00
    },
    {
      nome: "ANDRESSA OLIVEIRA DE CASTRO 4",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "BRUNO RODRIGUES DOS SANTOS 5",
      qtdParcelas: 1,
      valor: 650.00
    },
    {
      nome: "ARTUR GOMES DA SILVA 6",
      qtdParcelas: 4,
      valor: 3870.45
    },
    {
      nome: "PAULA FERREIRA DA SILVA 7",
      qtdParcelas: 1,
      valor: 850.00
    },
    {
      nome: "IGOR ARANTES DE CARVALHO 8",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "ANGELA MARQUES DE CASTRO 9",
      qtdParcelas: 3,
      valor: 2450.00
    },
    {
      nome: "ANDRESSA OLIVEIRA DE CASTRO 10",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "BRUNO RODRIGUES DOS SANTOS 11",
      qtdParcelas: 1,
      valor: 650.00
    },
    {
      nome: "ARTUR GOMES DA SILVA 12",
      qtdParcelas: 4,
      valor: 3870.45
    },
    {
      nome: "PAULA FERREIRA DA SILVA 13",
      qtdParcelas: 1,
      valor: 850.00
    },
    {
      nome: "IGOR ARANTES DE CARVALHO 14",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "ANGELA MARQUES DE CASTRO 15",
      qtdParcelas: 3,
      valor: 2450.00
    },
    {
      nome: "ANDRESSA OLIVEIRA DE CASTRO 16",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "BRUNO RODRIGUES DOS SANTOS 17",
      qtdParcelas: 1,
      valor: 650.00
    },
    {
      nome: "ARTUR GOMES DA SILVA 18",
      qtdParcelas: 4,
      valor: 3870.45
    },
    {
      nome: "ANDRESSA OLIVEIRA DE CASTRO 19",
      qtdParcelas: 2,
      valor: 1630.87
    },
    {
      nome: "BRUNO RODRIGUES DOS SANTOS 20",
      qtdParcelas: 1,
      valor: 650.00
    },
    {
      nome: "ARTUR GOMES DA SILVA 21",
      qtdParcelas: 4,
      valor: 3870.45
    }
];

const RelatorioClientes = () => {

    const [visualizaImpressao, setVisualizaImpressao] = useState(false);

    // const desenhaRelatorioFn = (vizualizaModoImpressao) => {

    //     return (
    //         <ReportPage 
    //             id={vizualizaModoImpressao ? "clientes-inadimplentes-print" : "clientes-inadimplentes"} 
    //             visualizarImpressao={vizualizaModoImpressao}
    //         >
    //             <h3 style={{textAlign: 'center', marginBottom: 12}}>
    //                 Clientes Inadimplentes
    //             </h3>
    //             <div className="report-resume-container">
    //                 <span>
    //                     <strong>Data Inicial:</strong> 01/03/2020
    //                 </span>
    //                 <span>
    //                     <strong>Data Final:</strong> 07/03/2020
    //                 </span>
    //                 <span>
    //                     <strong>Total de Clientes:</strong> 21
    //                 </span>
    //             </div>

    //             <div className="report-details-header">
    //                 <div className="report-details-header-cell">
    //                     Nome Completo
    //                 </div>
    //                 <div className="report-details-header-cell">
    //                     Parcelas
    //                 </div>
    //                 <div className="report-details-header-cell">
    //                     Valor (RS)
    //                 </div>
    //             </div>

    //             {reportData.map(element => (
    //                 <div className="report-details-body"  key={element.nome}>
    //                     <div className="report-details-body-cell">
    //                     {element.nome}
    //                     </div>
    //                     <div className="report-details-body-cell">
    //                     {element.qtdParcelas}
    //                     </div>
    //                     <div className="report-details-body-cell">
    //                     {element.valor}
    //                     </div>
    //                 </div>
    //             ))}
    //         </ReportPage>
    //     )
    // }

    return (
        <PageContainer>
            <PDFViewer style={reportStyles.pdfViewer} children={<Report />} />
        </PageContainer>
    )
};

export default RelatorioClientes;