import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../src/theme";
import { useMode } from "../../src/theme";
import { useQuery, gql, useMutation } from "@apollo/client";
import { UPDATE_REIMBURSEMENTS } from "../gqloperations/mutations";

const ADMIN_FETCH_REQUESTS = gql`
  query PendingReimbursements {
    pendingReimbursements {
      _id
      title
      description
      type
      visitLocation
      noOfDays
      fromDate
      toDate
      askedAmount
      totalAmount
      isPreApproved
      isApproved
      expenses {
        amount
        description
        approved
        by
      }
    }
  }
`;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  const reimbursements = data.pendingReimbursements.map(
    (reimbursement, index) => {
      // Date format change karne ke liye
      const fromDate = new Date(reimbursement.fromDate);
      const toDate = new Date(reimbursement.toDate);

      const formattedFromDate = `${fromDate.getDate()} ${fromDate.toLocaleString(
        "en-US",
        { month: "short" }
      )}`;
      const formattedToDate = `${toDate.getDate()} ${toDate.toLocaleString(
        "en-US",
        { month: "short" }
      )}`;

      return {
        //API se data fetch karne ke liye to show in table and form
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
            backgroundColor: "yellow",
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
      </Box>

      {isFormOpen && selectedRowData && (
        <div
          style={{
            position: "relative",
            marginTop: "0.9em",
            marginLeft: "7.6em",
            width: "calc(70% - 8.8em)",
            backgroundColor: "white",
            maxHeight: "82vh",
            overflowY: "auto",
            borderLeft: "2px solid #ccc",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <h4
              style={{
                marginBottom: "0.5em",
                fontSize: "x-large",
                fontSize: 50,
                fontWeight: 400,
                marginLeft: "-4.4em",
                color: colors.blueAccent[200],
              }}
            >
              {selectedRowData.description}
            </h4>
            <Typography
              style={{
                fontSize: "xx-large",
                marginTop: "-2.3em",
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
                  marginLeft: "-12.5em",
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
                    style={{ width: "4ch" }}
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

export default PreApproveRequest;
