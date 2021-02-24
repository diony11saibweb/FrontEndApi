import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { AgGridReact } from "ag-grid-react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { Row, Col } from "react-bootstrap";

/* ========= Styles =========== */
import {
  PageContainer,
  PageTitle,
  PageTitleContainer,
  GridOptionsBar,
} from "~/styles/globalStyles";
/* ========= Styles =========== */

import Button from "~/components/Button";
import Utils from "~/utils/utils";
import GridTexts from "~/utils/gridTexts";
import Input from "~/components/Input";
import DatePicker from "~/components/DataPicker";
import Modal from "~/components/Modal";

import "~/index.css";
import Api from "~/utils/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectUnform from "~/components/SelectUnform";

/* ========= Styles =========== */

const PageBodyContainer = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 4px;
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

  useEffect(() => {
    const routeState = browserHistory.location.state;

    const preencheCamposFormulario = async (dadosInput) => {
      dadosInput.CLI_DATANASC = Utils.DateFormatter(dadosInput.CLI_DATANASC);

      setClienteAtual(dadosInput);
      setTimeout(() => {
        formRef.current.setData({
          CLI_NOME: clienteAtual.CLI_NOME,
          CLI_CNPJ_CPF: clienteAtual.CLI_CNPJ_CPF,
          CLI_DATANASC: clienteAtual.CLI_DATANASC,
          CLI_FONE: clienteAtual.CLI_FONE,
        });
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
    console.log("lista de endereços", enderecosTemp);
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
    console.log("endereço selecionado", selecaoGrid);

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
          .matches(/(^[0-9]{11}$)|(^[0-9]{14}$)/g, "CPF ou CNPJ Inválido"),
        CLI_DATANASC: Yup.string()
          .required("Preencha o campo Nascimento")
          .matches(
            /(^\d{2}\/\d{2}\/\d{4}$)|(^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{1,2}$)/g,
            "Informe a data no formato DD/MM/YYY HH:MM"
          ),
        CLI_FONE: Yup.string().required("Preencha o campo Telefone"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log("DATA DE CADASTRO", clienteAtual.CLI_DATACAD);
      console.log("dados do formulário", data);
      data.CLI_DATANASC = Utils.DateParser(data.CLI_DATANASC);
      data.CLI_DATACAD = clienteAtual.CLI_DATACAD
        ? Utils.DateParser(clienteAtual.CLI_DATACAD)
        : Utils.DateParser(new Date(Date.now()));
      data.CLI_ID = clienteAtual.CLI_ID;

      const request = {
        cliente: data,
        docs: listaEnderecos,
      };

      const api = new Api();
      await api.SalvarDadosCliente(request);

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
      console.log("form endreço", data);

      modalFormRef.current.setErrors({});
      const schema = Yup.object().shape({
        CLIE_ENDERECO: Yup.string().required("Preencha o campo Logradouro"),
        CLIE_BAIRRO: Yup.string().required("Preencha o campo Bairro"),
        CLIE_CEP: Yup.string().required("Preencha o campo CEP"),
        CLIE_CIDADE: Yup.string().required("Preencha o campo Cidade"),
        CLIE_UF: Yup.string().required("Preencha o campo UF"),
        CLIE_TIPO: Yup.string().required("Selecione o Tipo Endereço"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Se existe endereço selecionado se trata de alteração
      if (enderecoSelecionado !== null) {
        console.log("alteração", enderecoSelecionado);

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
              <Row className="w-100">
                <Col md={6}>
                  <Input
                    className="text-capitalize"
                    name="CLI_NOME"
                    label="Nome Completo"
                    type="text"
                    width="100%"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    name="CLI_CNPJ_CPF"
                    label="C.P.F. / C.N.P.J"
                    type="text"
                    width="100%"
                  />
                </Col>

                <Col md={6}>
                  <DatePicker
                    name="CLI_DATANASC"
                    label="Nasc"
                    type="text"
                    width="100%"
                    mask="99/99/9999"
                  />
                  {/* <Input
                    name="CLI_DATANASC"
                    label="Nasc"
                    type="text"
                    width="100%"
                    mask="99/99/9999"
                  /> */}
                </Col>
                <Col md={6}>
                  <Input
                    name="CLI_FONE"
                    label="Telefone"
                    type="text"
                    width="100%"
                  />
                </Col>
                <Row className="w-100">
                  <Col md={3}>
                    <Button
                      className="px-4 w-100"
                      text=" Criar "
                      icon="plus-circle"
                      type="submit"
                    />
                  </Col>
                </Row>
              </Row>
            </PageFormBodyContainer>
          </PageSectionInfo>
        </Form>

        <PageSectionAddress>
          <PageFormTitleContainer>
            <PageFormTitle>Endereços</PageFormTitle>
          </PageFormTitleContainer>

          <GridOptionsBar className="d-flex justify-content-end pr-3">
            <Button
              text="Novo Endereço"
              icon="plus-circle"
              action={novoEndereco}
            />
            <Button
              text="Alterar Endereço"
              icon="edit"
              action={alterarEndereco}
            />
            <Button
              text="Excluir Endereço"
              icon="trash-alt"
              action={excluirEndereco}
            />
          </GridOptionsBar>

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
      </PageBodyContainer>

      <Modal
        title="FORMULÁRIO DE ENDEREÇO"
        size="lg"
        isOpen={exibeModalEndereco}
        closeDialogFn={() => {
          setExibeModalEndereco(false);
        }}
      >
        <PageBodyContainer>
          <Form ref={modalFormRef} onSubmit={gerenciaFormEndereco}>
            <PageFormBodyContainer>
              <Input
                name="CLIE_ENDERECO"
                label="Logradouro"
                type="text"
                width={16}
              />
              <Input name="CLIE_BAIRRO" label="Bairro" type="text" width={16} />
              <Input name="CLIE_CEP" label="CEP:" type="text" width={8} />
              <Input name="CLIE_CIDADE" label="Cidade:" type="text" width={8} />
              <Input name="CLIE_UF" label="UF" type="text" width={4} />

              <SelectUnform
                name="CLIE_TIPO"
                label="Tipo Endereço"
                width={12}
                optionsList={optTiposEndereco}
                isClearable={true}
                isSearchable={true}
              />
            </PageFormBodyContainer>

            <ModalFormButton type="submit">
              <FontAwesomeIcon icon="check" /> Confirmar
            </ModalFormButton>
          </Form>
        </PageBodyContainer>
      </Modal>
    </PageContainer>
  );
}
