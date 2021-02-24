import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "@unform/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
/* ============= Styles =============== */

/* ============= End Styles =============== */

const Input = ({ name, label, width, ...rest }) => {
  const inputRef = useRef(null);
  const classes = useStyles();
  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  return (
    <form className={classes.container} noValidate>
      <TextField
        ref={inputRef}
        id={fieldName}
        label={label}
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        {...rest}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default Input;
