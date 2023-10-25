import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../src/theme";
import { useMode } from "../../src/theme";
import { useQuery, gql } from "@apollo/client";

const ADMIN_FETCH_REQUESTS = gql`
  query PendingReimbursements {
    pendingReimbursements {
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
  const [colorMode] = useMode();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);

    setFormOpen(true);

    if (newSelection.length > 0) {
      setSelectedRowData(reimbursements.find((row) => row.id === newSelection[0]));
    }
  };

  const calculateTotalAmount = (expenses) => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const { loading, error, data, refetch } = useQuery(ADMIN_FETCH_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const reimbursements = data.pendingReimbursements.map((reimbursement, index) => {
    // Date format change karne ke liye
    const fromDate = new Date(reimbursement.fromDate);
    const toDate = new Date(reimbursement.toDate);

    const formattedFromDate = `${fromDate.getDate()} ${fromDate.toLocaleString('en-US', { month: 'short' })}`;
    const formattedToDate = `${toDate.getDate()} ${toDate.toLocaleString('en-US', { month: 'short' })}`;

    

    return {
      //API se data fetch karne ke liye to show in table and form
      id: index,
      title: reimbursement.title,
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      type: getTypeDescription(reimbursement.type), 
      askedAmount: reimbursement.askedAmount,
      expenses: reimbursement.expenses,
      description: reimbursement.description,
    };
  });

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
          <h4
            style={{
              marginBottom: "0.5em",
              fontSize: "x-large",
              fontSize: 50,
              fontWeight: 400,
              position: "fixed",
              marginLeft: "0.5em",
              color: colors.blueAccent[200],
            }}
          >
            {selectedRowData.description}
          </h4>
          <Typography style={{ position :'relative',fontSize:'xx-large',marginTop: "0.4em", marginLeft: "10em",color:'#808080' }}>
            Amount: ₹{calculateTotalAmount(selectedRowData.expenses)}
          </Typography>
          {selectedRowData.expenses.map((expense, index) => (
            <div key={index}>
              <h6
                style={{
                  marginTop: index === 0 ? "2.4em" : "1em",
                  marginLeft: "-12em",
                  marginBottom: "1em",
                  fontSize: "0.6em",
                }}
              >
                {expense.description}
              </h6>
              <div className="innerbox" style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-read-only-input"
                    label="Amount"
                    defaultValue={`₹${expense.amount}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    style={{ width: "2em" }}
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




