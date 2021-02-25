import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton, GridButton, DefaultButton } from "./styles";

function Button(props) {
  if (props.type === "primary") {
    return (
      <PrimaryButton className={props.className} onClick={props.action}>
        <FontAwesomeIcon className="mx-1  text-truncate" icon={props.icon} />{" "}
        {props.text}
      </PrimaryButton>
    );
  } else if (props.type === "grid") {
    return (
      <GridButton onClick={props.action}>
        <FontAwesomeIcon className="mx-1  text-truncate" icon={props.icon} />{" "}
        {props.text}
      </GridButton>
    );
  } else if (props.formButton) {
    return (
      <DefaultButton
        className={props.className}
        onClick={props.action}
        type="submit"
      >
        <FontAwesomeIcon className="mx-1  text-truncate" icon={props.icon} />{" "}
        {props.text}
      </DefaultButton>
    );
  }

  return (
    <DefaultButton className={props.className} onClick={props.action}>
      <FontAwesomeIcon className="mx-1 text-truncate" icon={props.icon} />{" "}
      {props.text}
    </DefaultButton>
  );
}

export default Button;
