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
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations";
import { Error, Loader } from "./loader";

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

const PreApproveRequest = (key, showPlusButton, addForm) => {
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

  const { loading, error, data, refetch } = useQuery(ADMIN_FETCH_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

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

  if (loading) return <Loader />;
  if (error) return <Error />;

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

  const formatDateToDDMMM = (dateString) => {
    const dateParts = dateString.split("/");

    if (dateParts.length !== 3) {
      return "Invalid Date";
    }

    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    if (month >= 1 && month <= 12) {
      const formattedDate = new Date(year, month - 1, day);
      if (isNaN(formattedDate.getTime())) {
        return "Invalid Date";
      }
      return `${day} ${formattedDate.toLocaleString("default", {
        month: "short",
      })}`;
    } else {
      const formattedDate = new Date(year, day - 1, month);
      if (isNaN(formattedDate.getTime())) {
        return "Invalid Date";
      }
      return `${day} ${formattedDate.toLocaleString("default", {
        month: "short",
      })}`;
    }
  };

  const reimbursements = data.pendingReimbursements
    .filter(
      (element) =>
        element.expenses.length > 0 &&
        element.isPreApproved &&
        !element.isApproved
    )
    .map((reimbursement, index) => {
      const fromDateStringParts = reimbursement.fromDate.split("/");
      const toDateStringParts = reimbursement.toDate.split("/");

      if (fromDateStringParts.length === 3 && toDateStringParts.length === 3) {
        const fromFormatted = formatDateToDDMMM(reimbursement.fromDate);
        const toFormatted = formatDateToDDMMM(reimbursement.toDate);

        return {
          id: reimbursement._id,
          title: reimbursement.title,
          fromDate: fromFormatted,
          toDate: toFormatted,
          type: getTypeDescription(reimbursement.type),
          askedAmount: reimbursement.askedAmount,
          expenses: reimbursement.expenses,
          description: reimbursement.description,
          purpose: reimbursement.purpose,
          place: reimbursement.visitLocation,
          Expenses: reimbursement.expenses.length,
        };
      } else {
        console.error(
          "Invalid date format:",
          reimbursement.fromDate,
          reimbursement.toDate
        );
      }
    });

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 1.2 },
    { field: "type", headerName: "Type", flex: 1.2 },
    { field: "fromDate", headerName: "From Date", flex: 1.4 },
    { field: "toDate", headerName: "To Date", flex: 1.4 },
    { field: "place", headerName: "Place", flex: 1 },
    { field: "askedAmount", headerName: "Ask", flex: 1.4 },
    { field: "Expenses", headerName: "Expenses", flex: 0.7 },
    {
      field: "claimed",
      headerName: "Claimed",
      flex: 1.4,
      valueGetter: (params) => {
        return `${calculateTotalAmount(params.row.expenses)}`;
      },
    },
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
            Approve Reimbursements
          </h4>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              handleBulkApproveSubmit();
            }}
            style={{
              marginRight: 40,
              fontSize: "medium",
              width: "10%",
              height: "50%",
            }}
          >
            Approve
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
              checkboxSelection
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
                    color:
                      selectedRowData &&
                      calculateTotalAmount(selectedRowData.expenses) >
                        selectedRowData.askedAmount
                        ? "#D0342C"
                        : "#808080",
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
                        value={formatDateToDDMMM(expense.date)}
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

export default PreApproveRequest;
