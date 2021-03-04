import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { AgGridReact } from "ag-grid-react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Container, Row, Col } from "react-bootstrap";
import {
  nameMask,
  cpfOrCnpjMask,
  phoneMask,
  cepMask,
  ufMask,
} from "~/utils/maskInput";

import {
  nameMaskLabel,
  cpfOrCnpjMaskLabel,
  phoneMaskLabel,
  cepMaskLabel,
  ufMaskLabel,
} from "~/utils/maskLabel";

/* ========= Styles =========== */
import {
  PageContainer,
  PageTitle,
  PageTitleContainer,
} from "~/styles/globalStyles";
/* ========= Styles =========== */

import CustomButton from "~/components/CustomButton";
import Utils from "~/utils/utils";
import GridTexts from "~/utils/gridTexts";
import Input from "~/components/Input";
import DatePicker from "~/components/DataPicker";
import Modal from "~/components/Modal";

import "~/index.css";
import Api from "~/utils/Api";
import SelectUnform from "~/components/SelectUnform";

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

export default function FormCliente() {
  const browserHistory = useHistory();
  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [clienteAtual, setClienteAtual] = useState({});
  const formRef = useRef(null);
  const modalFormRef = useRef(null);

  const { addToast } = useToasts();

  const optTiposEndereco = [
    { value: "1", label: "Residencial" },
    { value: "2", label: "Comercial" },
  ];

  const [textButtonSend, setTextButtonSend] = useState("Criar");

  useEffect(() => {
    const routeState = browserHistory.location.state;

    const preencheCamposFormulario = async (dadosInput) => {
      dadosInput.CLI_DATANASC = Utils.DateFormatter(dadosInput.CLI_DATANASC);

      setClienteAtual(dadosInput);

      if (typeof clienteAtual.CLI_ID == "number") {
        setTextButtonSend("Atualizar");
      }

      setTimeout(() => {
        formRef.current.setFieldValue("CLI_NOME", clienteAtual.CLI_NOME);
        formRef.current.setFieldValue(
          "CLI_CNPJ_CPF",
          clienteAtual.CLI_CNPJ_CPF
        );
        formRef.current.setFieldValue("CLI_FONE", clienteAtual.CLI_FONE);
      }, 300);
    };

    if (routeState) {
      preencheCamposFormulario(routeState);
      setListaEnderecos(routeState.CLIENTE_E);
    }
  }, [browserHistory.location.state, clienteAtual]);

  const columnDefs = [
    {
      field: "CLIE_ID",
      headerName: "ID",
      width: 70,
      checkboxSelection: true,
      lockVisible: true,
    },
    { field: "CLIE_TIPO", headerName: "Tipo", width: 60 },
    { field: "CLIE_CEP", headerName: "CEP", resizable: true, width: 100 },
    { field: "CLIE_ENDERECO", headerName: "Logradouro", resizable: true },
    { field: "CLIE_BAIRRO", headerName: "Bairro", resizable: true },
    { field: "CLIE_CIDADE", headerName: "Cidade", resizable: true },
    { field: "CLIE_UF", headerName: "UF", resizable: true },
  ];

  const [gridInstance, setGridInstance] = useState({ api: {}, columnApi: {} });

  const [exibeModalEndereco, setExibeModalEndereco] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const novoEndereco = () => {
    setExibeModalEndereco(true);
  };

  const alterarEndereco = () => {
    const selecaoGrid = gridInstance.api.getSelectedRows();

    if (
      selecaoGrid === null ||
      selecaoGrid === undefined ||
      selecaoGrid.length === 0
    )
      return;

    setEnderecoSelecionado(selecaoGrid[0]);
    setExibeModalEndereco(true);

    modalFormRef.current.setFieldValue(
      "CLIE_ENDERECO",
      selecaoGrid[0].CLIE_ENDERECO
    );
    modalFormRef.current.setFieldValue(
      "CLIE_BAIRRO",
      selecaoGrid[0].CLIE_BAIRRO
    );
    modalFormRef.current.setFieldValue("CLIE_CEP", selecaoGrid[0].CLIE_CEP);
    modalFormRef.current.setFieldValue(
      "CLIE_CIDADE",
      selecaoGrid[0].CLIE_CIDADE
    );
    modalFormRef.current.setFieldValue("CLIE_UF", selecaoGrid[0].CLIE_UF);
    modalFormRef.current.setFieldValue("CLIE_TIPO", selecaoGrid[0].CLIE_TIPO);

    // setTimeout(() => {

    //     modalFormRef.current.setData({
    //         CLIE_CEP: selecaoGrid[0].CLIE_CEP,
    //         CLIE_ENDERECO: selecaoGrid[0].CLIE_ENDERECO,
    //         CLIE_BAIRRO: selecaoGrid[0].CLIE_BAIRRO,
    //         CLIE_CIDADE: selecaoGrid[0].CLIE_CIDADE,
    //         CLIE_UF: selecaoGrid[0].CLIE_UF
    //     });

    // }, 300);
  };

  const atualizaListaEnderecos = () => {
    var enderecosTemp = [];
    gridInstance.api.forEachNode(function (rowNode, index) {
      var data = rowNode.data;
      enderecosTemp.push(data);
    });
    setListaEnderecos(enderecosTemp);
  };

  const excluirEndereco = () => {
    /* esta função acessa diretamente o valor de uma linha,
     * ao contrário da função getSelectedNodes que acessa os nós selecionados
     * Obs.: o nó (rowNode) contém propriedades internas da grid e o data, que é o
     * valor exibido na tela
     */
    const selecaoGrid = gridInstance.api.getSelectedRows();

    if (
      selecaoGrid === null ||
      selecaoGrid === undefined ||
      selecaoGrid.length === 0
    )
      return;

    /* a função updateRowData recebe um objeto onde a chave indica a operação
     * que deve ser realizada como update, remove e o valor é usado para substituir
     * o valor antigo.
     */
    gridInstance.api.updateRowData({ remove: selecaoGrid });
    atualizaListaEnderecos();
  };

  const onGridReady = (params) => {
    setGridInstance({ api: params.api, columnApi: params.columnApi });
  };

  const gerenciaFormCliente = async (data, { reset }) => {
    if (listaEnderecos.length <= 0) {
      addToast("O cliente precisa ter pelo menos um endereço cadastrado!", {
        appearance: "error",
      });
      return;
    }

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        CLI_NOME: Yup.string().required("Preencha o campo Nome"),
        CLI_CNPJ_CPF: Yup.string()
          .required("Preencha o campo CPF / CNPJ")
          .min(14, "Falta dígitos"),
        CLI_DATANASC: Yup.string().required("Preencha o campo Nascimento"),
        CLI_FONE: Yup.string()
          .min(14, "Falta dígitos")
          .required("Preencha o campo Telefone"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.CLI_DATANASC = Utils.DateFormatterCustom(data.CLI_DATANASC);
      data.CLI_DATACAD = Utils.DateFormatterCustom(new Date(Date.now()));
      data.CLI_ID = clienteAtual.CLI_ID;

      const request = {
        cliente: data,
        docs: listaEnderecos,
      };

      const api = new Api();

      let x = await api.SalvarDadosCliente(request);

      reset();
      browserHistory.replace("/clientes");
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }

      formRef.current.setFieldError("CLI_NOME", validationErrors.CLI_NOME);
      formRef.current.setFieldError(
        "CLI_CNPJ_CPF",
        validationErrors.CLI_CNPJ_CPF
      );
      formRef.current.setFieldError(
        "CLI_DATANASC",
        validationErrors.CLI_DATANASC
      );
      formRef.current.setFieldError("CLI_FONE", validationErrors.CLI_FONE);
    }
  };

  const gerenciaFormEndereco = async (data, { reset }) => {
    try {
      modalFormRef.current.setErrors({});
      const schema = Yup.object().shape({
        CLIE_ENDERECO: Yup.string().required("Preencha o campo Logradouro"),
        CLIE_BAIRRO: Yup.string().required("Preencha o campo Bairro"),
        CLIE_CEP: Yup.string()
          .required("Preencha o campo CEP")
          .min(10, "Digite 8 números"),
        CLIE_CIDADE: Yup.string().required("Preencha o campo Cidade"),
        CLIE_UF: Yup.string().required("Preencha o campo UF"),
        CLIE_TIPO: Yup.string().required("Selecione o Tipo Endereço"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Se existe endereço selecionado se trata de alteração
      if (enderecoSelecionado !== null) {
        const enderecoTemp = enderecoSelecionado;
        enderecoTemp.CLIE_ENDERECO = data.CLIE_ENDERECO;
        enderecoTemp.CLIE_BAIRRO = data.CLIE_BAIRRO;
        enderecoTemp.CLIE_CEP = data.CLIE_CEP;
        enderecoTemp.CLIE_CIDADE = data.CLIE_CIDADE;
        enderecoTemp.CLIE_UF = data.CLIE_UF;
        enderecoTemp.CLIE_ID = 0;

        gridInstance.api.updateRowData({ update: [enderecoTemp] });
        atualizaListaEnderecos();
      } else {
        // data.CLIE_TIPO = "1";
        data.CLIE_CLI_ID = clienteAtual.CLI_ID;
        data.CLIE_ID = 0;

        const enderecosTemp = listaEnderecos;
        enderecosTemp.push(data);
        setListaEnderecos(enderecosTemp);
        gridInstance.api.setRowData(listaEnderecos);
      }

      setExibeModalEndereco(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }

      modalFormRef.current.setFieldError(
        "CLIE_ENDERECO",
        validationErrors.CLIE_ENDERECO
      );
      modalFormRef.current.setFieldError(
        "CLIE_BAIRRO",
        validationErrors.CLIE_BAIRRO
      );
      modalFormRef.current.setFieldError("CLIE_CEP", validationErrors.CLIE_CEP);
      modalFormRef.current.setFieldError(
        "CLIE_CIDADE",
        validationErrors.CLIE_CIDADE
      );
      modalFormRef.current.setFieldError("CLIE_UF", validationErrors.CLIE_UF);
      modalFormRef.current.setFieldError(
        "CLIE_TIPO",
        validationErrors.CLIE_TIPO
      );
    }
  };

  return (
    <PageContainer>
      <Container fluid>
        <PageTitleContainer>
          <PageTitle>Formulário de Cliente</PageTitle>
        </PageTitleContainer>

        <PageBodyContainer>
          <Form ref={formRef} onSubmit={gerenciaFormCliente}>
            <PageSectionInfo>
              <PageFormTitleContainer>
                <PageFormTitle>Dados Pessoais</PageFormTitle>
              </PageFormTitleContainer>
              <PageFormBodyContainer>
                <Container fluid>
                  <Row>
                    <Col xl={3} md={6}>
                      <Input
                        name="CLI_NOME"
                        label="Nome Completo"
                        type="text"
                        width="100%"
                        onChange={(e) => {
                          nameMask(e.target);
                        }}
                      />
                    </Col>
                    <Col xl={3} md={6}>
                      <Input
                        name="CLI_CNPJ_CPF"
                        label="C.P.F. / C.N.P.J"
                        type="text"
                        width="100%"
                        onChange={(e) => {
                          cpfOrCnpjMask(e.target);
                        }}
                      />
                    </Col>

                    <Col xl={3} md={6}>
                      <DatePicker
                        name="CLI_DATANASC"
                        label="Nasc"
                        type="text"
                        width="100%"
                        mask="99/99/9999"
                      />
                    </Col>
                    <Col xl={3} md={6}>
                      <Input
                        name="CLI_FONE"
                        label="Telefone"
                        type="text"
                        width="100%"
                        onChange={(e) => {
                          phoneMask(e.target);
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="flex-row-reverse">
                    <Col xl={2} md={3}>
                      <CustomButton text={textButtonSend}></CustomButton>
                    </Col>
                  </Row>
                </Container>
              </PageFormBodyContainer>
            </PageSectionInfo>
          </Form>

          <PageSectionAddress>
            <PageFormTitleContainer>
              <PageFormTitle>Endereços</PageFormTitle>
            </PageFormTitleContainer>
            <div
              className="ag-theme-balham"
              style={{ height: "28vh", width: "100%" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={listaEnderecos}
                rowSelection="single"
                animateRows
                onGridReady={onGridReady}
                gridOptions={{ localeText: GridTexts }}
              ></AgGridReact>
            </div>
          </PageSectionAddress>
          <Row className="flex-row-reverse">
            <Col xl={2} md={3}>
              <CustomButton
                text="Novo Endereço"
                icon="plus-circle"
                action={novoEndereco}
              ></CustomButton>
            </Col>
            <Col xl={2} md={3}>
              <CustomButton text="Alterar Endereço" icon="edit"></CustomButton>
            </Col>
            <Col xl={2} md={3}>
              <CustomButton
                text="Excluir Endereço"
                icon="trash-alt"
              ></CustomButton>
            </Col>
            <Col xl={2} md={3} className="d-flex justify-content-end">
              <CustomButton
                icon="angle-left"
                className="w-25"
                action={() => {
                  browserHistory.goBack();
                }}
              ></CustomButton>
            </Col>
          </Row>
        </PageBodyContainer>

        <Modal
          title="Formulário de Endereço"
          size="md"
          isOpen={exibeModalEndereco}
          closeDialogFn={() => {
            setExibeModalEndereco(false);
          }}
        >
          <PageBodyContainer>
            <Form ref={modalFormRef} onSubmit={gerenciaFormEndereco}>
              <PageFormBodyContainer>
                <Container fluid>
                  <Row>
                    <Col md={4}>
                      <Input
                        name="CLIE_ENDERECO"
                        label="Logradouro"
                        type="text"
                        onChange={(e) => {
                          nameMask(e.target);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <Input
                        name="CLIE_BAIRRO"
                        label="Bairro"
                        type="text"
                        onChange={(e) => {
                          nameMask(e.target);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <Input
                        name="CLIE_CEP"
                        label="CEP"
                        type="text"
                        onChange={(e) => {
                          cepMask(e.target);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Input
                        name="CLIE_CIDADE"
                        label="Cidade"
                        type="text"
                        onChange={(e) => {
                          nameMask(e.target);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <Input
                        name="CLIE_UF"
                        label="UF"
                        type="text"
                        onChange={(e) => {
                          ufMask(e.target);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectUnform
                        name="CLIE_TIPO"
                        label="Tipo Endereço"
                        optionsList={optTiposEndereco}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </Col>
                  </Row>
                </Container>
              </PageFormBodyContainer>
              <Container fluid>
                <Row className="flex-row-reverse">
                  <Col xl={2} md={3}>
                    <CustomButton text="Criar"></CustomButton>
                  </Col>
                </Row>
              </Container>
            </Form>
          </PageBodyContainer>
        </Modal>
      </Container>
    </PageContainer>
  );
}
