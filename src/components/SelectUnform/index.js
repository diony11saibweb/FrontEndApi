import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import { useField } from '@unform/core';

import { SelectContainer, FormLabel } from './styles';

const customStyles = {
  control: () => ({
    borderColor: '#9e9e9e',
    borderWidth: 1,
    borderStyle: 'solid'
  })
}

export default function SelectUnform({name, label, width, optionsList, ...rest }) {

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return '';
          }
          return ref.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);


  return (

    <SelectContainer inputWidth={width}>
      
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <Select
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        options={optionsList}
        {...rest}
        
        theme={theme => ({
          ...theme,                   
          colors: {
            ...theme.colors,
            primary: '#b196d0',
            primary25: '#e6d4fb'
          }
        })}
      />

      {error && <span style={{ color: "#f00", display: 'block' }}>{error}</span>}

    </SelectContainer>
    
  );
}
