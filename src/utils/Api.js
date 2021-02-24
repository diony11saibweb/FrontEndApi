import axios from "axios";
import { clientesData } from "./clientesData";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export default class Api {
  async ObterTodosOsClientes() {
    try {
      const x = axios.get(`http://172.16.1.30:2006/v1/cadastro`).then((res) => {
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
      const returnApi = await apiInstance.post("/cadastro/byParam", {
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
        await apiInstance.put(`/cadastro/${request.cliente.CLI_ID}`, request);
      } else {
        await apiInstance.post("/cadastro", request);
      }
    } catch (err) {
      throw new Error("Falha ao salvar cadastro");
    }
  }

  async ConsultarClientes(urlQuery) {
    try {
      const returnApi = await apiInstance.get(`/cadastro?${urlQuery}`);
      return returnApi.data;
    } catch (err) {
      throw new Error("Não foi possível consultar o cliente");
    }
  }
}
