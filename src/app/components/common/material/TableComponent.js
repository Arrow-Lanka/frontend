import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Radio } from '@mui/material';
import RowComponent from './RowComponent';
import Pagination from '@mui/material/Pagination';
import '../CommonStyle.scss';
import classNames from "classnames";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import cloneDeep from 'lodash/cloneDeep';
import CheckboxField from './CheckboxField';

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
    }, [props.pageNo]);

    useEffect(() => {
        if (!props.isPagination || props.apiHandlePagination) {
            setRows(props.rows);
        } else if (!props.apiHandlePagination) {
            let filteredRow = props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
            setRows(filteredRow);
        }
    }, [props.rows]);

    useEffect(() => {
        if (props.apiHandlePagination) {
            setRows([...props.rows]);
        } else if (props.isPagination) {
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
        setColumns(props.columns);
    }, [props.columns]);

    useEffect(() => {
        setcurrentPage(props.pageNo);
    }, [props.pageNo]);

    const columnSortAction = (clickedColumn) => {
        setcurrentPage(1);
        columns.map((singleColumn) => {
            if (singleColumn.id.toString() === clickedColumn.id.toString()) {
                if (!singleColumn.sortType) {
                    singleColumn["sortType"] = "asc"
                } else {
                    singleColumn["sortType"] = (singleColumn.sortType === "asc") ? "desc" : "";
                }

                if (!props.apiHandlePagination) {
                    let sortedRowData = [];
                    if ((singleColumn["sortType"] === "asc") || (singleColumn["sortType"] === "desc")) {
                        setSortedColumnName(clickedColumn.id);
                        let paginationLessSortedData = cloneDeep(props.rows).sort(function (a, b) {
                            if (a[clickedColumn.id] < b[clickedColumn.id]) {
                                return (singleColumn["sortType"] === "asc") ? -1 : 1;
                            }
                            if (a[clickedColumn.id] > b[clickedColumn.id]) {
                                return (singleColumn["sortType"] === "asc") ? 1 : -1;
                            }
                            return 0;
                        });
                        setSortedRows([...paginationLessSortedData]);
                        sortedRowData = paginationLessSortedData.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
                    } else {
                        setSortedColumnName("");
                        sortedRowData = props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
                    }
                    setRows([...sortedRowData]);
                } else {
                    if (props.sortAction) {
                        props.sortAction(singleColumn.id);
                    }
                }
            } else {
                singleColumn["sortType"] = ""
            }
        });
        setColumns([...columns]);
    };

    return (
        <Grid container style={{ position: "relative" }}>
            {
                isLoadSpinner &&
                <Grid container className="page-load-spinner">
                    <img src={require("../../../../assets/image/icons/loadingsniperNew.gif")}></img>
                </Grid>
            }
            <TableContainer component={Paper} className={classNames(classes && classes.tableContainer, props.tableContainer)} style={{ boxShadow: 'none', border: "1px solid #E1E7F3", borderRadius: "5px" }}>
                <Table className={props.tableclass} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                columns?.map((column, columnIndex) => (
                                    <TableCell width={column.width} align={column.columnlign} key={columnIndex} className={classNames(classes && classes.tableHeaderStyle, column.columnClass)} style={{ width: column.width }}>
                                        {
                                            column.isCheckbox ?
                                                <CheckboxField
                                                    id={column.id}
                                                    name={"checkbox_" + column.id.toString()}
                                                    checked={column.isChecked}
                                                    className={column.headerCheckboxClass}
                                                    color={column.headerCheckboxColor}
                                                    checkedIcon={column.headerCheckBoxCheckedIcon}
                                                    icon={column.headerCheckboxIcon}
                                                    iconStyle={{ fill: column.headerCheckboxIconColor }}
                                                    label={column.name}
                                                /> :
                                                column.isSort ?
                                                    <>
                                                        <Box component="span" mr={1}>
                                                            {(column.sortType === "asc") && <ArrowUpwardIcon />}
                                                            {(column.sortType === "desc") && <ArrowDownwardIcon />}
                                                        </Box>
                                                        <Box id={column.id} component="span" className={classes && classes.clickableBlock} onClick={() => { columnSortAction(column) }}>
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
                            rows && rows
                                .filter(row => row && typeof row === "object" && (props.uniqueField ? row[props.uniqueField] : true))
                                .map((row, rowIndex) => (
                                    <React.Fragment key={row[props.uniqueField] || rowIndex}>
                                        <TableRow
                                            onClick={(e) => { props.rowClickAction && props.rowClickAction(row) }}
                                            style={colorRows?.some(selectedRow => selectedRow.id === row.id) ? { backgroundColor: "#E2F8FF" } : {}}
                                        >
                                            <RowComponent
                                                rowData={row}
                                                columns={props.columns}
                                                rowDataIndex={rowIndex}
                                                key={row[props.uniqueField] || rowIndex}
                                                tableRowIndex={rowIndex}
                                                uniqueField={props?.uniqueField}
                                                onClickAction={(event) => { props.onClickHandler && props.onClickHandler(event) }}
                                                classes={classes}
                                                dropDownObj={props.dropDownObj}
                                                disabledDropdown={props.disabledDropdown}
                                                rowSpecificClass={row.rowSpecificClass}
                                                isChecked={props.isChecked}
                                            />
                                        </TableRow>
                                        {row?.childTable && (row?.childTableColumns || props?.childTableColumns) && (row?.childTableRows || props?.childTableRows) && (row?.childTableUniqueField || props?.childTableUniqueField) &&
                                            <TableCell colSpan={props.columns.length} className={props.childTableStyle}>
                                                <TableComponent
                                                    classes={classes}
                                                    columns={row?.childTableColumns || props?.childTableColumns}
                                                    rows={row?.childTableRows || props?.childTableRows}
                                                    uniqueField={row?.childTableUniqueField || props?.childTableUniqueField}
                                                    pageNo={row?.childTablePageNo || props?.childTablePageNo}
                                                    pageDataCount={row?.childTablePageSize || props?.childTablePageSize}
                                                    isPagination={row?.isChildTablePagination || props?.isChildTablePagination}
                                                    apiHandlePagination={row?.childTableApiHandlePagination || props?.childTableApiHandlePagination}
                                                    datatotalCount={row?.childTableDatatotalCount || props?.childTableDatatotalCount}
                                                    handlePagination={(num) => { row.setChildTablePageNo(num) || props.setChildTablePageNo(num) }}
                                                    tableContainer={row.childTableContainer || props.childTableContainer}
                                                />
                                            </TableCell>
                                        }
                                    </React.Fragment>
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
                        onChange={(e, page) => {
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