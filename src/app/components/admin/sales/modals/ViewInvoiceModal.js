import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment";
import JSZip from "jszip";

// Icons
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "../../../../../assets/image/icons/downloadWhite.svg";
import printerIcon from "../../../../../assets/image/icons/printerWhite.svg";

// Backend
import { http_Request } from "../../../shared/HTTP_Request";
import { API_URL } from "../../../shared/API_URLS";

// Styles
import { useStyles } from "../../../../../assets/styles/styles";
import { EInvoicesStyles } from "./EInvoicesStyles";

const ViewInvoiceModal = ({ isOpenModal, closeModalAction, selectedInvoiceId }) => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const classes = useStyles();
  const invoiceClass = EInvoicesStyles();

  useEffect(() => {
    if (selectedInvoiceId) fetchActivitiesInvoices();
  }, [selectedInvoiceId]);

  // ------------------- Helpers -------------------

  // Convert Base64 string to PDF Blob
  const base64ToBlob = (base64String) => {
    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: "application/pdf" });
    } catch (error) {
      console.error("Error converting Base64 to Blob:", error);
      return null;
    }
  };

  // ------------------- Fetch Invoice -------------------

const fetchActivitiesInvoices = async () => {
  try {
    
     const url = API_URL.report.GET_SALES_INVOICE_JR
    .replace("{fileFormat}", "PDF")
    .replace("{invoiceNo}", encodeURIComponent(selectedInvoiceId));

  console.log("Fetching PDF from:", url);
    console.log("Fetching PDF from:", url);

    // Using fetch for simplicity, but you can adapt to your http_Request wrapper
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/pdf", // important
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch PDF:", response.status, response.statusText);
      return;
    }

    // Convert response to ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    console.log("PDF ArrayBuffer byteLength:", arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      console.warn("PDF is empty! Check backend response.");
      return;
    }

    // Create Blob from ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const fileUrl = URL.createObjectURL(blob);

    const invoiceFile = {
      name: `Invoice-${selectedInvoiceId}.pdf`,
      fileUrl,
    };

    // Update state
    setInvoices([invoiceFile]);
    setSelectedInvoice(invoiceFile);

    // Optional: automatically open PDF in new tab
    // window.open(fileUrl, "_blank");

  } catch (error) {
    console.error("Error fetching or processing PDF:", error);
  }
};



  // ------------------- Download -------------------

  const handleDownloadInvoice = async () => {
    if (invoices.length === 0) {
      console.log("No invoices to download.");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("Invoices");

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];
      const res = await fetch(invoice.fileUrl);
      const blob = await res.blob();
      folder.file(invoice.name, blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "Invoices.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // ------------------- Print -------------------

  const handlePrintInvoice = () => {
    if (selectedInvoice) {
      const iframe = document.getElementById("invoiceFile");
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  // ------------------- Render -------------------

  return (
    <Dialog
      id="view-invoice-modal"
      open={isOpenModal}
      onClose={() => closeModalAction("close")}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className={classes.modelHeader}>
        {"INVOICE"}
        <CancelIcon
          onClick={() => closeModalAction("close")}
          className={classes.dialogCloseBtn}
        />
      </DialogTitle>
      <DialogContent className={invoiceClass.invoiceDialogContent}>
        {invoices.length > 0 ? (
          <Grid container>
            {/* Toolbar */}
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={invoiceClass.invoiceToolbar}
            >
              <Box>
                <Typography className={invoiceClass.invoiceToolbarTypo}>
                  {selectedInvoice?.name}
                </Typography>
              </Box>
              {/* <Box>
                <Select
                  value={selectedInvoice?.name || ""}
                  onChange={(e) =>
                    setSelectedInvoice(
                      invoices.find((inv) => inv.name === e.target.value)
                    )
                  }
                  style={{
                    color: "white",
                    background: "#FFBF00",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  {invoices.map((invoice, index) => (
                    <MenuItem key={index} value={invoice.name}>
                      {invoice.name}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton
                  className={invoiceClass.invoicePrintIcon}
                  onClick={handlePrintInvoice}
                >
                  <img height={25} src={printerIcon} alt="Print" />
                </IconButton>
                <IconButton onClick={handleDownloadInvoice}>
                  <img height={40} src={DownloadIcon} alt="Download" />
                </IconButton>
              </Box> */}
            </Grid>

            {/* PDF Preview */}
            <Grid container>
              <iframe
                title="Invoice Document"
                id="invoiceFile"
                src={selectedInvoice ? selectedInvoice.fileUrl : ""}
                width="100%"
                height="600px"
                style={{ border: "none" }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <img
              src={require("../../../../../assets/image/loadingsniperNew.gif")}
              alt="Loading..."
            />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewInvoiceModal;
