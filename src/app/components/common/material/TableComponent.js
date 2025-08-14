import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Radio} from '@mui/material';
import RowComponent from './RowComponent';
import Pagination from '@mui/material/Pagination';
import '../CommonStyle.scss';
import classNames from "classnames";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import cloneDeep from 'lodash/cloneDeep';
import CheckboxField from './CheckboxField';


// Calling Way
// const columnData = [
//     {
//         id: "userId",
//         name: getLabel({ module: "userManagement", label: "user id" }),
//         template: {
//             type: "AnchorTag",
//             redirectLink: "/infirma/userManagement/users/userInfo?UserId=",
//             redirectId: "userId",
//         },
//         isSort: true
//         width: "10%" 
//     },
//     {
//         id: "action",
//         name: "",
//         template: {
//             type: "clickableIconBlock",
//             icons: [
//                 {
//                     id: "edit",
//                     name: "Edit",
//                     iconName:"edit", ///Material UI icon name
//                     istoolTipArrow:true,
//                 },
//             ]
//         },
//         columnClass: "",
//         contentClass: "text-center",
//         isSort: true
//         width: "10%" 
//     },
// ];

// <TableComponent 
//     columns={columnData}
//     rows={this.state.filteredUserList}
//     uniqueField="userId"
//     onClickHandler={this.userTableAction}
//     tableclass=""
//     tableHeaderClass=""
//     pageDataCount= 0
//     sortAction={ (ColumnField) => { console.log("sortOnClickAction", ColumnField) } }
//     apiHandlePagination=true/false
//     handlePagination={this.handlepagination}
//     datatotalCount=0
//     pageNo={this.state.pageNo} // if pagination is not handled in api level then pageNo should be 1
//     classes={objectiveClasses}
// />

// can use style classes also instead of scss. For that need to pass Styles class file as  props  "classes={objectiveClasses}"
// Added for header and icons. For header use "tableHeaderStyle" and icon "iconStyle" 
// tableHeaderStyle:{
//     color:theme.palette.brandPrimary.dark + '!important',
//     fontSize:theme.typography.fontSize+ "px",
//     fontWeight:"500",
// },

// iconStyle:{
//     color:theme.palette.brandPrimary.dark + '!important'
// }

export default function TableComponent(props) {

    const [currentPage, setcurrentPage] = useState(props.pageNo);
    const [rows, setRows] = useState([]);
    const [sortedRows, setSortedRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [sortedColumnName, setSortedColumnName] = useState("");
    const [colorRows, setColorRows] = useState([]);

    const [isLoadSpinner, setIsLoadSpinner] = useState(false);
    let classes = props.classes;
    

    useEffect(() => {
        setcurrentPage(props.pageNo);
    },[props.pageNo]);

    useEffect(() => {
        if (!props.isPagination || props.apiHandlePagination){
            setRows(props.rows);
        }else if(!props.apiHandlePagination){
            let filteredRow = props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
            setRows(filteredRow);
        }
    },[props.rows]);

    useEffect(() => {
        if (props.apiHandlePagination) {
            setRows([...props.rows]);
        }else if(props.isPagination){
            let filteredRow = sortedColumnName ? 
            sortedRows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
            :
            props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount);
            setRows(filteredRow);
        }
    }, [currentPage]);

    useEffect(() => {
        setColorRows(props.selectedRow);
    }, [props.selectedRow]);

    useEffect(() => {
        setColorRows(props.selectedRow);
    }, [props.selectedRow]);

    useEffect(() => {
        setColumns(props.columns);
    }, [props.columns]);

    useEffect(() => {
        setcurrentPage(props.pageNo);
    },[props.pageNo]);

    const columnSortAction = (clickedColumn) => {
        // set the pagination to initial stage again
        setcurrentPage(1);
        columns.map((singleColumn) => {
            if(singleColumn.id.toString() === clickedColumn.id.toString()){
                if(!singleColumn.sortType){
                    singleColumn["sortType"] = "asc"
                }else {
                    singleColumn["sortType"] = (singleColumn.sortType === "asc") ? "desc" : "";
                }

                // handle the sort action if it is not backend side pagination
                if(!props.apiHandlePagination){
                    let sortedRowData = [];
                    if((singleColumn["sortType"] === "asc") || (singleColumn["sortType"] === "desc")){
                        setSortedColumnName(clickedColumn.id);
                        let paginationLessSortedData = cloneDeep(props.rows).sort(function(a,b){
                            if ( a[clickedColumn.id] < b[clickedColumn.id] ){
                                return (singleColumn["sortType"] === "asc") ? -1 : 1;
                            }
                            if ( a[clickedColumn.id] > b[clickedColumn.id] ){
                                return (singleColumn["sortType"] === "asc") ? 1 : -1;
                            }
                            return 0;
                        });
                        setSortedRows([...paginationLessSortedData]);
                        sortedRowData = paginationLessSortedData.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
                    }else{
                        setSortedColumnName("");
                        sortedRowData = props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
                    }
                    setRows([...sortedRowData]);
                }else{
                    if(props.sortAction){
                        props.sortAction(singleColumn.id);
                    }
                }
            }else{
                singleColumn["sortType"] = ""
            }
        });
        setColumns([...columns]);
    };

    return (
        <Grid container style={{ position: "relative" }}>
            {
                isLoadSpinner &&
                // <Grid container className={ classNames(classes && classes.tableSpinnerClass, props.tableSpinnerClass )}>
                <Grid container className="page-load-spinner">                    
                    <img src={require("../../../../assets/image/icons/loadingsniperNew.gif")}></img>
                </Grid>
            }
            <TableContainer component={Paper} className={ classNames(classes && classes.tableContainer, props.tableContainer )} style={{ boxShadow: 'none', border: "1px solid #E1E7F3", borderRadius: "5px" }}>
                <Table className={props.tableclass} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                columns?.map((column, columnIndex) => (
                                    <TableCell width={column.width} align={column.columnlign} key={columnIndex} className={classNames(classes && classes.tableHeaderStyle, column.columnClass)} style={{width:column.width}}>
                                        {
                                            column.isCheckbox ?
                                                <CheckboxField
                                                    id={column.id}
                                                    name={"checkbox_" + column.id.toString()}
                                                    checked={column.isChecked}
                                                    // onChange={(e) => column.onHeaderChangeAction(e)}
                                                    className={column.headerCheckboxClass}
                                                    color={column.headerCheckboxColor}
                                                    checkedIcon={column.headerCheckBoxCheckedIcon}
                                                    icon={column.headerCheckboxIcon}
                                                    iconStyle={{ fill: column.headerCheckboxIconColor }}
                                                    label={column.name}
                                                /> :
                                            // column.isChecked ?
                                            //         <Radio/>
                                            //     :
                                            column.isSort ? 
                                            <>
                                                <Box component="span" mr={1}>
                                                    { (column.sortType === "asc") && <ArrowUpwardIcon/> }
                                                    { (column.sortType === "desc") && <ArrowDownwardIcon/> }
                                                </Box>
                                                <Box id={column.id} component="span" className={ classes && classes.clickableBlock } onClick={()=>{ columnSortAction(column) }}>
                                                    {column.name}
                                                </Box>
                                            </>
                                            :
                                            <Box id={column.id} component="span">
                                                {column.name}
                                            </Box>
                                        }
                                        
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows && rows?.map((row, rowIndex) => (
                                <>
                                    <TableRow key={rowIndex} onClick={(e)=>{props.rowClickAction &&  props.rowClickAction(row) }} 
                                     style={colorRows?.some(selectedRow => selectedRow.id === row.id) ? { backgroundColor: "#E2F8FF" } : { }}// style={{backgroundColor:"yellow"}}
                                    >
                                        <RowComponent
                                            rowData={row}
                                            columns={props.columns}
                                            rowDataIndex={rowIndex}
                                            key={rowIndex}
                                            tableRowIndex={rowIndex}
                                            uniqueField={props?.uniqueField}
                                            onClickAction={(event) => { props.onClickHandler && props.onClickHandler(event) }}
                                            classes={classes}
                                            dropDownObj={props.dropDownObj}
                                            disabledDropdown={props.disabledDropdown}
                                            rowSpecificClass = {row.rowSpecificClass}
                                            isChecked = {props.isChecked}
                                        />
                                    </TableRow>
                                    { row?.childTable &&  (row?.childTableColumns || props?.childTableColumns) && (row?.childTableRows || props?.childTableRows) && (row?.childTableUniqueField || props?.childTableUniqueField) &&                                      
                                        // Table component to show child table details 
                                        <TableCell colSpan={props.columns.length} className={props.childTableStyle} >
                                            <TableComponent
                                                classes={ classes }
                                                columns={ row?.childTableColumns || props?.childTableColumns }
                                                rows={ row?.childTableRows || props?.childTableRows }
                                                uniqueField={ row?.childTableUniqueField || props?.childTableUniqueField }
                                                pageNo={ row?.childTablePageNo || props?.childTablePageNo }
                                                pageDataCount={ row?.childTablePageSize || props?.childTablePageSize }
                                                isPagination={ row?.isChildTablePagination || props?.isChildTablePagination }
                                                apiHandlePagination={ row?.childTableApiHandlePagination || props?.childTableApiHandlePagination }
                                                datatotalCount={ row?.childTableDatatotalCount || props?.childTableDatatotalCount }
                                                handlePagination={ (num) => { row.setChildTablePageNo(num) ||  props.setChildTablePageNo(num)} }
                                                tableContainer={ row.childTableContainer || props.childTableContainer }
                                            />
                                        </TableCell>
                                    }
                                </>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                props.isPagination && (rows.length > 0) &&
                <Grid container justifyContent="flex-end" className={classNames("table-mui-pagination", props.paginationClass)}>
                    <Pagination 
                        count={Math.ceil(props.datatotalCount / props.pageDataCount)} 
                        color='primary' 
                        style={{ outline: 'none' }} 
                        page={currentPage} 
                        onChange={ (e, page) => { 
                            setcurrentPage(page); 
                            setIsLoadSpinner(true); 
                            setTimeout(() => { 
                                props.apiHandlePagination && props.handlePagination(page);
                                setIsLoadSpinner(false) 
                            }, 500);
                        }} 
                        />
                </Grid>
            }
        </Grid>
    );
}