import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, Typography, TextField, MenuItem, Box, Autocomplete } from "@mui/material";
import Snackbar from "../../common/Snackbar";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { useStyles } from "../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";

const batchStrategies = [
  { value: "FIFO", label: "FIFO" },
  { value: "LIFO", label: "LIFO" },
  { value: "MANUAL", label: "Manual" }
];

const Production = ({ isEditMode = false, productionInfo = {}, closeAction, setIsRefresh }) => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("success");
  const [finishedItems, setFinishedItems] = useState([]);
  const [stockLocations, setStockLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [batchStrategy, setBatchStrategy] = useState("FIFO");
  const [manualBatches, setManualBatches] = useState([]);
  const [showManualGrid, setShowManualGrid] = useState(false);

  // Component items for selected finished item
  const [componentItems, setComponentItems] = useState([]);
  // For reverse calculation
  const [editableComponents, setEditableComponents] = useState([]);
  const [lastEditedComponentIdx, setLastEditedComponentIdx] = useState(null);

  // Fetch finished items and stock locations on mount
  useEffect(() => {
    // Fetch finished items
    http_Request(
      {
        url: API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId),
        method: "GET"
      },
      (response) => {
        if (response?.status === 200 || response?.status === 201) {
          setFinishedItems(response?.data || []);
        }
      },
      (error) => { }
    );
    // Fetch stock locations
    http_Request(
      {
        url: API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId),
        method: "GET"
      },
      (response) => {
        if (response?.status === 200 || response?.status === 201) {
          setStockLocations(response?.data || []);
        }
      },
      (error) => { }
    );
  }, []);

  // Fetch BOM/component items when finished item changes
  useEffect(() => {
    if (selectedItem) {
      http_Request(
        {
          url: API_URL.bom.GET_BOM_BY_FINISHED_ITEM.replace("{finishedItemId}", selectedItem),
          method: "GET"
        },
        (response) => {
          if (response?.status === 200 || response?.status === 201) {
            setComponentItems(response?.data || []);
          } else {
            setComponentItems([]);
          }
        },
        (error) => setComponentItems([])
      );
    } else {
      setComponentItems([]);
    }
  }, [selectedItem]);

  // Sync editableComponents when componentItems or quantity changes (forward calculation)
  useEffect(() => {
    if (componentItems.length > 0) {
      setEditableComponents(
        componentItems.map(comp => ({
          ...comp,
          inputQty: (Number(comp.quantity) || 0) * (Number(quantity) || 0),
          batches: comp.batches || []
        }))
      );
    } else {
      setEditableComponents([]);
    }
  }, [componentItems, quantity]);

  useEffect(() => {
    async function fetchBatchesForComponents() {
      const itemsWithBatches = await Promise.all(
        componentItems.map(
          comp =>
            new Promise(resolve => {
              const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
              http_Request(
                {
                  url: API_URL.batch.GET_ALL_BATCHES_BY_ITEM_AND_COMPANY
                    .replace("{itemId}", comp.componentItemId)
                    .replace("{companyId}", companyId),
                  method: "GET"
                },
                response => {
                  resolve({
                    ...comp,
                    batches: response?.data || []
                  });
                },
                () => {
                  resolve({
                    ...comp,
                    batches: []
                  });
                }
              );
            })
        )
      );
      setEditableComponents(
        itemsWithBatches.map(comp => ({
          ...comp,
          inputQty: (Number(comp.quantity) || 0) * (Number(quantity) || 0)
        }))
      );
    }
    if (componentItems.length > 0) fetchBatchesForComponents();
  }, [componentItems, quantity]);

  // Reverse calculation: when a component qty is edited, update finished qty and all component inputQtys
  const handleComponentQtyChange = (idx, value) => {
    const updated = [...editableComponents];
    updated[idx].inputQty = value;
    setLastEditedComponentIdx(idx);

    // Calculate finishedQty based on this component's BOM ratio
    const bomQty = Number(updated[idx].quantity) || 1;
    const newFinishedQty = bomQty ? Number(value) / bomQty : 0;

    setQuantity(newFinishedQty > 0 ? newFinishedQty : "");
    // Update all component inputQtys based on new finishedQty
    setEditableComponents(
      updated.map((comp, i) => ({
        ...comp,
        inputQty: (Number(comp.quantity) || 0) * (newFinishedQty > 0 ? newFinishedQty : 0)
      }))
    );
  };

  // Handle batch strategy change
  useEffect(() => {
    setShowManualGrid(batchStrategy === "MANUAL");
    if (batchStrategy !== "MANUAL") setManualBatches([]);
  }, [batchStrategy]);

  // Example manual batch grid (replace with real data/fetch as needed)
  const handleManualBatchSelect = (batchId, qty) => {
    setManualBatches((prev) => {
      const exists = prev.find((b) => b.batchId === batchId);
      if (exists) {
        return prev.map((b) => b.batchId === batchId ? { ...b, qty } : b);
      }
      return [...prev, { batchId, qty }];
    });
  };

  const handleSubmit = () => {
    let canSave = true;

    // Validate finished item
    if (!selectedItem) {
      setSnackVariant("error");
      setSnackText("Finished Item is required!");
      canSave = false;
    } else if (!quantity || Number(quantity) <= 0) {
      setSnackVariant("error");
      setSnackText("Finished Quantity is required and must be greater than 0!");
      canSave = false;
    } else if (!fromLocation) {
      setSnackVariant("error");
      setSnackText("From Location is required!");
      canSave = false;
    } else if (!toLocation) {
      setSnackVariant("error");
      setSnackText("To Location is required!");
      canSave = false;
    } else if (!batchStrategy) {
      setSnackVariant("error");
      setSnackText("Batch Strategy is required!");
      canSave = false;
    }

    // Manual batch validation
    if (canSave && batchStrategy === "MANUAL") {
      for (let i = 0; i < editableComponents.length; i++) {
        const comp = editableComponents[i];
        if (!comp.selectedBatchId) {
          setSnackVariant("error");
          setSnackText(`Batch No is required for component item in row ${i + 1}`);
          canSave = false;
          break;
        }
        if (!comp.inputQty || Number(comp.inputQty) <= 0) {
          setSnackVariant("error");
          setSnackText(`Quantity is required for component item in row ${i + 1}`);
          canSave = false;
          break;
        }
      }
    }

    if (canSave) {
      const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
      const requestBody = {
        productionOrderId: isEditMode ? productionInfo.productionOrderId : null,
        finishedItemId: Number(selectedItem),
        finishedQty: Number(quantity),
        fromLocationId: Number(fromLocation),
        toLocationId: Number(toLocation),
        batchStrategy: batchStrategy,
        manualPicks: batchStrategy === "MANUAL"
          ? editableComponents
              .filter(comp => comp.selectedBatchId)
              .map(comp => {
                const batchObj = (comp.batches || []).find(b => b.batchId === comp.selectedBatchId);
                return {
                  itemId: comp.componentItemId,
                  batchNo: batchObj ? batchObj.batchNumber : "",
                  qty: Number(comp.inputQty)
                };
              })
          : [],
        companyId: companyId
      };

      if (isEditMode && productionInfo.productionId) {
        requestBody["productionId"] = productionInfo.productionId;
      }

      http_Request(
        {
          url: isEditMode
            ? API_URL.production.UPDATE_PRODUCTION.replace('{productionId}', productionInfo.productionId)
            : API_URL.production.SAVE_PRODUCTION,
          method: isEditMode ? "PUT" : "POST",
          bodyData: requestBody
        },
        function successCallback(response) {
          if (response.status === 200 || response.status === 201) {
            setSnackVariant("success");
            setSnackText(`Production ${isEditMode ? "Updated" : "Created"} Successfully!`);
            setTimeout(() => {
              closeAction && closeAction();
              setIsRefresh && setIsRefresh(prev => !prev);
            }, 1000);
          }
        },
        function errorCallback(error) {
          console.log("Production", error);
          setSnackVariant("error");
          setSnackText(`Production ${isEditMode ? "Update" : "Creation"} Failed!`);
        }
      );
    }
  };

  return (
    <div className={commonClasses.dashboardContainer}>
      <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={commonClasses.resturantTitleWordTypo}>Production</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={finishedItems}
                getOptionLabel={option => option.itemName || ""}
                value={finishedItems.find(item => item.itemId === selectedItem) || null}
                onChange={(_, newValue) => {
                  setSelectedItem(newValue ? newValue.itemId : "");
                  setQuantity("1"); // Set default value to 1 when selecting a finished item
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Finished Item"
                    fullWidth
                    size="small"
                  />
                )}
                isOptionEqualToValue={(option, value) => option.itemId === value.itemId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Batch Strategy"
                value={batchStrategy}
                onChange={(e) => setBatchStrategy(e.target.value)}
                fullWidth
                size="small"
              >
                {batchStrategies.map((s) => (
                  <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="From Location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                fullWidth
                size="small"
              >
                {stockLocations.map((loc) => (
                  <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="To Location"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                fullWidth
                size="small"
              >
                {stockLocations.map((loc) => (
                  <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Show component items if any */}
            {editableComponents.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
                  Component Items
                </Typography>
                <Box mt={2} />
                <Grid container spacing={2}>
                  {editableComponents.map((comp, idx) => (
                    <React.Fragment key={idx}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Component Item"
                          value={comp.componentItemName || comp.componentItem || comp.componentItemId}
                          fullWidth
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <TextField
                          label="Quantity"
                          value={comp.inputQty}
                          onChange={e => handleComponentQtyChange(idx, e.target.value)}
                          fullWidth
                          size="small"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <TextField
                          label="UOM"
                          value={comp.uom}
                          fullWidth
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            )}

            {showManualGrid && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Select Batches (Manual)</Typography>
                <Box mt={2} />
                <Grid container spacing={2}>
                  {editableComponents.map((comp, idx) => (
                    <React.Fragment key={idx}>
                      <Grid item xs={12} md={5}>
                        <TextField
                          label="Component Item"
                          value={comp.componentItemName || comp.componentItem || comp.componentItemId}
                          fullWidth
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <TextField
                          select
                          label="Batch No"
                          value={comp.selectedBatchId || ""}
                          onChange={e => {
                            const updated = [...editableComponents];
                            updated[idx].selectedBatchId = e.target.value;
                            setEditableComponents(updated);
                          }}
                          fullWidth
                          size="small"
                        >
                          {(comp.batches || []).map(batch => (
                            <MenuItem key={batch.batchId} value={batch.batchId}>{batch.batchNumber
                            }</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {isEditMode ? "Update Production" : "Create Production"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Production;