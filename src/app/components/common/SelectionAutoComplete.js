import React from "react";
import { TextField, Grid, Popper, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";

export default function SelectionAutoComplete(props) {
	const popPlacement = (params) => {
		return <Popper {...params} placement="bottom" />;
	};

	return (
		<div className={props.autoCompleteDropdownParentClass}>
			<Autocomplete
				id={props.autoCompleteId}
				options={props.dataList}
				{
				...(props.autoCompleteDisplayName ?
					{
						getOptionLabel: (option) => option[props.autoCompleteDisplayName],
					}
					: {})
				}
				value={props.selectedValue}
				onChange={props.dropdownCallback}
				onInputChange={props.inputChange}
				defaultValue={props.defaultValue}
				forcePopupIcon={false}
				PopperComponent={popPlacement}
				className={props.autoCompleteMainClass}
				{...props}
				// style={{ width: 300 }}
				clearOnBlur={props.clearOnBlur}
				ChipProps={props.chipProps}
				style={props.style}
				disableClearable={props.disableClearable}
				disabled={props.disabled}
				getOptionDisabled={props.getOptionDisabled}
				renderInput={(params) => (
					<TextField
						{...params}
						{...props}
						label={props.autoCompleteLabel}
						variant={props.autoCompleteVariant}
						id={props.autoCompleteTextFieldId}
						className={props.autoCompleteClass}
						size={props.autoCompleteSize}
						placeholder={props.placeholder}
						onChange={props.onChangeText}
						value={props.inputValue}
						onKeyDown={props.onKeyDown}
						helperText={props.helperText}
						error={props.error}
						InputProps={{
							...params.InputProps,
							startAdornment: (
							  <>
								<InputAdornment position='start'>
								  {props.startIcon}
								</InputAdornment>
								{params.InputProps.startAdornment}
							  </>
							)
						  }}
					/>
				)}
			/>
		</div>
	);
}
