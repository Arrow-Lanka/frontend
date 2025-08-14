import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxField(props) {
    return (
        <FormControlLabel
            className={ props.mainClassName }
            control={
                <Checkbox
                    id={ props.id }
                    name={ props.name }
                    color={ props.color || "primary" }
                    checked={ props.checked }
                    onChange={ (e) => { props.onChange(e) } }
                    className={ props.className }
                    disabled={ props.disabled }
                    { ...props }
                />
            }
            label={ props.label }
        />
    );
}