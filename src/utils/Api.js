import axios from "axios";
import { clientesData } from "./clientesData";
import { nameMaskLabel, cpfOrCnpjMaskLabel } from "~/utils/maskLabel";

const api = axios.create({
  baseURL: "http://172.16.1.30:2006",
});

export default class Api {
  async ObterTodosOsClientes() {
    try {
      const x = api.get(`/v1/cadastro`).then((res) => {
        return res.data.retorno;
      });
      //   return clientesData.retorno;
      return x;
    } catch (err) {
      console.log(err);
    }
  }

  async ObterClientePorParametros(valueSearch) {
    let x = valueSearch.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    let requestData;

    try {
      if (isNaN(x.charAt(0))) {
        // valueSearch = nameMaskLabel(valueSearch);
        requestData = await api.post("/v1/cadastro/byParam", {
          CLI_CNPJ_CPF: "",
          CLI_NOME: valueSearch,
        });
      } else {
        // valueSearch = cpfOrCnpjMaskLabel(valueSearch);
        requestData = await api.post("/v1/cadastro/byParam", {
          CLI_CNPJ_CPF: valueSearch,
          CLI_NOME: "",
        });
      }

      return requestData;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async SalvarDadosCliente(request) {
    try {
      if (request.cliente.CLI_ID) {
        await api.put(`/v1/cadastro`, request);
      } else {
        await api.post("/v1/cadastro", request);
      }
    } catch (err) {
      throw new Error("Falha ao salvar cadastro");
    }
  }

  async ConsultarClientes(urlQuery) {
    try {
      const returnApi = await api.get(`/v1/cadastro?${urlQuery}`);
      return returnApi.data;
    } catch (err) {
      throw new Error("Não foi possível consultar o cliente");
    }
  }
}
