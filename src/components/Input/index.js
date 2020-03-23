import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { InputContainer, FormLabel, FormInput } from './styles';
/* ============= Styles =============== */

/* ============= End Styles =============== */

const Input = ({ name, label, width, ...rest }) => {

    const inputRef = useRef(null);

    const { fieldName, defaultValue = "", registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        });
    }, [fieldName, registerField]);

    return (
        <InputContainer>
            {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

            <FormInput
                ref={inputRef}
                name={fieldName}
                id={fieldName}
                defaultValue={defaultValue}
                inputWidth={width}
                {...rest}
            />            

            {error && <span style={{ color: "#f00", display: 'block' }}>{error}</span>}
        </InputContainer>
    );

};

export default Input;