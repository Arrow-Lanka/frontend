import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "./Input";
import { useEffect } from "react";

const RadioButton = (props) => {
  const [value, setValue] = React.useState(props.initialValue);
  const [textValue, setTextValue] = React.useState(props.initialTextValue);

  useEffect(() => {
      setValue(props.initialValue);
  },[props.initialValue])

  const handleChange = (event) => {
    setValue(event.target.value);
    props.getRadioSelection(props.name, event.target.value);
  };
  
  const handleTextChange = (event, radioValue) => {
    setTextValue(event.target.value)
    props.getTextValue(props.name, event.target.value, radioValue);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.radioButtonGroupLabel}</FormLabel>
        <RadioGroup
          aria-label={props.ariaLabel}
          id={props.name}
          name={props.name}
          value={value}
          onChange={handleChange}
          className={props.radioGroupclassName}
        >
          {props.radioData &&
            props.radioData.map((data) => (
              <FormControlLabel
                value={data.value}
                control={
                  <Radio
                    className={props.radioclassName}
                    color={data.color}
                    onChange={(e)=>props.getSelectedRadioObj(props.name,e.target.value, data)}
                    {...props}
                  />
                }
                label={
                  data.hasDescription ? (
                    <Input
                      label={data.label}
                      variant="outlined"
                      multiline={true}
                      rows="1"
                      onChange={(e)=>handleTextChange(e,data.label)}
                      disabled={value!==data.label}
                      defaultValue={props.initialTextValue}
                      value={value!==data.label ? "" : textValue}
                      placeHolder={props.placeHolder}
                      size={props.inputSize}
                      error={value ===data.label && props.error }
                      helperText={ value ===data.label && props.helperText}
                      required={value ===data.label && props.required}
                    />
                  ) : (
                    data.label
                  )
                }
                disabled={data.disabled}
                className={props.radioButtonclass}
                labelPlacement={props.labelPlacement}
                
              />
            ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButton;
