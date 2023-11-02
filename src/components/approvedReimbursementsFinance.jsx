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
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations";
import { Error, Loader } from "./loader";

const getTypeDescription = (type) => {
  switch (type) {
    case "ta":
      return "Travel Expense";
    case "pa":
      return "Purchase Expense";
    case "fa":
      return "Meal Expense";
    case "aa":
      return "Acco Expense";
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

  const { loading, error, data, refetch } = useQuery(
    GET_APPROVED_REIMBURSEMENTS,
    {
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
    }
  );

  const [updateReimbursements, { updateData, updateLoading, updateError }] =
    useMutation(UPDATE_REIMBURSEMENTS, {
      onCompleted: () => {
        refetch({
          context: {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
        });
      },
    });

  if (loading) return <Loader/>;
  if (error) return <Error/>;

  const handleBulkApproveSubmit = () => {
    updateReimbursements({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        reimbursementsUpdateInput: {
          ids: selectionModel,
          reimbursementInput: {
            isApproved: true,
          },
        },
      },
    });
  };

  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

 
  const formatDateString = (dateString) => {
    const dateParts = dateString.split("/");
    if (dateParts.length === 3) {
      const day = dateParts[1];
      const month = dateParts[0];
      const year = dateParts[2];
      const months = [
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
      if (parseInt(month) >= 1 && parseInt(month) <= 12) {
        return `${day} ${months[parseInt(month) - 1]}`;
      }
    }
    return "Invalid Date";
  };

  const reimbursements = data.approvedReimbursements.map(
    (reimbursement, index) => {
      const fromDateString = formatDateString(reimbursement.fromDate);
      const toDateString = formatDateString(reimbursement.toDate);
      if (
        fromDateString !== "Invalid Date" &&
        toDateString !== "Invalid Date"
      ) {
        return {
          id: reimbursement._id,
          title: reimbursement.title,
          fromDate: fromDateString,
          toDate: toDateString,
          type: getTypeDescription(reimbursement.type),
          askedAmount: reimbursement.askedAmount,
          expenses: reimbursement.expenses,
          description: reimbursement.description,
        };
      } else {
        console.error(
          "Invalid date format:",
          reimbursement.fromDate,
          reimbursement.toDate
        );
      }
    }
  );

  const columns = [
    { field: "title", headerName: "Title", flex: 1.4 },
    { field: "type", headerName: "Type", flex: 1.6 },
    { field: "fromDate", headerName: "From Date", flex: 0.8 },
    { field: "toDate", headerName: "To Date", flex: 0.8 },
    { field: "askedAmount", headerName: "Ask", flex: 0.7 },
  ];

  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    if (dateParts.length === 3) {
      const day = dateParts[1];
      const month = dateParts[0];
      const year = dateParts[2];
      const months = [
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
      if (parseInt(month) >= 1 && parseInt(month) <= 12) {
        return `${day} ${months[parseInt(month) - 1]}`;
      }
    }
    return "Invalid Date";
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
            width="40vw"
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
                    // backgroundColor: 'yellow',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "self-start",
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
                        defaultValue={`₹${expense.amount}`}
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
                        defaultValue={expense.invoiceId}
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
                        defaultValue={expense.establishment}
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
                        defaultValue={formatDate(expense.date)} // Format the date here
                        variant="standard"
                        style={{ width: "3ch" }}
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

export default ApprovedReimbursementsFinance;
