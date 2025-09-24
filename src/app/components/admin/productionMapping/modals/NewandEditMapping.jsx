import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Button, TextField, MenuItem, Slide, Autocomplete, Box, Typography
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import classNames from "classnames";
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PROCESS_TYPES = [
  { value: "STEAM", label: "Steam" },
  { value: "MILLING", label: "Milling" },
];

const NewandEditMapping = ({
  isModal = false,
  isEditMode = false,
  isViewMode = false,
  mappingInfo = {},
  closeAction = () => {},
  isRefresh,
  setIsRefresh,
}) => {
  const classes = useStyles();
  const commonClasses = FormCommonStyles();

  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  // response is a map: { "Rice": [{id, name}, ...], "Flour": [...] }
  const [categories, setCategories] = useState([]); // [{ name, items: [] }]
  const [itemsMap, setItemsMap] = useState({}); // { categoryName: [items] }

  const [inputCategory, setInputCategory] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [outputCategory, setOutputCategory] = useState("");
  const [outputItem, setOutputItem] = useState("");
  const [processType, setProcessType] = useState("");
  const [mappingId, setMappingId] = useState(null);

  const companyId = JSON.parse(localStorage.getItem("userDetail"))?.companyId;


const loadCategoryItems = useCallback((onLoaded) => {
    if (!companyId) {
      if (typeof onLoaded === "function") onLoaded({});
      return;
    }
    const url = API_URL.item.GET_ALL_ITEM_BY_CATEGORY_DETAILS.replace("{companyId}", companyId);
    http_Request(
      { url, method: "GET" },
      (res) => {
        const data = res?.data || {};
        setItemsMap(data);
        const cats = Object.keys(data || {}).map(catName => ({ name: catName, items: data[catName] || [] }));
        setCategories(cats);
        if (typeof onLoaded === "function") onLoaded(data);
      },
      (err) => {
        console.error("Failed to load items by category", err);
        setCategories([]);
        setItemsMap({});
        if (typeof onLoaded === "function") onLoaded({});
      }
    );
  }, [companyId]);

const populateFromInfo = useCallback((info = {}, itemsData = null) => {
    const data = itemsData || itemsMap || {};
    setMappingId(info.productionMappingId || info.id || null);

    const resolve = (key) => {
      if (key == null || key === "") return { id: "", category: "" };
      const idStr = String(key);
      // if key looks like an id (numeric) try id match first
      if (!isNaN(Number(key))) {
        for (const [catName, items] of Object.entries(data)) {
          const found = (items || []).find(it => String(it.id) === idStr);
          if (found) return { id: String(found.id), category: catName };
        }
        return { id: idStr, category: "" };
      }
      // otherwise try name match
      for (const [catName, items] of Object.entries(data)) {
        const found = (items || []).find(it => String(it.name) === idStr);
        if (found) return { id: String(found.id), category: catName };
      }
      return { id: "", category: "" };
    };

    // input: support inputItemId, inputItem, inputItemName
    const inputKey = info.inputItemId ?? info.inputItem ?? info.inputItemName ?? "";
    const resolvedIn = resolve(inputKey);
    setInputCategory(resolvedIn.category);
    setInputItem(resolvedIn.id);

    // output: support outputItemId, outputItem, outputItemName
    const outputKey = info.outputItemId ?? info.outputItem ?? info.outputItemName ?? "";
    const resolvedOut = resolve(outputKey);
    setOutputCategory(resolvedOut.category);
    setOutputItem(resolvedOut.id);

    setProcessType(info.processType || "");
  }, [itemsMap]);

    const resetForm = useCallback(() => {
    setMappingId(null);
    setInputCategory("");
    setOutputCategory("");
    setInputItem("");
    setOutputItem("");
    setProcessType("");
    setSnackText("");
    setSnackVariant("success");
  }, []);

  useEffect(() => {
    if (!isModal) return;

    if (isEditMode || isViewMode) {
      loadCategoryItems((loadedData) => {
        populateFromInfo(mappingInfo, loadedData);
      });
    } else {
      loadCategoryItems();
     // resetForm();
    }

    setSnackText("");
    setSnackVariant("success");
  }, [isModal, isEditMode, isViewMode, mappingInfo, loadCategoryItems, populateFromInfo, resetForm]);

  useEffect(() => {
    if (!isModal) return;

    if (isEditMode || isViewMode) {
      loadCategoryItems((loadedData) => {
        populateFromInfo(mappingInfo, loadedData);
      });
    } else {
      loadCategoryItems();
      resetForm();
    }

    setSnackText("");
    setSnackVariant("success");
   
  }, [isModal, isEditMode, isViewMode, mappingInfo]);

  const validate = () => {
    if (!processType) { setSnackVariant("error"); setSnackText("Select process type."); return false; }
    if (!inputCategory || !inputItem) { setSnackVariant("error"); setSnackText("Select input category and item."); return false; }
    if (!outputCategory || !outputItem) { setSnackVariant("error"); setSnackText("Select output category and item."); return false; }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    setLoading(true);
    const payload = {
      inputItem: Number(inputItem),
      outputItem: Number(outputItem),
      processType,
      companyId: Number(companyId),
    };

    if (isEditMode && mappingId) {
      http_Request(
        {
          url: API_URL.mapping.UPDATE_MAPPING.replace("{mappingId}", mappingId),
          method: "PUT",
          bodyData: payload,
        },
        (res) => {
          setLoading(false);
          if (res?.status === 200 || res?.status === 201) {
            setSnackVariant("success");
            setSnackText("Mapping updated.");
            setTimeout(() => {
              closeAction();
              setIsRefresh && setIsRefresh(!isRefresh);
            }, 700);
          } else {
            setSnackVariant("error");
            setSnackText("Failed to update mapping.");
          }
        },
        (err) => {
          setLoading(false);
          setSnackVariant("error");
          setSnackText("Failed to update mapping.");
          console.error(err);
        }
      );
    } else {
      http_Request(
        {
          url: API_URL.mapping.SAVE_MAPPING,
          method: "POST",
          bodyData: payload,
        },
        (res) => {
          setLoading(false);
          if (res?.status === 200 || res?.status === 201) {
            setSnackVariant("success");
            setSnackText("Mapping created.");
            setTimeout(() => {
              closeAction();
              setIsRefresh && setIsRefresh(!isRefresh);
            }, 700);
          } else {
            setSnackVariant("error");
            setSnackText("Failed to create mapping.");
          }
        },
        (err) => {
          setLoading(false);
          setSnackVariant("error");
          setSnackText("Failed to create mapping.");
          console.error(err);
        }
      );
    }
  };

  // helpers to get item lists for selected category
  const getItemsForCategory = (catName) => itemsMap?.[catName] || [];

  return (
    <Dialog
      open={isModal}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
      scroll="body"
      aria-labelledby="new-edit-mapping-title"
    >
      <DialogTitle id="new-edit-mapping-title" className={classes.modelHeader}>
        {isViewMode ? "View Mapping" : isEditMode ? "Edit Mapping" : "New Mapping"}
        <CancelIcon onClick={() => closeAction()} className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)} />
      </DialogTitle>

      <DialogContent dividers className={commonClasses.mainCardContainer}>
        <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />

        <Box mb={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Production Mapping</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
<TextField
              label="Input Item Category"
              select
              fullWidth
              size="small"
              value={inputCategory}
              onChange={(e) => {
                setInputCategory(e.target.value);
                setInputItem("");
              }}
              disabled={isViewMode}
            >
              <MenuItem value="">-- Select Category --</MenuItem>
              {categories.map(cat => <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>)}
            </TextField>

            <Box mt={1} />


   <TextField
              label="Output Item Category"
              select
              fullWidth
              size="small"
              value={outputCategory}
              onChange={(e) => {
                setOutputCategory(e.target.value);
                setOutputItem("");
              }}
              disabled={isViewMode}
            >
              <MenuItem value="">-- Select Category --</MenuItem>
              {categories.map(cat => <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>)}
            </TextField>
             

          
          </Grid>

          <Grid item xs={12} md={6}>
          <Autocomplete
              size="small"
              options={getItemsForCategory(inputCategory)}
              getOptionLabel={(opt) => opt?.name || ""}
              value={getItemsForCategory(inputCategory).find(i => Number(i.id) === Number(inputItem)) || null}
              onChange={(_, newVal) => setInputItem(newVal ? newVal.id : "")}
              disabled={isViewMode || !inputCategory}
              renderInput={(params) => <TextField {...params} label="Input Item" fullWidth size="small" />}
            />

            <Box mt={1} />

         <Autocomplete
              size="small"
              options={getItemsForCategory(outputCategory)}
              getOptionLabel={(opt) => opt?.name || ""}
              value={getItemsForCategory(outputCategory).find(i => Number(i.id) === Number(outputItem)) || null}
              onChange={(_, newVal) => setOutputItem(newVal ? newVal.id : "")}
              disabled={isViewMode || !outputCategory}
              renderInput={(params) => <TextField {...params} label="Output Item" fullWidth size="small" />}
            />
        
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Process Type"
              select
              fullWidth
              size="small"
              value={processType}
              onChange={(e) => setProcessType(e.target.value)}
              disabled={isViewMode}
            >
              <MenuItem value="">-- Select Process --</MenuItem>
              {PROCESS_TYPES.map(pt => <MenuItem key={pt.value} value={pt.value}>{pt.label}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => closeAction()} color="secondary">{isViewMode ? "Back" : "Cancel"}</Button>
        {!isViewMode && (
          <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
            {isEditMode ? "Update" : "Save"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewandEditMapping;