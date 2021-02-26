import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import "~/index.css";
import CustomButton from "~/components/CustomButton";
import Utils from "~/utils/utils";
import GridTexts from "~/utils/gridTexts";
import Modal from "~/components/Modal";
import Api from "~/utils/Api";
import TypeSearch from "~/components/TypeSearch";
import {
  nameMaskLabel,
  cpfOrCnpjMaskLabel,
  phoneMaskLabel,
  cepMaskLabel,
  ufMaskLabel,
} from "~/utils/maskLabel";

import { nameMask } from "~/utils/maskInput";

import { Form } from "@unform/web";

import Input from "~/components/Input";

/* ===== Styles ===== */
import {
  PageContainer,
  ModalHalfBordered,
  ModalHalfNoBorder,
  ModalReportTitleContainer,
  ModalReportTitle,
  PageTitle,
  PageTitleContainer,
  GridOptionsBar,
  ModalBodyContainer,
  ModalBodyInner,
} from "~/styles/globalStyles";
import { ModalPersonalInfoRow } from "./styles";
/* ===== Styles ===== */

/* ========= Styles =========== */

const PageBodyContainer = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 4px;
  padding: 6px;
`;

const PageSectionInfo = styled.div`
  width: 100%;
  padding: 8px;
`;

const PageSectionAddress = styled(PageSectionInfo)`
  border: none;
`;

const PageFormTitleContainer = styled(PageTitleContainer)`
  color: #9e9e9e;
  border-bottom: 1px solid #9e9e9e;
`;

const PageFormTitle = styled(PageTitle)`
  font-size: 16px;
  color: #9e9e9e;
`;

const PageFormBodyContainer = styled.div`
  display: flex;
  padding: 6px;
`;

const FormButton = styled.button`
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

const ModalFormButton = styled(FormButton)`
  margin-top: 12px;
`;
/* ========= End Styles =========== */

const ConsultaClientes = () => {
  const [clientesList, setClientesList] = useState([]);
  const browserHistory = useHistory();
  const [gridInstance, setGridInstance] = useState({ api: {}, columnApi: {} });
  const { addToast } = useToasts();
  const modalFormRef = useRef(null);

  const modalFormSearchRef = useRef(null);
  const [visibilityModal, setVisibilityModal] = useState(false);
  const [surveyedCustomers, setSurveyedCustomers] = useState([]);

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
    {
      field: "CLI_ID",
      headerName: "ID",
      checkboxSelection: true,
      width: 100,
      lockVisible: true,
    },
    {
      field: "CLI_NOME",
      headerName: "Nome",
      sortable: true,
      filter: true,
      resizable: true,
      valueFormatter: Utils.NameFormatter,
    },
    {
      field: "CLI_CNPJ_CPF",
      headerName: "C.P.F. / C.N.P.J.",
      filter: true,
      resizable: true,
      valueFormatter: Utils.GridCpfCnpjFormatter,
    },
    {
      field: "CLI_FONE",
      headerName: "Telefone",
      filter: true,
      resizable: true,
      valueFormatter: Utils.PhoneFormatter,
    },
    {
      field: "CLI_DATACAD",
      headerName: "Data Cadastro",
      sortable: true,
      resizable: true,
      valueFormatter: Utils.GridDateFormatterCad,
    },
    {
      field: "CLI_DATANASC",
      headerName: "Data Nascimento",
      sortable: true,
      resizable: true,
      valueFormatter: Utils.GridDateFormatterNasc,
    },
  ];

  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
  };

  /* estiliza as linhas da grid dinamicamente */
  const estilizaLinhaGrid = (params) => {
    if (params.data.CLI_ID === 99) {
      return { background: "#4e2a77", color: "#fff" };
    }
  };

  const [exibeDadosCliente, setExibeDadosCliente] = useState(false);
  const [exibeConsultaClientes, setExibeConsultaClientes] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const novoCadastro = () => {
    browserHistory.push("/clientes/form");
  };

  const abrirCadastro = () => {
    /* obtem as linhas selecionadas (grid node) através da API da Ag-grid */
    const selecaoGrid = gridInstance.api.getSelectedNodes();

    if (
      selecaoGrid === null ||
      selecaoGrid === undefined ||
      selecaoGrid.length === 0
    ) {
      addToast("Nenhum cliente foi selecionado!", { appearance: "error" });
      return;
    }

    setClienteSelecionado(selecaoGrid[0].data);
    console.log("grid selectin", selecaoGrid[0].data);
    setExibeDadosCliente(true);
  };

  console.log(exibeDadosCliente);

  const filtrarClientes = () => {
    setExibeConsultaClientes(true);
  };

  const alterarCadastro = () => {
    const selecaoGrid = gridInstance.api.getSelectedNodes();

    if (
      selecaoGrid === null ||
      selecaoGrid === undefined ||
      selecaoGrid.length === 0
    ) {
      addToast("Nenhum cliente foi selecionado!", { appearance: "error" });
      return;
    }

    if (exibeConsultaClientes) {
      setExibeConsultaClientes(false);
    }

    browserHistory.push("/clientes/form", selecaoGrid[0].data);
  };

  const fecharModalDadosClientes = () => {
    // Se o modal foi aberto pela consulta de clientes deve remover o cliente selecionado
    if (clientePesquisado) {
      setClientePesquisado(null);
      setClienteSelecionado(null);
    }
    setExibeDadosCliente(false);
  };

  const modalGridcolumnDefs = [
    { field: "CLIE_TIPO", headerName: "Tipo", width: 60 },
    { field: "CLIE_CEP", headerName: "CEP", resizable: true, width: 100 },
    { field: "CLIE_ENDERECO", headerName: "Logradouro", resizable: true },
    { field: "CLIE_BAIRRO", headerName: "Bairro", resizable: true },
    { field: "CLIE_CIDADE", headerName: "Cidade", resizable: true },
  ];

  const [clientePesquisado, setClientePesquisado] = useState(null);

  const obterClientePesquisado = (cliente) => {
    console.log("Cliente Selecionado");
    setClientePesquisado(cliente);
  };

  const abrirCadastroClientePesquisado = () => {
    if (clientePesquisado === null || clientePesquisado === undefined) {
      addToast("Nenhum cliente foi selecionado!", { appearance: "error" });
      return;
    }

    setClienteSelecionado(clientePesquisado);
    setExibeConsultaClientes(false);
    setExibeDadosCliente(true);
  };

  const customerCurveyedSelected = (id) => {
    const x = surveyedCustomers.find((item) => {
      if (item.CLI_ID == id) {
        return item;
      }
    });

    browserHistory.push("/clientes/form", x);
  };

  useEffect(() => {
    console.log(clientePesquisado);
  });

  const alterarCadastroClientePesquisado = () => {
    if (clientePesquisado === null || clientePesquisado === undefined) {
      addToast("Nenhum cliente foi selecionado!", { appearance: "error" });
      return;
    }

    setExibeConsultaClientes(false);
    browserHistory.push("/clientes/form", clientePesquisado);
  };

  return (
    <PageContainer>
      <PageTitleContainer>
        <Container fluid>
          <Row>
            <Col md={6}>
              <PageTitle>Cadastro de Clientes</PageTitle>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <Row>
                <Col sm={6} className="align-items-stretch">
                  <CustomButton
                    text="Novo Cliente"
                    icon="plus-circle"
                    action={novoCadastro}
                  />
                  <CustomButton
                    text="Visualizar Informações"
                    icon="external-link-alt"
                    action={abrirCadastro}
                  />
                </Col>
                <Col sm={6} className="align-items-stretch">
                  <CustomButton
                    text="Alterar Cadastro"
                    icon="edit"
                    action={alterarCadastro}
                  />
                  <CustomButton
                    text="Pesquisar Cliente"
                    icon="search"
                    action={() => {
                      setVisibilityModal(true);
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </PageTitleContainer>

      {/* Sempre é necessário envolver o componente de grid em uma div contendo
       * o nome da classe referente ao tema que se deseja usar.
       * columnDefs: efine o nome das colunas e as propriedades que devem ser exibidas
       * rowData: a lista de itens que devem ser exibidos na grid
       * rowSelection: modo de seleção, podendo ser 'single' ou 'multiple'
       * onGridReady: função que é executada assim que o componente é executado
       * gridOptions: opções diversas (está sendo usado para traduzir textos da grid)
       * getRowStyle: função que estiliza as linhas da grid de forma dinâmica
       */}
      <div
        className="ag-theme-balham"
        style={{ height: "65vh", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={clientesList}
          rowSelection="single"
          animateRows
          onGridReady={onGridReady}
          gridOptions={{ localeText: GridTexts }}
          getRowStyle={estilizaLinhaGrid}
        ></AgGridReact>
      </div>

      <Modal
        title="Pesquisa"
        size="md"
        isOpen={visibilityModal}
        closeDialogFn={() => {
          setVisibilityModal(false);
        }}
      >
        <PageBodyContainer>
          <Form ref={modalFormSearchRef} onSubmit={() => {}}>
            <PageFormBodyContainer>
              <Container fluid>
                <Row>
                  <Col md={12}>
                    <Input
                      name="searchClient"
                      label="Cliente"
                      placeholder="Digite o nome do cliente"
                      type="text"
                      onChange={async (e) => {
                        nameMask(e.target);
                        const clientesApi = new Api();
                        const returnApi = await clientesApi.ObterClientePorParametros(
                          e.target.value
                        );
                        setSurveyedCustomers(returnApi.data);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  {surveyedCustomers[0] && (
                    <table class="table">
                      <tbody>
                        {surveyedCustomers.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{item.CLI_ID}</th>
                              <td>{item.CLI_NOME}</td>
                              <td>
                                <CustomButton
                                  icon="angle-right"
                                  className="w-25 p-0 m-0"
                                  action={() => {
                                    customerCurveyedSelected(item.CLI_ID);
                                  }}
                                ></CustomButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </Row>
              </Container>
            </PageFormBodyContainer>
            {/* <Container fluid>
              <Row className="flex-row-reverse">
                <Col xl={4} md={4}>
                  <CustomButton text="Ver"></CustomButton>
                </Col>
              </Row>
            </Container> */}
          </Form>
        </PageBodyContainer>
      </Modal>

      {exibeDadosCliente && (
        <Modal
          title=""
          size="lg"
          isOpen={true}
          closeDialogFn={() => {
            setExibeDadosCliente(false);
          }}
        >
          <ModalBodyContainer>
            <ModalHalfBordered>
              <ModalReportTitleContainer>
                <ModalReportTitle>Dados Pessoais</ModalReportTitle>
              </ModalReportTitleContainer>

              <ModalPersonalInfoRow>
                Nome:{" "}
                <strong>{nameMaskLabel(clienteSelecionado.CLI_NOME)}</strong>
              </ModalPersonalInfoRow>
              <ModalPersonalInfoRow>
                C.P.F. / C.N.P.J.:{" "}
                <strong>
                  {nameMaskLabel(clienteSelecionado.CLI_CNPJ_CPF)}
                </strong>
              </ModalPersonalInfoRow>
              <ModalPersonalInfoRow>
                Data Nascimento:{" "}
                <strong>
                  {clienteSelecionado.CLI_DATANASC.substring(0, 10)}
                </strong>
              </ModalPersonalInfoRow>
              <ModalPersonalInfoRow>
                Telefone:{" "}
                <strong>{phoneMaskLabel(clienteSelecionado.CLI_FONE)}</strong>
              </ModalPersonalInfoRow>
            </ModalHalfBordered>
            <ModalHalfNoBorder>
              <ModalReportTitleContainer>
                <ModalReportTitle>Endereços</ModalReportTitle>
              </ModalReportTitleContainer>

              <div
                className="ag-theme-balham"
                style={{ height: "40vh", width: "100%" }}
              >
                <AgGridReact
                  columnDefs={modalGridcolumnDefs}
                  rowData={clienteSelecionado.CLIENTE_E}
                  animateRows
                  gridOptions={{ localeText: GridTexts }}
                ></AgGridReact>
              </div>
            </ModalHalfNoBorder>
          </ModalBodyContainer>
        </Modal>
      )}

      {exibeConsultaClientes && (
        <Modal
          fechaModalFunc={() => {
            setExibeConsultaClientes(false);
          }}
          titulo="Consultar clientes"
        >
          <ModalBodyContainer>
            <ModalBodyInner>
              {clientePesquisado && (
                <GridOptionsBar>
                  <CustomButton
                    text="Visualizar Informações"
                    icon="external-link-alt"
                    action={abrirCadastroClientePesquisado}
                  />
                  <CustomButton
                    text="Alterar Cadastro"
                    icon="edit"
                    action={alterarCadastroClientePesquisado}
                  />
                </GridOptionsBar>
              )}

              <TypeSearch
                retornaResultadoFn={obterClientePesquisado}
                tipoPesquisa="GET_CLIENTES"
              />
            </ModalBodyInner>
          </ModalBodyContainer>
        </Modal>
      )}
    </PageContainer>
  );
};

export default ConsultaClientes;
