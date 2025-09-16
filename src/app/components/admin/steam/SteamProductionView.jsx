import React, { useState } from "react";
import { Card, CardContent, Grid, Button, Typography } from "@mui/material";
import classNames from "classnames";
import { useStyles } from "../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import TableComponent from "../../common/material/TableComponent";
import SteamProduction from "./modals/SteamProduction";

const SteamProductionView = () => {
    const classes = useStyles();
    const commonClasses = FormCommonStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [clickedProduction, setClickedProduction] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    // Dummy columns and data for table
    const columns = [
        { id: "productionDate", name: "Production Date" },
        { id: "rawPaddyItem", name: "Raw Paddy Item" },
        { id: "batchNo", name: "Batch No" },
        { id: "fromLocation", name: "From Location" },
        { id: "toLocation", name: "To Location" },
        { id: "steamPaddyItem", name: "Steam Paddy Item" },
        { id: "paddyQuantity", name: "Paddy Quantity" },
        { id: "finalMoisture", name: "Final Moisture (%)" },
        {
            id: "action",
            name: "Action",
            template: {
                type: "actionBlock",
                actions: [
                    {
                        label: "View",
                        onClick: (row) => {
                            setClickedProduction(row);
                            setIsEditMode(false);
                            setIsViewMode(true);
                            setIsModalOpen(true);
                        }
                    },
                    {
                        label: "Edit",
                        onClick: (row) => {
                            setClickedProduction(row);
                            setIsEditMode(true);
                            setIsViewMode(false);
                            setIsModalOpen(true);
                        }
                    }
                ]
            }
        }
    ];

    // Dummy data, replace with API data
    const rows = [];

    return (
        <div className={commonClasses.dashboardContainer}>
            {isModalOpen && (
                <SteamProduction
                    isModal={isModalOpen}
                    closeAction={() => {
                        setIsModalOpen(false);
                        setIsEditMode(false);
                        setIsViewMode(false);
                        setClickedProduction({});
                    }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    productionInfo={clickedProduction}
                    setIsRefresh={setIsRefresh}
                />
            )}
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between' alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Typography className={commonClasses.resturantTitleWordTypo}>Steam Productions</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsEditMode(false);
                                    setIsViewMode(false);
                                    setClickedProduction({});
                                    setIsModalOpen(true);
                                }}
                            >
                                 Steam Production
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className={commonClasses.tableBlock}>
                        <TableComponent
                            classes={classes}
                            columns={columns}
                            rows={rows}
                            uniqueField="id"
                            isPagination={false}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default SteamProductionView;