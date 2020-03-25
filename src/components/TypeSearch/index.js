import React, { useState, useRef } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import Api from '~/utils/Api';

// import './styles.css';

/* ===== Styles ===== */
import { SearchContainer, InputContainer, SearchInput, ResultsContainer, ResultsItem, CloseButtonContainer, CloseButton } from './styles';
/* ===== Styles ===== */

export default function TypeSearch({ retornaResultadoFn }) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    const getInfo = async () => {
        console.log("getInfo");
        
        let urlQuery = "";

        if (/^[a-zA-ZÁÀÉÍ]*$/.test(query)) {
            urlQuery = `CLI_NOME_like=${query}`;
        } else if (/^[0-9]*$/.test(query)) {
            urlQuery = `CLI_CNPJ_CPF_like=${query}`;
        } else {
            return;
        }

        const clientesApi = new Api();
        const clientesFiltrados = await clientesApi.ConsultarClientes(urlQuery)
        
        setResults(clientesFiltrados);
        
    }
    // https://github.com/slorber/awesome-debounce-promise
    const searchAPIDebounced = AwesomeDebouncePromise(getInfo, 700);

    const handleInputChange = (value) => {
        console.log("handleInputChange");
        
        setQuery(value.toUpperCase());

        if (value && value.length > 2) {
            // getInfo();
            searchAPIDebounced();
            
        } else {
            setResults([]);

            retornaResultadoFn(null);
        }
    }

    const selectResult = (searchResult) => {
        console.log("selectResult");
        
        setQuery(searchResult.CLI_NOME);
        setResults([]);
        inputRef.current.value = searchResult.CLI_NOME;
        
        retornaResultadoFn(searchResult);
    }

    const cleanInput = () => {
        inputRef.current.value = "";
        setQuery("");
        setResults([]);

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
                <CloseButton onClick={() => { cleanInput() }}><i className="pi pi-times-circle"></i></CloseButton>
            </CloseButtonContainer>
        </InputContainer>
        

        {results.length > 0 &&
            (
                <ResultsContainer>
                    <ul>
                        {
                            results.map(result => (
                                <ResultsItem key={result.id} onClick={() => { selectResult(result) }}>
                                    {result.CLI_NOME} - {result.CLI_CNPJ_CPF}                                            
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
