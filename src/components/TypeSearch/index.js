import React, { useState, useRef } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import Api from '~/utils/Api';

import './styles.css';

export default function TypeSearch() {

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
        }
    }

    const selectResult = (searchResult) => {
        console.log("selectResult");
        
        setQuery(searchResult.CLI_NOME);
        setResults([]);
        inputRef.current.value = searchResult.CLI_NOME;
        
    }

    const cleanInput = () => {
        inputRef.current.value = "";
        setQuery("");
        setResults([]);
    }

  return (
    
    <div className="search-container">

        <div className="input-container">
            <input 
                ref={inputRef}
                placeholder="Pesquisar..."
                className="search-inputs"                    
                onChange={(e) => { handleInputChange(e.target.value) }}
            />
            
            <div className="close-button">
                <span onClick={() => { cleanInput() }}>Limpar</span>
            </div>
        </div>
        

        {results.length > 0 &&
            (
                <div className="results-container">
                    <ul>
                        {
                            results.map(result => (
                                <li key={result.id} onClick={() => { selectResult(result) }}>
                                    {result.CLI_NOME} - {result.CLI_CNPJ_CPF}                                            
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        }



    </div>

  );
}
