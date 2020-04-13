import React, { useState, useRef } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Api from '~/utils/Api';

// import './styles.css';

/* ===== Styles ===== */
import { SearchContainer, InputContainer, SearchInput, ResultsContainer, ResultsItem, CloseButtonContainer, CloseButton } from './styles';
/* ===== Styles ===== */

/**
 * 
 * @param {function} retornaResultadoFn Função que retorna a opção selecionada pelo usuário
 *  @param {string} tipoPesquisa Informa o tipo de pesquisa. opções: GET_CLIENTES, GET_PRODUTOS.
 * 
 */
export default function TypeSearch({ retornaResultadoFn, tipoPesquisa }) {

    /* Este array de objetos deve sempre seguir o padrão {CODIGO, VALOR, id} afim de
     * padronizar os resultados exibidos na tela.
     * O método getInfo deve popular o objeto corretamente.   
     */
    const [resultadosTratados, setResultadosTratados] = useState([]);

    /* Este array deve armazenar o retorno da API sem alterar os dados obtidos */
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    const getInfo = async (inputValue) => {
        
        /* Faz a consulta na api de acordo com o parametros tipoPesquisa */
        switch (tipoPesquisa) {
            case "GET_CLIENTES":

                let urlQuery = "";

                if (/^[a-zA-ZÁÀÉÍ]*$/.test(inputValue)) {
                    urlQuery = `CLI_NOME_like=${inputValue}`;
                } else if (/^[0-9]*$/.test(inputValue)) {
                    urlQuery = `CLI_CNPJ_CPF_like=${inputValue}`;
                } else {
                    return;
                }

                // Obtem os dados da API
                const clientesApi = new Api();
                const clientesFiltrados = await clientesApi.ConsultarClientes(urlQuery);
                setResults(clientesFiltrados);
                
                // Padroniza os dados retornados
                const tempResults = [];
                clientesFiltrados.forEach(element => {
                    const obj = {
                        CODIGO: element.CLI_CNPJ_CPF, 
                        VALOR: element.CLI_NOME,
                        id: element.id
                    };
                    tempResults.push(obj);
                });

                setResultadosTratados(tempResults);
                break;
            case "GET_PRODUTOS":
                setResults([]);
                break;
            default:
                setResults([]);
        }
        
    }
    // https://github.com/slorber/awesome-debounce-promise
    const searchAPIDebounced = inputValue => AwesomeDebouncePromise(getInfo(inputValue), 700);

    const handleInputChange = (value) => {

        if (value) {
            searchAPIDebounced(value);
            
        } else {
            setResults([]);

            retornaResultadoFn(null);
        }
    }

    const selectResult = (searchResult) => {        
        
        inputRef.current.value = searchResult.VALOR;

        const objetoRetornar = results.find(element => element.id === searchResult.id);
        
        retornaResultadoFn(objetoRetornar);

        setResults([]);
        setResultadosTratados([]);
    }

    const cleanInput = () => {
        inputRef.current.value = "";
        setResults([]);
        setResultadosTratados([]);

        retornaResultadoFn(null);
    }

  return (
    
    <SearchContainer>

        <InputContainer>
            <SearchInput 
                ref={inputRef}
                placeholder="Pesquisar..."
                className="search-inputs"                  
                onChange={(e) => { handleInputChange(e.target.value) }}
            />
            
            <CloseButtonContainer>
                <CloseButton onClick={() => { cleanInput() }}>
                <FontAwesomeIcon icon="times-circle" />
                </CloseButton>
            </CloseButtonContainer>
        </InputContainer>
        

        {resultadosTratados.length > 0 &&
            (
                <ResultsContainer>
                    <ul>
                        {
                            resultadosTratados.map(result => (
                                <ResultsItem key={result.id} onClick={() => { selectResult(result) }}>
                                    {result.CODIGO} - {result.VALOR}
                                </ResultsItem>
                            ))
                        }
                    </ul>
                </ResultsContainer>
            )
        }

    </SearchContainer>

  );
}
