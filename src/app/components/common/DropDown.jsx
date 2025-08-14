import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
} from "@mui/material";

const DropDown = ({
  id,
  name,
  label,
  value,
  onChange,
  optionData = [],
  fieldAccessor = "id",
  multiple = false,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  size = "medium",
  color = "primary",
  formControlSx = {},
  selectSx = {},
}) => {
  return (
    <Box>
      <FormControl
        fullWidth
        size={size}
        error={error}
        required={required}
        disabled={disabled}
        sx={formControlSx}
      >
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          multiple={multiple}
          sx={selectSx}
          MenuProps={{
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
          }}
        >
          {optionData.map((option, index) => {
            const optionValue = option[fieldAccessor];
            return (
              <MenuItem
                key={index}
                value={optionValue}
                disabled={option?.isDisable}
              >
                {multiple && (
                  <Checkbox checked={value.indexOf(optionValue) > -1} />
                )}
                {option.icon && option.icon} {option.name}
              </MenuItem>
            );
          })}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default DropDown;
