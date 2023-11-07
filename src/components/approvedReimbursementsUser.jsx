import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../src/theme";
import { useMode } from "../../src/theme";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  ADMIN_FETCH_REQUESTS,
  GET_APPROVED_REIMBURSEMENTS,
  GET_REIMBURSEMENTS,
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations";
import { Error, Loader } from "./loader";
import * as XLSX from "xlsx";
import DropFileInput from "./drop-file-input/DropFileInput";
import { AttachFileIcon } from "./Icons";

const getTypeDescription = (type) => {
  switch (type) {
    case "ta":
      return "Travel";
    case "pa":
      return "Purchase";
    case "fa":
      return "Meal";
    case "aa":
      return "Accomodation";
    default:
      return type;
  }
};

const ApprovedReimbursementsUser = (key, showPlusButton, addForm) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);

    if (newSelection.length > 0) {
      const selectedReimbursement = reimbursements.find(
        (row) => row.id === newSelection[0]
      );
      setSelectedRowData(selectedReimbursement);
      setFormOpen(true);
    } else {
      setFormOpen(false);
      setSelectedRowData(null);
    }
  };

  const calculateTotalAmount = (expenses) => {
    return expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  };

  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });
  if (loading) return <Loader />;
  if (error) return <Error />;

  const formatDateString = (dateString) => {
    const dateParts = dateString.split("/");
    if (dateParts.length !== 3) {
      return "Invalid Date";
    }

    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (month >= 1 && month <= 12) {
      const formattedMonth = monthNames[month - 1];
      return `${day} ${formattedMonth} `;
    } else {
      return "Invalid Date";
    }
  };

  const reimbursements = data.ireimbursements
    .filter((element) => element.isPreApproved && element.isApproved)
    .map((reimbursement, index) => {
      const fromDateString = formatDateString(reimbursement.fromDate);
      const toDateString = formatDateString(reimbursement.toDate);

      return {
        id: reimbursement._id,
        title: reimbursement.title,
        fromDate: fromDateString,
        toDate: toDateString,
        type: getTypeDescription(reimbursement.type),
        askedAmount: reimbursement.askedAmount,
        expenses: reimbursement.expenses,
        description: reimbursement.description,
        purpose : reimbursement.purpose,
        visitLocation: reimbursement.visitLocation,
      };
    });
  const columns = [
    { field: "title", headerName: "Title", flex: 1.6 },
    { field: "purpose", headerName: "Purpose", flex: 1.8},
    { field: "type", headerName: "Type", flex: 1. },
    { field: "fromDate", headerName: "From Date", flex: 1.2 },
    { field: "toDate", headerName: "To Date", flex: 1.2 },
    { field: "visitLocation", headerName: "Place", flex: 1.},
    { field: "askedAmount", headerName: "Ask", flex: 1.1 },
    {
      field: "claimed",
      headerName: "Claimed",
      flex: 1.1,
      renderCell: (params) => {
        const claimedAmount = calculateTotalAmount(params.row.expenses);
        const askedAmount = params.row.askedAmount;
        const isClaimedAmountGreater = claimedAmount > askedAmount;
  
        return (
          <div style={{ color: isClaimedAmountGreater ? "red" : "inherit" }}>
            {`${claimedAmount}`}
          </div>
        );
      },
    },
  ];

  const exportToExcel = () => {
    const dataToExport = data.ireimbursements
      .filter((element) => element.isPreApproved && element.isApproved)
      .map((reimbursement) => {
        const reimbursementData = {
          Title: reimbursement.title,
          Description: reimbursement.description,
          Type: getTypeDescription(reimbursement.type),
          VisitLocation: reimbursement.visitLocation,
          NoOfDays: reimbursement.noOfDays,
          FromDate: reimbursement.fromDate,
          ToDate: reimbursement.toDate,
          AskedAmount: reimbursement.askedAmount,
        };

        if (reimbursement.expenses.length > 0) {
          reimbursement.expenses.forEach((expense, index) => {
            reimbursementData[`Expense${index + 1}_Description`] =
              expense.description;
            reimbursementData[`Expense${index + 1}_Amount`] = expense.amount;
            reimbursementData[`Expense${index + 1}_InvoiceID`] =
              expense.invoiceId;
            reimbursementData[`Expense${index + 1}_Establishment`] =
              expense.establishment;
            reimbursementData[`Expense${index + 1}_Type`] = getTypeDescription(
              expense.type
            );
            reimbursementData[`Expense${index + 1}_Date`] = expense.date;
          });
        }

        return reimbursementData;
      });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reimbursements");
    XLSX.writeFile(wb, "reimbursements.xlsx");
  };

  return (
    <>
      <Box
        style={{
          position: "absolute",
          bottom: "0px",
          left: "5em",
          right: "0px",
        }}
      >
        <div
          style={{
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            zIndex: -1,
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="banner"
        >
          <h4
            style={{
              marginLeft: 10,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Approved Reimbursements
          </h4>
          <Button
            variant="contained"
            color="primary"
            onClick={exportToExcel}
            style={{ poition: "relative", left: "-2em" }}
          >
            Export to Excel
          </Button>
        </div>

        <div
          style={{
            bottom: "0px",
            left: "5em",
            flexDirection: "row",
            display: "flex",
            right: "0px",
          }}
        >
          <Box
            height="82.3vh"
            width="42vw"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              onRowSelectionModelChange={(newRowSelectionModel) => {
                handleSelectionModelChange(newRowSelectionModel);
              }}
              rowSelectionModel={selectionModel}
              rows={reimbursements}
              columns={columns}
              getRowId={(row) => row.id}
            />
          </Box>

          {isFormOpen && selectedRowData && (
            <div
              style={{
                backgroundColor: "white",
                maxHeight: "82vh",
                overflowY: "auto",
                width: "100%",
                marginLeft: 16,
                marginRight: 16,
                paddingBottom: 16,
                right: "0px",
              }}
            >
              <div
                style={{
                  top: "0",
                  backgroundColor: "white",
                  flexDirection: "row",
                  display: "flex",
                  margin: 16,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "x-large",
                    fontSize: 30,
                    fontWeight: 500,
                    color: colors.blueAccent[200],
                  }}
                >
                  {selectedRowData.description}
                </h4>
                <Typography
                  style={{
                    fontSize: "xxx-large",
                    fontWeight: 600,
                    color: "#808080",
                  }}
                >
                  ₹{calculateTotalAmount(selectedRowData.expenses)}
                </Typography>
              </div>
              {selectedRowData.expenses.map((expense, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    marginTop: "0.4em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "self-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6
                      style={{
                        padding: 8,
                        marginBottom: "1em",
                        fontSize: "0.4em",
                        fontWeight: "400",
                      }}
                    >
                      {expense.description}
                    </h6>
                    <div>
                      {expense.attachment != null && (
                        <Button
                          variant="outlined"
                          style={{
                            margin: 10,
                          }}
                          onClick={() => {
                            if (expense.attachment != null) {
                              const url = expense.attachment; // Replace this with your desired URL
                              const newWindow = window.open(
                                url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                              if (newWindow) newWindow.opener = null;
                            }
                          }}
                          startIcon={<AttachFileIcon />}
                        >
                          View File
                        </Button>
                      )}
                    </div>
                  </div>
                  <div
                    className="innerbox"
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "3ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ position: "relative", marginTop: "-0.16em" }}
                    >
                      <TextField
                        id="standard-read-only-input"
                        label="Amount"
                        value={`₹${expense.amount}`}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        style={{ width: "2.4ch" }}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "10ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ position: "relative", marginTop: "-0.16em" }}
                    >
                      <TextField
                        id="invoiceId"
                        label="Invoice ID"
                        value={expense.invoiceId}
                        variant="standard"
                        style={{ width: "3ch" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "10ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ position: "relative", marginTop: "-0.16em" }}
                    >
                      <TextField
                        id="establishment"
                        label="Establishment"
                        value={expense.establishment}
                        variant="standard"
                        style={{ width: "3ch" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "10ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ position: "relative", marginTop: "-0.16em" }}
                    >
                      <TextField
                        id="Type"
                        label="Type"
                        value={
                          expense.type === "fe"
                            ? "Meal Expense"
                            : expense.type === "ae"
                            ? "Accommodation Expense"
                            : expense.type === "pe"
                            ? "Purchase Expense"
                            : expense.type === "te"
                            ? "Travel Expense"
                            : expense.type
                        }
                        variant="standard"
                        style={{ width: "6.4ch" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "10ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ position: "relative", marginTop: "-0.16em" }}
                    >
                      <TextField
                        id="Date"
                        label="Date"
                        value={formatDateString(expense.date)}
                        variant="standard"
                        style={{ width: "1.8ch" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ApprovedReimbursementsUser;
