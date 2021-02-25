import React, { useRef, useState, useEffect, Fragment } from "react";
import ReactDatePicker from "react-datepicker";
import { InputContainer, FormLabel } from "./styles";
import { useField } from "@unform/core";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import "./style.css";

const DatePicker = ({ name, label, ...rest }) => {
  const Custom = styled.div`
    .something {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #cac8c8;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.3;
      color: #495057;
      background-color: #fff;
      width: 100%;

      .react-datepicker-wrapper {
        width: 100% !important;
      }
    }
  `;

  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      clearValue: (ref) => {
        ref.clear();
      },
      setValue: (e, v) => {
        setDate(new Date(v)); // <---- Setting up default value
      },
      getValue: () => {
        return datepickerRef.current.props.selected; // to get selected value from Date picker's props
        // OR
        return Date.toString(); // to get selected value from state it self
      },
    });
  }, [fieldName, registerField]);

  return (
    <Fragment>
      <InputContainer>
        {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
        <Custom>
          <ReactDatePicker
            placeholderText="Selecione uma data!"
            className="something w-100"
            ref={datepickerRef}
            selected={date}
            style={{ width: "100%" }}
            onChange={setDate}
            {...rest}
          />
        </Custom>
        {error && (
          <span style={{ color: "#f00", display: "block" }}>{error}</span>
        )}
      </InputContainer>
    </Fragment>
  );
};

export default DatePicker;
