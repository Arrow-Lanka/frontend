import React, { useEffect, useState } from "react";
import { useStyles } from "../../../../../assets/styles/styles";
import { UsersStyle } from "./UsersStyle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TableComponent from "../../../common/material/TableComponent";
import classNames from "classnames";
import { getLabel } from "../../../shared/localization";

export default function SingleRoleSelection(props) {
  const classes = useStyles();
  const userClasses = UsersStyle();

  const columnData = [
    {
        id: "roleId",
        name: getLabel({ module: "userManagement", label: "roleId" }),
        columnClass: "table-icdCode",
        width: "15%",
        columnClass: userClasses.tableHeader
    },
    {
      id: "roleName",
      name: getLabel({ module: "userManagement", label: "roleName" }),
      columnClass: "table-description",
      width: "40%",
      columnClass: userClasses.tableHeader
    },
    {
      id: "moduleName",
      name: "Module",
      columnClass: "table-description",
      width: "20%",
      columnClass: userClasses.tableHeader
    },
    {
        id: "action",
        name: "Action",
        width: "25%",
        template: {
            type: "clickableIconBlock",
            iconClickAction: ((e) => { props.moveAction(e) }),
            icons: [
                {
                    name: "Move",
                    id: props.type + "_move",
                    toolTipPosition: "left",
                    iconClass: classNames(classes.primaryIcon, props.type === "assigned" && userClasses.moveLeftIcon),
                    iconLink: require("../../../../../assets/image/icons/move_icon.svg"),
                }
            ],
        },
        columnClass: userClasses.tableHeader
    },
  ];

  if(props.type === "assigned"){
    columnData.unshift({
      id: "isDefault",
      name: "Default",
      columnClass: userClasses.tableHeader,
      template: {
        type: "radioField",
        valueField: "isDefault",
        radioFields: [ { label: "", value: true }],
        radioChangeAction: ( (id, value, data) => { props.radioClickAction(id, value) } )
      }
    });
  }

  return (
    <Card className={userClasses.cardPrimary}>
      <Box fontSize={14} className={userClasses.cardHeader}>
        {props.title}
      </Box>
      <CardContent>
        <TableComponent
          columns={columnData}
          rows={ props.tableRowData }
          uniqueField="roleId"
          // onClickHandler={(event) => {VisitStatus !== "COMPLETED" && props.iconClickAction(event)}}
          tableclass=""
          tableHeaderClass=""
          // pageDataCount={0}
          apiHandlePagination={true}
          // datatotalCount={0}
          // pageNo={this.state.pageNo} // if pagination is not handled in api level then pageNo should be 1
          classes={classes}
          tableContainer={ userClasses.tableContainer }
        />
      </CardContent>
    </Card>
  );
}
