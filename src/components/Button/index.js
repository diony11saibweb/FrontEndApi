import React from  'react';
import {
    PrimaryButton,
    GridButton,
    DefaultButton
} from './styles';

function Button(props) {

    if (props.type === "primary") {
        return <PrimaryButton onClick={props.action}><i className={ `pi ${props.icon}` }></i>  {props.text}</PrimaryButton>
    } else if (props.type === "grid") {
        return <GridButton onClick={props.action}><i className={ `pi ${props.icon}` }></i> {props.text}</GridButton>
    } else if (props.formButton) {
        return <DefaultButton onClick={props.action} type="submit"><i className={ `pi ${props.icon}` }></i> {props.text}</DefaultButton>
    }

    return <DefaultButton onClick={props.action}><i className={ `pi ${props.icon}` }></i> {props.text}</DefaultButton>
};

export default Button;