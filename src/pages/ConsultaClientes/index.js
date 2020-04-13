import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'


/* ===== Styles ===== */
import { PageContainer, ModalHalfBordered, ModalHalfNoBorder, ModalReportTitleContainer, ModalReportTitle, PageTitle, PageTitleContainer, GridOptionsBar, ModalBodyContainer, ModalBodyInner } from '~/styles/globalStyles';
import { ModalPersonalInfoRow } from './styles';
/* ===== Styles ===== */

import '~/index.css';
import Button from '~/components/Button';
import Utils from '~/utils/utils';
import GridTexts from '~/utils/gridTexts';
import Modal from '~/components/Modal';
import Api from '~/utils/Api';
import TypeSearch from '~/components/TypeSearch';

const ConsultaClientes = () => {

    const [clientesList, setClientesList] = useState([]);
    const browserHistory = useHistory();
    const [gridInstance, setGridInstance] = useState({ api: {}, columnApi: {} });
    const { addToast } = useToasts();

    useEffect(() => {

        async function obterListaClientes() {

            try {
                const clientesApi = new Api();
                const returnApi = await clientesApi.ObterTodosOsClientes();
                setClientesList(returnApi);  
                console.log("Lista de clientes", returnApi);              

            } catch (err) {
                console.log(err);
            }
        }

        setTimeout(() => {
            obterListaClientes();
        }, 300);

    }, []);

    /* Define propriedades das colundas da grid de clientes.
     * field: propriedade do objeto que deve ser exibido em tela
     * headerName: título da coluna
     * checkboxSelectionn: exibe um checkbox que é marcado de acordo com a seleção de linha
     * width: largura da coluna em pixels
     * lockVisible: impede que a coluna seja removida
     * sortable: permite que a coluna seja ordenável
     * filter: permite filtrar valores da coluna
     * resizable: permite redimencionar a largura da coluna
     * valueFormatter: função que permite formatar os valores da coluna
    */
    const columnDefs = [
        { field: "CLI_ID", headerName: "ID", checkboxSelection: true, width: 100, lockVisible: true },
        { field: "CLI_NOME", headerName: "Nome", sortable: true, filter: true, resizable: true},
        { field: "CLI_CNPJ_CPF", headerName: "C.P.F. / C.N.P.J.", filter: true, resizable: true, valueFormatter: Utils.GridCpfCnpjFormatter },
        { field: "CLI_FONE", headerName: "Telefone", filter: true, resizable: true },
        { field: "CLI_DATACAD", headerName: "Data Cadastro", sortable: true, resizable: true, valueFormatter: Utils.GridDateFormatter },
        { field: "CLI_DATANASC", headerName: "Data Nascimento", sortable: true, resizable: true, valueFormatter: Utils.GridDateFormatter  }        
    ];   

    const onGridReady = (params) => {
              
        /* obtem acesso às APIs da Ag-grid */
        setGridInstance({ api: params.api, columnApi: params.columnApi });
    }

    /* estiliza as linhas da grid dinamicamente */
    const estilizaLinhaGrid = (params) => {

        if (params.data.CLI_NOME === "PEDRO AUGUSTO DE OLIVEIRA") {
            return {background: 'red', color: '#fff'};
        }
    }

    const [exibeDadosCliente, setExibeDadosCliente] = useState(false);
    const [exibeConsultaClientes, setExibeConsultaClientes] = useState(false); 
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const novoCadastro = () => {
        browserHistory.push("/clientes/form");
        
    }    

    const abrirCadastro = () => {

        /* obtem as linhas selecionadas (grid node) através da API da Ag-grid */
        const selecaoGrid = gridInstance.api.getSelectedNodes();

        if (selecaoGrid === null || selecaoGrid === undefined || selecaoGrid.length === 0){
            addToast("Nenhum cliente foi selecionado!", { appearance: 'error' })
            return;
        }

        setClienteSelecionado(selecaoGrid[0].data);
        console.log('grid selectin', selecaoGrid[0].data);       

        setExibeDadosCliente(true);
    }

    const filtrarClientes = () => {
        setExibeConsultaClientes(true);
    }

    const alterarCadastro = () => {

        const selecaoGrid = gridInstance.api.getSelectedNodes();

        if (selecaoGrid === null || selecaoGrid === undefined || selecaoGrid.length === 0){
            addToast("Nenhum cliente foi selecionado!", { appearance: 'error' })
            return;
        }

        if (exibeConsultaClientes) {
            setExibeConsultaClientes(false)
        }

        browserHistory.push("/clientes/form", selecaoGrid[0].data);

    }

    const fecharModalDadosClientes = () => {
        
        // Se o modal foi aberto pela consulta de clientes deve remover o cliente selecionado
        if (clientePesquisado) {
            setClientePesquisado(null);
            setClienteSelecionado(null);
        }
        setExibeDadosCliente(false);
    }

    const modalGridcolumnDefs = [
        { field: "CLIE_TIPO", headerName: "Tipo", width: 60},
        { field: "CLIE_CEP", headerName: "CEP", resizable: true, width: 100},
        { field: "CLIE_ENDERECO", headerName: "Logradouro", resizable: true },
        { field: "CLIE_BAIRRO", headerName: "Bairro", resizable: true },
        { field: "CLIE_CIDADE", headerName: "Cidade", resizable: true}
    ];

    const [clientePesquisado, setClientePesquisado] = useState(null);

    const obterClientePesquisado = (cliente) => {
        
        setClientePesquisado(cliente);
    }

    const abrirCadastroClientePesquisado = () => {

        if (clientePesquisado === null || clientePesquisado === undefined){
            addToast("Nenhum cliente foi selecionado!", { appearance: 'error' })
            return;
        }

        setClienteSelecionado(clientePesquisado);
        setExibeConsultaClientes(false);
        setExibeDadosCliente(true);
    }

    const alterarCadastroClientePesquisado = () => {

        if (clientePesquisado === null || clientePesquisado === undefined){
            addToast("Nenhum cliente foi selecionado!", { appearance: 'error' })
            return;
        }
        
        setExibeConsultaClientes(false);
        browserHistory.push("/clientes/form", clientePesquisado);
    }

    return (
        
        <PageContainer>
            <PageTitleContainer>
                <PageTitle>Cadastro de Clientes</PageTitle>
            </PageTitleContainer>

            <GridOptionsBar>
                <Button text="Novo Cliente" icon="plus-circle" action={novoCadastro} />
                <Button text="Visualizar Informações" icon="external-link-alt" action={abrirCadastro} />
                <Button text="Alterar Cadastro" icon="edit" action={alterarCadastro} />
                <Button text="Pesquisar Cliente" icon="search" action={filtrarClientes} />
            </GridOptionsBar>
            
            {/* Sempre é necessário envolver o componente de grid em uma div contendo
              * o nome da classe referente ao tema que se deseja usar.
              * columnDefs: efine o nome das colunas e as propriedades que devem ser exibidas
              * rowData: a lista de itens que devem ser exibidos na grid
              * rowSelection: modo de seleção, podendo ser 'single' ou 'multiple'
              * onGridReady: função que é executada assim que o componente é executado
              * gridOptions: opções diversas (está sendo usado para traduzir textos da grid)
              * getRowStyle: função que estiliza as linhas da grid de forma dinâmica
            */}
            <div className="ag-theme-balham" style={{ height: '65vh', width: '100%' }} >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={clientesList}
                    rowSelection="single"
                    animateRows
                    onGridReady={onGridReady}
                    gridOptions={{localeText: GridTexts}}
                    getRowStyle={estilizaLinhaGrid}
                >
                </AgGridReact>
            </div>

            {exibeDadosCliente && 
                (
                    <Modal fechaModalFunc={() => { fecharModalDadosClientes() }} titulo="Dados do Cliente">
                        <ModalBodyContainer>
                            <ModalHalfBordered>
                                
                                <ModalReportTitleContainer>
                                    <ModalReportTitle>Dados Pessoais</ModalReportTitle>                                    
                                </ModalReportTitleContainer>

                                <ModalPersonalInfoRow>
                                    Nome: <strong>{clienteSelecionado.CLI_NOME}</strong>
                                </ModalPersonalInfoRow>
                                <ModalPersonalInfoRow>
                                    C.P.F. / C.N.P.J.: <strong>{Utils.CpfCnpjFormatter(clienteSelecionado.CLI_CNPJ_CPF)}</strong>
                                </ModalPersonalInfoRow>
                                <ModalPersonalInfoRow>
                                    Data Nascimento: <strong>{Utils.DateFormatter(clienteSelecionado.CLI_DATANASC)}</strong>
                                </ModalPersonalInfoRow>
                                <ModalPersonalInfoRow>
                                    Telefone: <strong>{clienteSelecionado.CLI_FONE}</strong>
                                </ModalPersonalInfoRow>

                            </ModalHalfBordered>
                            <ModalHalfNoBorder>
                                
                                <ModalReportTitleContainer>
                                    <ModalReportTitle>Endereços</ModalReportTitle>
                                </ModalReportTitleContainer>

                                <div className="ag-theme-balham" style={{ height: '30vh', width: '100%' }} >
                                    <AgGridReact
                                        columnDefs={modalGridcolumnDefs}
                                        rowData={clienteSelecionado.CLIENTE_E}
                                        animateRows
                                        gridOptions={{localeText: GridTexts}}
                                    >
                                    </AgGridReact>
                                </div>

                            </ModalHalfNoBorder>
                        </ModalBodyContainer>
                    </Modal>
                )
            }


            {exibeConsultaClientes && 
                (
                    <Modal fechaModalFunc={() => { setExibeConsultaClientes(false) }} titulo="Consultar clientes">
                        <ModalBodyContainer>
                            <ModalBodyInner>

                                {clientePesquisado &&
                                    (
                                        <GridOptionsBar>
                                            <Button text="Visualizar Informações" icon="external-link-alt" action={abrirCadastroClientePesquisado} />
                                            <Button text="Alterar Cadastro" icon="edit" action={alterarCadastroClientePesquisado} />
                                        </GridOptionsBar>
                                    )
                                }                                

                                <TypeSearch retornaResultadoFn={obterClientePesquisado} tipoPesquisa="GET_CLIENTES"/>

                            </ModalBodyInner>
                        </ModalBodyContainer>
                    </Modal>
                )
            }
            
        </PageContainer>
    )
};

export default ConsultaClientes;