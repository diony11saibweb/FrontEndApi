import axios from 'axios';

const apiInstance = axios.create({
    baseURL: "http://localhost:8000",
  }
);

export default class Api {

    async ObterTodosOsClientes() {

        try {
            const returnApi = await apiInstance.get('/cadastro');
            
            return returnApi.data;    
        } catch (err) {
            console.log(err);
        }

    }

    async ObterClientePorParametros(cpfCnpj, nome) {

        try {
            const returnApi = await apiInstance.post('/cadastro/byParam', { "CLI_CNPJ_CPF": cpfCnpj, "CLI_NOME": nome });

            console.log('consulta por parametro', returnApi.data);
        } catch (err) {
            console.log(err);
        }
    }

    async SalvarDadosCliente(request) {

        try {
            if (request.cliente.CLI_ID) {
                await apiInstance.put(`/cadastro/${request.cliente.CLI_ID}`, request);
            } else {
                await apiInstance.post('/cadastro', request);
            }

        } catch (err) {
            throw new Error("Falha ao salvar cadastro");
        }
    }

    async ConsultarClientes(urlQuery) {

        try {
            const returnApi = await apiInstance.get(`/cadastro?${urlQuery}`)
            return returnApi.data;
        } catch (err) {
            throw new Error("Não foi possível consultar o cliente");
        }
    }
}