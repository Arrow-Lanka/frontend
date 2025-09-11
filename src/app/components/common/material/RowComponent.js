import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
// import TextField  from '@material-ui/core/TextField ';
import { Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import DropDown from '../DropDown';
import Input from "./Input";
import CheckboxField from './CheckboxField';
import classNames from "classnames";
import RadioButton from './RadioButton';


import { LocalizationProvider  } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment';
import { getLabel } from '../../shared/localization';
import { Button, Chip, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SelectionAutoComplete from './SelectionAutoComplete';
// import { PrepareStyles } from "../../pharmacy/prepare/PrepareStyles";
import { template } from 'lodash';

export default function RowComponent(props) {
    let {classes, rowSpecificClass } = props
 return (
        props.columns.map((column, columnIndex) => (
            <TableCell id={(column.columnId ? column.columnId : column.id) + "_" + (props.rowDataIndex + 1)} key={columnIndex + "_" + props.rowDataIndex} className={classNames(classes && classes.tableCell, column.contentClass, rowSpecificClass, column.dynamicColumnClass &&  props.rowData[column.id + "_style"]) } align={column.contentAlign || column.columnAlign} width={column.width}>
                {column.template ? getTemplate(column.template, props.rowData, [column.id], props.rowDataIndex) : props.rowData[column.id]}
            </TableCell>
        ))
    );
     function getTemplate(templateData, row, columnId, index) {
        if (templateData.type === "AnchorTag") {
            return (
                <Link style={{ color: "#000" }} to={templateData.redirectLink + row[templateData.redirectId]}>{row[columnId]}</Link>
            );
        } else if (templateData.type === "clickableIconBlock") {
            return (
                <Typography className={templateData.iconParentClass}>
                    {
                        ((!templateData?.conditionalRendering) || (templateData?.conditionalRendering && row[templateData?.conditionalKey])) &&
                        templateData.icons?.map((icon) => {
                            return (
                                <Tooltip title={icon.isRowRelatedToolTip ? row[icon.toolTipTittleId] : icon.name} placement={icon.toolTipPosition} arrow={icon.istoolTipArrow} disableHoverListener={icon?.isTooltipDisabled}>
                                    <img
                                        className={classNames(classes && classes.iconStyle, icon.iconClass)}
                                        id={icon.id + "_" + row[props.uniqueField]?.toString()}
                                        onClick={(event) => {
                                            if (templateData.iconClickAction) {
                                                templateData.iconClickAction(event, row, index);
                                            } else if (props.onClickAction) {
                                                props.onClickAction(event, row, index);
                                            }
                                        }}
                                        src={icon.iconLink}
                                        alt={icon.name}
                                        style={icon.iconStyle}
                                    >
                                    </img>
                                </Tooltip>
                            );
                        })
                    }
                </Typography >
            );
        } else if (templateData.type === "clickableTextBlock") {
            return (
                <Grid direction="row">
                    {
                        templateData.texts.map((text) => {
                            return (
                                <Typography className={classNames(text.class, text.options && text.options.map((singleOpt) => { return ((row[text.deciderField] === singleOpt.value) && singleOpt.conditionClass) }))} id={text.id + "_" + row[props.uniqueField].toString()} onClick={(event) => { templateData.iconClickAction ? templateData.iconClickAction(event) : props.onClickAction && props.onClickAction(event) }}>
                                    { row[text.id] }
                                </Typography>
                            );
                        })
                    }
                </Grid>
            );
        } else if (templateData.type === "dropdown") {
            return (
                <>
                {console.log('Dropdown Value:',  templateData)}
                    {     
                        !row.isLabel &&           
                        <DropDown
                            id={"dropdown_" + row[props.uniqueField].toString()}
                            name={"dropdown_" + row[props.uniqueField].toString()}
                            optionData={templateData.optionData}
                            value={row[columnId]}
                            onChange={(e) => {templateData.onchangeAction(e, props.dropDownObj)}}
                            className={templateData.dropDownClass}
                            color={templateData.dropdownColor}
                            size="small"
                            variant={templateData.variant}
                            disabled={templateData.disabledDropdown ? true : props.disabledDropdown ?  true : false}
                        />
                    }
                    {     
                        row.isLabel &&           
                        <Typography>{ row[columnId] }</Typography>
                    }
                </>
            );
        } else if (templateData.type === "checkbox") {
            return (
                <CheckboxField
                    id={"checkbox_" + row[props.uniqueField]?.toString()}
                    name={"checkbox_" + row[props.uniqueField]?.toString()}
                    checked={row[columnId]}
                    onChange={(e) => templateData?.onChangeAction(e, row)}
                    className={templateData.checkboxClass}
                    color={templateData.checkboxColor}
                    checkedIcon={templateData.checkBoxCheckedIcon}
                    icon={templateData.checkboxIcon}
                    iconStyle={{ fill: templateData.checkboxIconColor }}
                    disabled={templateData.isCheckboxDisabled}
                />
            );
        } else if (templateData.type === "twoLineTextFields") {
            return (
                templateData.fieldList.map((singleField) => {
                    return (
                        <>
                            {/* if tooltip is needed*/}
                            {
                                singleField.isToolTip &&
                                <Tooltip title={singleField.name? singleField.name : row[singleField.id]} placement={singleField.toolTipPosition} arrow={singleField.istoolTipArrow}>
                                    <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                        {/* {row[singleField.id]} */}
                                        {row[singleField.id]?.length > singleField?.maxWordCount ? row[singleField.id]?.slice(0,singleField?.maxWordCount) + "..." :  row[singleField.id]}
                                    </Box>
                                </Tooltip>
                            }
                            {/* if tooltip is not needed */}
                            {
                                !singleField.isToolTip &&
                                <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                    {row[singleField.id]}
                                    {/* {row[singleField.id].charAt(0).toUpperCase() + row[singleField.id].slice(1).toLowerCase().replace(/[/_]/g, '')} */}
                                </Box>
                            }
                        </>
                    );
                })
            );
        } else if (templateData.type === "twoLineIconMixedText") {
            return (
                // can pass mainWarpper class style to make it same line 
                <Grid className={ templateData.mainWarpper }>
                    { 
                        !templateData.iconFirst &&
                        <Box display="flex">
                            {
                                templateData.textFields &&
                                templateData.textFields.map((singleTextField) => {
                                    return (
                                        <>
                                            {/* if tooltip is needed*/}
                                            {
                                                singleTextField.isToolTip &&
                                                <Tooltip title={singleTextField.name} placement={singleTextField.toolTipPosition} arrow={singleTextField.istoolTipArrow}>
                                                    <Box className={ classNames(singleTextField.fieldClass, singleTextField.options && singleTextField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))}>{row[singleTextField.id]}</Box>
                                                </Tooltip>
                                            }
                                            {/* if tooltip is not needed */}
                                            {
                                                !singleTextField.isToolTip &&
                                                <Box className={ classNames(singleTextField.fieldClass, singleTextField.options && singleTextField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))}>{row[singleTextField.id]}</Box>
                                            }
                                        </>
                                    )
                                })
                            }
                        </Box>
                    }
                    <Box display="flex">
                        {
                            templateData.iconFields &&
                            templateData.iconFields.map((singleIcon) => {
                                return (
                                    singleIcon.options.map((singleOption) => {
                                        if ((!singleOption.notEqual && (row[singleIcon.id] === singleOption.value)) || (singleOption.notEqual && (row[singleIcon.id] !== singleOption.value))) {
                                            return (
                                                <Tooltip title={singleOption.name} placement={singleIcon.toolTipPosition} arrow={singleIcon.istoolTipArrow}>
                                                    <img 
                                                        id={ singleOption.id + "_" + row[props.uniqueField]?.toString() }
                                                        name={ singleOption.name }
                                                        className={classNames(singleIcon.iconClass, singleOption.iconClass)} 
                                                        src={singleOption.iconLink} 
                                                        height={18} 
                                                        onClick={ (event) => { templateData.iconClickAction ? templateData.iconClickAction(event) : props.onClickAction && props.onClickAction(event) } }
                                                    />
                                                </Tooltip>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </Box>
                    { 
                        templateData.iconFirst &&
                        <Box display="flex">
                            {
                                templateData.textFields &&
                                templateData.textFields.map((singleTextField) => {
                                    return (
                                        <>
                                            {/* if tooltip is needed*/}
                                            {
                                                singleTextField.isToolTip &&
                                                <Tooltip title={singleTextField.name} placement={singleTextField.toolTipPosition} arrow={singleTextField.istoolTipArrow}>
                                                    <Box className={ classNames(singleTextField.fieldClass, singleTextField.options && singleTextField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))}>{row[singleTextField.id]}</Box>
                                                </Tooltip>
                                            }
                                            {/* if tooltip is not needed */}
                                            {
                                                !singleTextField.isToolTip &&
                                                <Box className={ classNames(singleTextField.fieldClass, singleTextField.options && singleTextField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))}>{row[singleTextField.id]}</Box>
                                            }
                                        </>
                                    )
                                })
                            }
                        </Box>
                    }
                </Grid>
            );
        } else if (templateData.type === "arrayMultipleTextFields") {
        
            console.log("templateData.id",row[templateData.id])
            console.log(row[templateData.id]?.length > 0 ? row[templateData.id].map(d => d.diagnosisEn).join(', ') : '', "ddddddd");

            return (
                // templateData.arrayList.map((arrayItem) => {
                // console.log("array", row[arrayItem.id])
                // console.log('row[templateData.id]', row[templateData.id])
                row[templateData.id] &&
                row[templateData.id].map((item) => {
                    return (
                        <Box className={classNames(classes && classes.tableCell, templateData.optionClass)}>
                            <Grid container>
                                <Grid item xs={true} className={templateData?.optionLabelClass}>
                                    {item?.[templateData?.option].length > 10 ? item?.[templateData?.option].slice(0,6) + "..." : item?.[templateData?.option]}
                                    {/* {console.log("item",item)} */}
                                </Grid>
                                {templateData?.isToolTip && <Grid item xs="auto" >
                                    <Tooltip title={item?.[templateData?.option]} placement={templateData.toolTipPosition} arrow={templateData?.istoolTipArrow} classes={templateData?.optionTooltipClasses}>
                                        <img
                                            alt="" 
                                            id={ templateData?.id + "_" + row?.[props?.uniqueField]?.toString && row[props.uniqueField].toString() }
                                            name={ item?.[templateData?.option] }
                                            className={templateData?.iconClass} 
                                            src={templateData?.iconLink} 
                                            height={18} 
                                        />
                                    </Tooltip>
                                </Grid>}
                            </Grid>
                        </Box>
                    )
                    // console.log(item)
                })
            );
        } else if (templateData.type === "controlledIconBlock") {
            return (
                <Typography>
                    {
                        templateData.icons.map((icon) => {
                            return (
                                icon.options.map((option) => {
                                    if (row[templateData.controlledField] === option.value) {
                                        return (
                                            <Tooltip title={option.name} placement={option.toolTipPosition} arrow={option.istoolTipArrow}>
                                                <img
                                                    className={classNames(classes && classes.iconStyle, option.iconClass)}
                                                    id={option.id + "_" + row[props.uniqueField].toString()}
                                                    onClick={(event) => { templateData.iconClickAction ? templateData.iconClickAction(event) : props.onClickAction && props.onClickAction(event) }}
                                                    src={option.iconLink}
                                                    alt={option.name}
                                                >
                                                </img>
                                            </Tooltip>
                                        )
                                    }
                                })

                            );
                        })
                    }
                </Typography >
            );
        } else if (templateData.type === 'timerWithText') {
            return (
                templateData.fieldList.map((singleField) => {
                    return (
                            <>
                            {
                                singleField.position==="up" &&
                                <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                    {row[singleField.id]}
                                </Box>
                            }
                            {
                                <div className='timerClass' id={row?.[templateData?.id]} name={row?.[templateData?.name]} container>
                                    <Typography id={row?.[templateData?.id]} name={row?.[templateData?.name]}> </Typography>
                                </div>
                            }
                            {
                                singleField.position==="down" &&
                                <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                    {row[singleField.id]}
                                </Box>
                            }
                        </>
                    );
                })
            );
        } else if (templateData.type === "editableInputField"){
            return (
                <>
                    {row[templateData.id] === "edit" ?
                        <Input
                            id={columnId + "Edit_" + row[props.uniqueField]?.toString()}
                            name={columnId + "Edit_" + row[props.uniqueField]?.toString()}
                            value={row[columnId]}
                            onChange={(e) => {templateData.onchangeAction(e, columnId)}}
                            className={templateData.inputClass}
                            size="small"
                            variant="outlined"
                            type={templateData.inputType}
                            error={templateData.error || row[templateData.errorVariable]} 
                            placeholder={templateData.placeholder || "Enter Value"}
                        />
                    :
                        row[columnId]
                    }
                </>
            )
        } else if (templateData.type === "editableDropDownField"){
            return (
                <>
                    {row[templateData.id] === "edit" ?
                    <Grid className={classes.tableDropDown}>
                        <DropDown
                            id={columnId + "Edit_" + row[props.uniqueField].toString()}
                            name={columnId + "Edit_" + row[props.uniqueField].toString()}
                            optionData={templateData.optionData}
                            value={row[columnId]}
                            onChange={(e) => {templateData.onchangeAction(e, columnId,row[props.uniqueField] )}}
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    :
                    templateData.fieldList.map((singleField) => {
                        return (
                            <>
                                {/* if tooltip is needed*/}
                                {
                                    singleField.isToolTip &&
                                    <Tooltip title={singleField.name} placement={singleField.toolTipPosition} arrow={singleField.istoolTipArrow}>
                                        <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                            {row[singleField.id]}
                                        </Box>
                                    </Tooltip>
                                }
                                {/* if tooltip is not needed */}
                                {
                                    !singleField.isToolTip &&
                                    <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                        {row[singleField.id]}
                                    </Box>
                                }
                            </>
                        );
                    })
                    }
                </>
            )
        }else if (templateData.type === "radioField"){
            return(
                <RadioButton
                    name={`default_${row[props.uniqueField]}`} 
                    color="primary"
                    getRadioSelection = { (name, value) => {} }
                    getSelectedRadioObj= { (name, value, data) => { templateData.radioChangeAction(row[props.uniqueField], value, data) } }
                    initialValue = { row[templateData.valueField] }
                    radioData={ templateData.radioFields }
                />
            );
        }else if (templateData.type === "editableInputAndDropdown"){
            return (
                <Grid container xs={12} wrap={templateData?.fieldGridWrap} spacing={templateData?.gridSpacing} className={templateData?.fieldGridWrapperClass}>
                    <Grid container className={templateData?.inputFieldGrid} item xs={templateData?.gridInputSize ? templateData?.gridInputSize : 6}>
                        <Input
                            id={"input_" + row[props.uniqueField].toString()+ "_" + columnId}
                            name={"input_" + row[props.uniqueField].toString()+ "_" + columnId}
                            value={row[templateData?.inputColumnId]}
                            onChange={(e) => {templateData.onFieldChange && templateData.onFieldChange(e,"Input", e.target?.value)}}
                            className={templateData.inputClass}
                            size={templateData.inputSize?templateData.inputSize:"small"}
                            variant={templateData.inputVariant? templateData.inputVariant : "outlined"}
                            type={templateData.inputType}
                            disabled={templateData.disabledInput || (templateData.disabledInputVariableName && row?.[templateData.disabledInputVariableName])}
                            InputProps={{
                                error: templateData.inputErrorVariableName && row[templateData.inputErrorVariableName]
                            }}
                            {...(templateData?.inputProps ? templateData.inputProps : {})}
                        />
                    </Grid>
                    <Grid container className={templateData?.dropdownGrid} item xs={templateData?.gridDropdownSize ? templateData?.gridDropdownSize : 6}>
                        <DropDown
                            id={"dropdown_" + row[props.uniqueField].toString()+ "_" + columnId}
                            name={"dropdown_" + row[props.uniqueField].toString()+ "_" + columnId}
                            optionData={templateData.optionData}
                            value={row[templateData?.dropdownColumnId]}
                            onChange={(e) => {templateData.onFieldChange && templateData.onFieldChange(e,"DropDown", templateData.optionData.find(dropDownOpt=>`${dropDownOpt?.id}`===`${e.target.value}`))}}
                            className={templateData.dropDownClass}
                            color={templateData.dropdownColor}
                            size={templateData.dropdownSize?templateData.dropdownSize:"small"}
                            variant={templateData.dropdownVariant? templateData.dropdownVariant : "outlined"}
                            disabled={templateData.disabledDropdown ||  (templateData.disabledDropdownVariableName && row?.[templateData.disabledDropdownVariableName])}
                        />
                    </Grid>
                    
                </Grid>);  
        }else if (templateData.type === "truncatedText") {
            return (
                <Box display="flex">
                    <Typography className={templateData?.wordTypo}>
                    {row[columnId]?.length > templateData?.maxWordCount
                        ? row[columnId]?.slice(0, templateData?.maxWordCount)
                        : row[columnId]}
                    </Typography>
                    {row[columnId]?.length > templateData?.maxWordCount && (
                    <Tooltip
                        title={row[columnId]}
                        placement="top"
                        arrow={true}
                    >
                        <Box display="flex" alignItems="center" className={classes.clickableBlock}>
                            <Typography className={classes.clickableBlock}>...</Typography>
                            {templateData?.isToolTipImage && (
                                <img
                                    src={templateData?.iconLink}
                                    alt="info"
                                    height={templateData?.iconLinkHeight ? templateData?.iconLinkHeight : 18}
                                    style={{ marginLeft: 5 }}
                                />
                            )}
                            {!templateData?.isToolTipImage && (
                                <Typography style={{ marginLeft: 5 }}>...</Typography>
                            )}
                    </Box>
                        {/* <Typography className={classes.clickableBlock}>...</Typography> */}
                    </Tooltip>
                    )}
                </Box>
            );
        }else if(templateData.type === "editableDateField") {
            return (
                <>
                     {row[templateData.editVariableName] ?
                        <LocalizationProvider  utils={DateFnsUtils}>
                            <DatePicker 
                                className={templateData.datePickerClass}
                                disableToolbar={templateData.disableToolbar}
                                variant={templateData.datePickerVariant || 'inline'}
                                format={ templateData.datePickerFormat || 'dd/MM/yyyy'}
                                id={"datePicker_" + row[props.uniqueField].toString()+ "_" + columnId}
                                fullWidth={templateData.isDatePickerFullWidth}
                                inputVariant={templateData.inputVariant || 'outlined'}
                                disableFuture={templateData.datePickerDisableFuture}
                                autoOk={templateData.autoOk}
                                keyboardIcon={templateData.keyboardSvgIcon ? templateData.keyboardSvgIcon : <img src={templateData.keyboardIconSrc} height={18}/>}
                                value={ templateData.dateValueParseFormat ? moment(row[templateData?.datePickerColumnId],templateData.dateValueParseFormat ) : row[templateData?.datePickerColumnId]}
                                minDate={templateData.minDate|| templateData.minDateField && moment(row[templateData.minDateField])}                                
                                minDateMessage={templateData.minDateMessage || getLabel({ module: "common", label: "dateShouldNotBeBeforeCurrentDate" }) }
                                maxDate={templateData.maxDate || templateData.maxDateField && moment(row[templateData.maxDateField])}
                                maxDateMessage={templateData.maxDateMessage|| getLabel({ module: "common", label: "dateShouldNotBeAboveCurrentDate" }) }
                                onChange={selectedDate => {
                                    templateData.onDatePickerChange && templateData.onDatePickerChange(selectedDate, row[props.uniqueField], index )
                                }}
                            />
                        </LocalizationProvider >
                    :
                    templateData.dateValueParseFormat 
                        ? 
                        moment(row[templateData?.datePickerColumnId],templateData.dateValueParseFormat ).format(templateData.fieldDateFormat  || 'DD/MM/YYYY')
                        : 
                        moment(row[templateData?.datePickerColumnId]).format(templateData.fieldDateFormat  || 'DD/MM/YYYY')
                    }
                </>
            )
        }else if(templateData.type === "tagAndButtonField"){
            return (
                <>
                {
                    row?.[templateData?.tagOrButtonVariableName] ? (
                        <Chip 
                            variant={templateData?.tagVariant || "default"}
                            color={templateData?.tagColor || 'primary'}
                            label={templateData?.tagLabel}
                            className={templateData?.primaryChipClass}
                            {...(templateData?.tagProps||{})}
                        />
                    ) : (
                        <Button 
                            variant={templateData?.buttonVariant || 'contained'} 
                            onClick={(e)=>templateData?.onButtonClick && templateData.onButtonClick(e, row)} 
                            className={templateData?.primaryButtonClass}
                            {...(templateData?.buttonProps||{})}
                        >
                            {templateData?.buttonLabel}
                        </Button>
                    )
                }
                </>
            )
        } else if (templateData.type === "arrayMultipleTextFieldsFlex") {
            let combinedValues = row[templateData?.id];
            // console.log(combinedValues,"11111")
            let slicedValue = combinedValues?.length > 10 ? combinedValues.slice(0, 8) + "..." : combinedValues;
            return (
                    <Box className={classNames(classes && classes.tableCell, templateData.optionClass)}>
                        <Grid container>
                            <Grid item xs={true} className={templateData?.optionLabelClass}>
                                {slicedValue}
                            </Grid>
                            {templateData?.isToolTip && row[templateData.id]?.length > 0 && <Grid item xs="auto" >
                                <Tooltip title={combinedValues} placement={templateData.toolTipPosition} arrow={templateData?.istoolTipArrow} classes={templateData?.optionTooltipClasses}>
                                    <img
                                        alt="" 
                                        id={ templateData?.id + "_" + row?.[props?.uniqueField]?.toString && row[props.uniqueField].toString() }
                                        name={ combinedValues }
                                        className={templateData?.iconClass} 
                                        src={templateData?.iconLink} 
                                        height={18} 
                                    />
                                </Tooltip>
                            </Grid>}
                        </Grid>
                    </Box>
                    );
        } else if ((templateData.type === "autoComplete")) {
            const autoCompleteStyle = {
                width: "200px", // Set the desired width
                height: "30px", // Set the desired height
            };
            return (
                <> 
                {/* { console.log(templateData.conditionalRendering && row[templateData.conditionalRendering],"RRRRRR")} */}
                {console.log(templateData.optionData,"templateData.optionData")}
                {
                (!templateData?.conditionalRendering || (templateData.conditionalRendering && row[templateData.conditionalKey] )) && 
                    <Grid item md={1} lg={1} sm={1} xm={1}
                        id={columnId + "AutoComplete_" + row[props.uniqueField].toString()}
                        name={columnId + "AutoComplete_" + row[props.uniqueField].toString()}
                    >
                    <Box
                        display="flex"
                        alignItems="center"
                        className={templateData.styles}
                        mr={1}
                        mb={1}
                        flexGrow={1}
                    >
                    <Box mr={1}>
                        <img src={templateData.icon} height={templateData.iconHeight} />
                    </Box>
                    <Autocomplete
                        disablePortal
                        id={"autoComplete" + row[props.uniqueField].toString()}
                        optionData={templateData.optionData?.map((item)=> {return(item?.name)})}
                        // onChange={""}
                        // value={""}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            margin="dense"
                            variant="outlined"
                            placeholder={templateData?.placeholder}
                            inputProps={{
                                style: { color:"#003761" }, 
                            }}
                        />
                            )}               
                    />
                    </Box>
                    </Grid>
                }
                </>
            );
        } else if ((templateData.type === "labelWithText")) {
            return (
            <>
                {
                (!templateData?.conditionalRendering || (templateData?.conditionalRendering && row[templateData?.conditionalKey])) &&
                <div style={{ display: "flex", alignItems: "center" }}
                    id={columnId + "TextField_" + row[props.uniqueField].toString()}
                    name={columnId + "TextField_" + row[props.uniqueField].toString()}
                >
                    <Typography className={templateData.lableClass}>{templateData.label}</Typography>
                    <Typography className={templateData.valueClass}>{templateData.labelValue}</Typography>
                </div>
                }
            </>
            );
        } else if ((templateData.type === "labelWithInputField")) {
            return (
            <>
            {
                (!templateData?.conditionalRendering || (templateData?.conditionalRendering && row[templateData?.conditionalKey]))&&
                    <Grid container style={{display:"flex",flexDirection:"row"}} 
                        id={columnId + "InputField_" + row[props.uniqueField].toString()}
                        name={columnId + "InputField_" + row[props.uniqueField].toString()}
                    >
                        <Grid item>
                            <Typography style={{color:"#003761", fontSize:"12px",marginTop:"45%",marginRight:"2px"}}>{templateData.valueProp}</Typography>
                        </Grid>
                        <Grid item>
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '8ch', mxHeight:'3rem'},
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField
                             id="outlined-basic" 
                             type="number"  
                             value={row[columnId]}
                             onChange={(e) => {templateData.onHeaderChangeAction(e.target.value)}}
                             variant="outlined" 
                             />
                            </Box>
                        </Grid>
                    </Grid>
            }
            </>
            );
        }else if((templateData.type === "singleIconBtn")){
            return(
            <>
            {
                (!templateData?.conditionalRendering || (templateData?.conditionalRendering && row[templateData?.conditionalRendering])) &&
                    <IconButton   
                        id={columnId + "IconBtn_" + row[props.uniqueField].toString()}
                        name={columnId + "IconBtn_" + row[props.uniqueField].toString()}
                        aria-label="calendar"
                    >
                    <img 
                        src={templateData?.icon}
                        height={templateData.height}
                        alt={templateData.alt}
                    />
                    </IconButton>
            }
            </>
            )
        }else if (templateData.type === "oneLinetwoTextFields") {
            return (
                <div className={classNames(classes && classes.twoLineTextFieldsContainer)} style={{display:"flex"}}>
                    {templateData.fieldList.map((singleField) => (
                        <div key={singleField.id} className={classNames(classes && classes.twoLineTextFieldsItem, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass)))}>
                            {/* if tooltip is needed */}
                            {singleField.isToolTip && (
                                <Tooltip title={singleField.name} placement={singleField.toolTipPosition} arrow={singleField.istoolTipArrow}>
                                    <Box>
                                        <span style={{marginRight:"3px"}}>
                                            {row[singleField.id]}
                                        </span>
                                    </Box>
                                </Tooltip>
                            )}
                            {/* if tooltip is not needed */}
                            {!singleField.isToolTip && (
                                <span style={{marginRight:"2px"}}>
                                    {row[singleField.id]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            );
        }else if (templateData.type === "editableSelectionAutoCompleteField") {
            console.log(templateData,'templateDatatemplateData')
            return (
                <>
                    {row[templateData.id] === "edit" ?
                    <Grid className={classes.tableDropDown}>
                       <SelectionAutoComplete
                        dataList={templateData.dataList}
                        autoCompleteId={columnId + "Edit_" + row[props.uniqueField].toString()}
                        autoCompleteClass="autocompleteChipInput"
                        autoCompleteSize="small"
                        autoCompleteVariant="outlined"
                        selectedValue={templateData.selectedValue}
                        placeholder={templateData.placeholderText}
                        multiple
                        freeSolo
                        filterSelectedOptions
                        style={{ width: "87%", margin: 0 }}
                        error={false}
                        disabled={false}
                        autoCompleteDisplayName="name"
                        getOptionDisabled={(option) => option.isActive === 0}
                        getOptionSelected={(option, value) => option.id === value.id}
                        chipProps={{
                            color: "warning",
                            variant: "outlined",
                        }}
                        dropdownCallback={(event, newValue) => {
                            templateData.onchangeAction && templateData.onchangeAction(event, newValue);
                        }}
                    />
                    </Grid>
                    :
                    templateData.fieldList.map((singleField) => {
                        return (
                            <>
                                {/* if tooltip is needed*/}
                                {
                                    singleField.isToolTip &&
                                    <Tooltip title={singleField.name} placement={singleField.toolTipPosition} arrow={singleField.istoolTipArrow}>
                                        <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                            {row[singleField.id]}
                                        </Box>
                                    </Tooltip>
                                }
                                {/* if tooltip is not needed */}
                                {
                                    !singleField.isToolTip &&
                                    <Box className={classNames(classes && classes.twoLineTextFieldsClass, singleField.fieldClass, singleField.options && singleField.options.map((singleOpt) => { return ((row[singleOpt.id] === singleOpt.value) && singleOpt.conditionClass) }))} >
                                        {row[singleField.id]}
                                    </Box>
                                }
                            </>
                        );
                    })
                    }
                </>
            )
        }
    }
}