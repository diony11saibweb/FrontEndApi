import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton, GridButton, DefaultButton } from "./styles";

function Button(props) {
  if (props.type === "primary") {
    return (
      <PrimaryButton onClick={props.action}>
        <FontAwesomeIcon className="mx-1" icon={props.icon} /> {props.text}
      </PrimaryButton>
    );
  } else if (props.type === "grid") {
    return (
      <GridButton onClick={props.action}>
        <FontAwesomeIcon className="mx-1" icon={props.icon} /> {props.text}
      </GridButton>
    );
  } else if (props.formButton) {
    return (
      <DefaultButton onClick={props.action} type="submit">
        <FontAwesomeIcon className="mx-1" icon={props.icon} /> {props.text}
      </DefaultButton>
    );
  }

  return (
    <DefaultButton onClick={props.action}>
      <FontAwesomeIcon className="mx-1" icon={props.icon} /> {props.text}
    </DefaultButton>
  );
}

export default Button;
