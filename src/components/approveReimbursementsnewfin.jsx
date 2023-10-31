import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../src/theme";
import { useMode } from "../../src/theme";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_APPROVED_REIMBURSEMENTS, GET_REIMBURSEMENTS, UPDATE_REIMBURSEMENTS } from "../gqloperations/mutations";

const getTypeDescription = (type) => {
  switch (type) {
    case "ta":
      return "Travel Expense";
    case "pa":
      return "Purchase Expense";
    case "fa":
      return "Meal Expense";
    case "aa":
      return "Accommodation Expense";
    default:
      return type;
  }
};

const ApprovedReimbursementsFinance = (key, showPlusButton, addForm) => {
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
  
  const { loading, error, data } = useQuery(GET_APPROVED_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatDate = (dateString) => {
  const dateParts = dateString.split("/");
  if (dateParts.length !== 3) {
    return "Invalid Date";
  }

  const day = dateParts[0];
  const month = dateParts[1];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
    return "Invalid Date";
  }

  return `${day} ${months[parseInt(month, 10) - 1]}`;
};

const formatDateForForm = (dateString) => {
    const dateParts = dateString.split("/");
    if (dateParts.length !== 3) {
      return "Invalid Date";
    }
  
    const day = dateParts[0];
    const month = dateParts[1];
  
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      return "Invalid Date";
    }
  
    return `${day} ${months[parseInt(month, 10) - 1]}`;
  };

  const reimbursements = data.approvedReimbursements.map(
    (reimbursement, index) => {
      const formattedFromDate = formatDate(reimbursement.fromDate);
      const formattedToDate = formatDate(reimbursement.toDate);

      return {
        id: reimbursement._id,
        title: reimbursement.title,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
        type: getTypeDescription(reimbursement.type),
        askedAmount: reimbursement.askedAmount,
        expenses: reimbursement.expenses,
        description: reimbursement.description,
      };
    }
  );

  const columns = [
    { field: "title", headerName: "Title", flex: 1.4 },
    { field: "type", headerName: "Type", flex: 1.2 },
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toDate", headerName: "To Date", flex: 0.8 },
    { field: "askedAmount", headerName: "Ask", flex: 0.7 },
  ];

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
            // backgroundColor: "yellow",
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
        </div>
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
      </Box>

      {isFormOpen && selectedRowData && (
        <div
          style={{
            position: "relative",
            marginTop: "1.1em",
            marginLeft: "7.6em",
            width: "calc(70% - 8.8em)",
            backgroundColor: "white",
            maxHeight: "82vh",
            overflowY: "auto",
            borderLeft: "2px solid #ccc",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            paddingRight:'0.2em',
            paddingLeft:'0.2em',
            backgroundColor: colors.greenAccent[900],
          }}
        >
          <div
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "white",
              zIndex: 1,
              marginLeft:'-0.4em',
              width:'110%'
            }}
          >
            <h4
              style={{
                marginBottom: "0.5em",
                fontSize: "xx-large",
                // fontSize: 50,
                fontWeight: 500,
                marginLeft: "-9.8em",
                color: colors.blueAccent[200],
              }}
            >
              {selectedRowData.description}
            </h4>
            <Typography
              style={{
                fontSize: "xx-large",
                marginTop: "-1.8em",
                marginLeft: "10.4em",
                color: "#808080",
              }}
            >
              Amount: ₹{calculateTotalAmount(selectedRowData.expenses)}
            </Typography>
          </div>
          {selectedRowData.expenses.map((expense, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "0.5em",
                borderRadius: "12px",
                marginTop: "0.4em",
              }}
            >
              <h6
                style={{
                  marginTop: index === 0 ? "-0.5em" : "0.2em",
                  marginLeft: "-16em",
                  marginBottom: "1em",
                  fontSize: "0.6em",
                }}
              >
                {expense.description}
              </h6>
              <div
                className="innerbox"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "4ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  style={{ position: "relative", marginTop: "-0.16em" }}
                >
                  <TextField
                    id="standard-read-only-input"
                    label="Amount"
                    defaultValue={`₹${expense.amount}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    style={{ width: "2ch" }}
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "4ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  style={{ position: "relative", marginTop: "-0.16em" }}
                >
                  <TextField
                    id="standard-read-only-input"
                    label="#InvoiceID"
                    defaultValue={`${expense.invoiceId}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    style={{ width: "3ch" }}
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "4ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  style={{ position: "relative", marginTop: "-0.16em" }}
                >
                  <TextField
                    id="standard-read-only-input"
                    label="Establishment"
                    defaultValue={`${expense.establishment}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    style={{ width: "3ch" }}
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
                        defaultValue={
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
              defaultValue={formatDateForForm(expense.date)}
              variant="standard"
              style={{ width: "2ch" }}
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
    </>
  );
};

export default ApprovedReimbursementsFinance;
