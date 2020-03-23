import axios from 'axios';

export default class Api {

    async ObterTodosOsClientes() {

        try {
            const returnApi = await axios.get('http://172.16.1.30:2006/v1/cadastro');
            
            return returnApi.data.retorno;    
        } catch (err) {
            console.log(err);
        }

    }

    async ObterClientePorParametros(cpfCnpj, nome) {

        try {
            const returnApi = await axios.post('http://172.16.1.30:2006/v1/cadastro/byParam', { "CLI_CNPJ_CPF": cpfCnpj, "CLI_NOME": nome });

            console.log('consulta por parametro', returnApi.data);
        } catch (err) {
            console.log(err);
        }
    }

    async SalvarDadosCliente(request) {

        try {
            if (request.cliente.CLI_ID) {
                await axios.put('http://172.16.1.30:2006/v1/cadastro', request);
            } else {
                await axios.post('http://172.16.1.30:2006/v1/cadastro', request);
            }

        } catch (err) {
            throw new Error("Falha ao salvar cadastro");
        }
    }
}