import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, Button, Grid, TextField, IconButton, Typography, Slide, Box, Stack, Autocomplete
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Snackbar from "../../../common/Snackbar";
import classNames from "classnames";
import { useStyles } from "../../../../../assets/styles/styles";

import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewBOM = ({
    isModal,
    closeAction,
    isEditMode,
    isViewMode,
    bomInfo = {},
    isRefresh,
    setIsRefresh
}) => {
    const classes = useStyles();
    const [finishedItemId, setFinishedItemId] = useState("");
    const [description, setDescription] = useState("");
    const [statusId, setStatusId] = useState(1);
    const [components, setComponents] = useState([
        { componentItemId: "", quantity: "", uom: "" }
    ]);

        // Error fields
    const [errorFields, setErrorFields] = useState({});
    
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");

    const [itemOptions, setItemOptions] = useState([]);


    useEffect(() => {
        if (isEditMode || isViewMode) {
            setFinishedItemId(bomInfo?.finishedItemId || "");
            setDescription(bomInfo?.description || "");
            setStatusId(bomInfo?.statusId || 1);
            setComponents(
                bomInfo?.components?.length
                    ? bomInfo.components.map(c => ({
                        componentItemId: c.componentItemId,
                        quantity: c.quantity,
                        uom: c.uom
                    }))
                    : [{ componentItemId: "", quantity: "", uom: "" }]
            );
        } else {
            setFinishedItemId("");
            setDescription("");
            setStatusId(1);
            setComponents([{ componentItemId: "", quantity: "", uom: "" }]);
        }
    }, [isEditMode, isViewMode, bomInfo, isModal]);

    const handleComponentChange = (idx, field, value) => {
        const updated = [...components];
        updated[idx][field] = value;
        setComponents(updated);
    };

    const addComponent = () => {
        
        const last = components[components.length - 1];
        // Only add a new item if the last item is fully filled
        if (
            last.componentItemId &&
            last.quantity &&
            last.uom
        ) {
            setComponents([
                ...components,
                {
                    componentItemId: "",
                    quantity: "",
                    uom: "",
                },
            ]);
        } else {
            setSnackVariant("error");
            setSnackText("Please fill all fields before adding a new component.");
        }
    };

       const isLastItemValid = () => {
        const lastItem = components[components.length - 1];

        if (lastItem.componentItemId &&
            lastItem.quantity &&
            lastItem.uom) {
                return true;
        } else {
            setSnackVariant("error");
            setSnackText("Please fill all fields in New Item before saving a BOM.");
            return false;
        }
        
    };

       

    const removeComponent = (idx) => {
        if (components.length > 1) {
            setComponents(components.filter((_, i) => i !== idx));
        }
    };

    useEffect(() => {
        const getItemOptionData = () => {
            let itemDataSearchUrl = API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace(
                "{companyId}",
                JSON.parse(localStorage.getItem("userDetail")).companyId
            );
            const requestBody = {
                url: itemDataSearchUrl,
                method: "GET",
            };
            const successCallback = (response) => {
                if ((response?.status === 200 || response?.status === 201) && response?.data) {
                    let tempItemOptions = response?.data?.map((option) => ({
                        id: option?.itemId,
                        name: option?.itemName,
                    }));
                    setItemOptions(tempItemOptions);
                }
            };
            http_Request(requestBody, successCallback, () => { });
        };
        getItemOptionData();
    }, []);




     const handleSave = () => {
          
            let canSave = true;
    
    
            if (!isEditMode) {
                if (!finishedItemId) {
                    setErrorFields({ ...errorFields, finishedItemId: !finishedItemId });
                    setSnackVariant("error");
                    setSnackText("Finished Item  is Required!");
                    canSave = false;
                } else if (!description.length) {
                    setErrorFields({ ...errorFields, description: !description.length });
                    setSnackVariant("error");
                    setSnackText("Description is Required!");
                    canSave = false;
                }
            }
    
            if (!isLastItemValid()) {
                canSave = false;
            }
    
            if (canSave) {
                const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
                const payload = {
                    finishedItemId,
                    description,
                    companyId,
                    statusId: 1,

                    components: components.map(item => ({
                            bomItemId: Number(item.bomItemId) || undefined,
                        componentItemId: Number(item.componentItemId),
                        quantity: Number(item.quantity),
                        uom: item.uom
    
                    }))
    
    
                };
    
                if (isEditMode) {
                    payload["bomId"] = grnInfo.bomId;
                }
    
                http_Request(
                    {
                        url: isEditMode ? API_URL?.bom?.UPDATE_BOM.replace('{bomId}', grnInfo.bomId) : API_URL?.bom?.CREATE_BOM,
                        method: isEditMode ? "PUT" : "POST",
                        bodyData: payload,
                    },
                    function successCallback(response) {
                        if (response.status === 200 || response.status === 201) {
                            setSnackVariant("success");

                            setSnackText(`BOM ${finishedItemId} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);

                            setTimeout(() => {
                                closeAction();
                                
                                setIsRefresh(!isRefresh);
                              
                            }, 1000);
                        }
                    },
                    function errorCallback(error) {
                        console.log("BOM", error);
                        setSnackVariant("error");
                        setSnackText(`BOM ${finishedItemId} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                    }
                );
            }
    
    
    
        };
    
    

    return (
        <Dialog
            open={isModal}
            TransitionComponent={Transition}
            aria-labelledby="bom-modal-dialog-title"
            aria-describedby="bom-modal-dialog-description"
            scroll="body"
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle id="bom-modal-dialog-title" className={classes.modelHeader}>
                {isEditMode ? "Update BOM" : isViewMode ? "View BOM" : "Add BOM"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent>
                <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
                <Grid container spacing={2} style={{ marginTop: 16 }}>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            size="small"
                            options={itemOptions}
                            getOptionLabel={option => option.name || ""}
                            value={itemOptions.find(opt => opt.id === finishedItemId) || null}
                            onChange={(_, newValue) => {
                                setFinishedItemId(newValue ? newValue.id : "");
                                setErrorFields({ ...errorFields, finishedItemId: false });
                            }}
                            disabled={isViewMode}
                            renderInput={(params) => (
                                <TextField {...params} label="Finished Item" variant="outlined" fullWidth />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            size="small"
                            variant="outlined"
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => {
                                    setDescription(e.target.value);
                                    setErrorFields({ ...errorFields, description: false });
                                }}
                                error={errorFields?.description}
                            disabled={isViewMode}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Components</Typography>
                    {components.map((comp, idx) => (
                        <Grid container spacing={2} key={idx} alignItems="center" sx={{ mt: 1 }}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    size="small"
                                    options={itemOptions}
                                    getOptionLabel={option => option.name || ""}
                                    value={itemOptions.find(opt => opt.id === comp.componentItemId) || null}
                                    onChange={(_, newValue) => handleComponentChange(idx, "componentItemId", newValue ? newValue.id : "")}
                                    disabled={isViewMode}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Component Item" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="Quantity"
                                    value={comp.quantity}
                                    onChange={e => handleComponentChange(idx, "quantity", e.target.value)}
                                    fullWidth
                                    disabled={isViewMode}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="UOM"
                                    value={comp.uom}
                                    onChange={e => handleComponentChange(idx, "uom", e.target.value)}
                                    fullWidth
                                    disabled={isViewMode}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                {!isViewMode && (
                                    <Stack direction="row" spacing={1}>
                                        <IconButton onClick={addComponent} color="primary">
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeComponent(idx)} color="secondary" disabled={components.length === 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={closeAction}>
                        {isViewMode ? "Back" : "Cancel"}
                    </Button>
                    {!isViewMode && (
                        <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>
                            {isEditMode ? "Update" : "Save"}
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default NewBOM;