import React from 'react';
import { TextField, InputAdornment } from "@mui/material";

export default function Input(props) {
	return (
		<TextField
			error={props.error}
			helperText={props.helperText}
			defaultValue={props.defaultValue}
			id={props.id}
			name={props.name}
			label={props.label}
			type={props.type}
			className={props.className}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeHolder}
			disabled={props.disabled}
			autoComplete={props.autoComplete}
			variant={props.variant}
			size={props.size}
			color={props.color}
			onInput={props.onInput}
			InputProps={{
				startAdornment: (
					props.startIcon &&
					<InputAdornment position="start" onClick={props.startIconAction} className={props.startIconClass}>
						{props.startIcon}
					</InputAdornment>
				),
				endAdornment: (
					props.endIcon &&
					<InputAdornment position="end" onClick={props.endIconAction} className={props.endIconClass}> 
						{props.endIcon}
					</InputAdornment>
				),
				readOnly: props.readOnly
			}}
			multiline={props.multiline}
			rows={props.rows}
			component={props.component}
			{...props}
		/>
	);
}