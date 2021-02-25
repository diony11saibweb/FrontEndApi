import axios from "axios";
import { clientesData } from "./clientesData";

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

  async ObterClientePorParametros(cpfCnpj, nome) {
    try {
      const returnApi = await api.post("/cadastro/byParam", {
        CLI_CNPJ_CPF: cpfCnpj,
        CLI_NOME: nome,
      });

      console.log("consulta por parametro", returnApi.data);
    } catch (err) {
      console.log(err);
    }
  }

  async SalvarDadosCliente(request) {
    try {
      if (request.cliente.CLI_ID) {
        await api.put(`/cadastro/${request.cliente.CLI_ID}`, request);
      } else {
        await api.post("/cadastro", request);
      }
    } catch (err) {
      throw new Error("Falha ao salvar cadastro");
    }
  }

  async ConsultarClientes(urlQuery) {
    try {
      const returnApi = await api.get(`/cadastro?${urlQuery}`);
      return returnApi.data;
    } catch (err) {
      throw new Error("Não foi possível consultar o cliente");
    }
  }
}
