import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_ALL_REIMBURSEMENTS } from "../gqloperations/mutations"; 
import { tokens } from "../../src/theme";
import Header from "./Header";
import { ColorModeContext, useMode } from "../../src/theme";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Loader, Error } from "./loader";


const customHeaderCell = (params) => {
    return (
      <Box display="flex" justifyContent="center">
        {params.label}
      </Box>
    );
  };
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
  
    const parts = dateString.split("/");
  
    if (parts.length !== 3) {
      return "Invalid";
    }
  
    const day = parts[0].toString().padStart(2, "0");
    const month = parts[1];
    const year = parts[2];
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
  
    if (month < 1 || month > 12) {
      return "Invalid";
    }
  
    return `${day} ${monthNames[month - 1]}`;
  };

  const calculateTotalAmount = (expenses) => {
    if (!expenses) {
      return 0; // Return 0 if expenses is null or undefined
    }
    
    return expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  };

const AllApprovedReimbursementsFinance = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const { loading, error, data } = useQuery(GET_ALL_REIMBURSEMENTS, {  // Use the correct query
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return <Loader />;
  if (error) return <Error />;

  if (!data || !data.reimbursements) {
    return <p>No data available</p>;
  }

  const rows = data.reimbursements.map((row, index) => ({
    id: row._id,
    title: row.title,
    description: row.description,
    type: row.type,
    visitLocation: row.visitLocation,
    expenses: row.expenses,
    noOfDays: row.noOfDays,
    fromDate: row.fromDate,
    toDate: row.toDate,
    askedAmount: row.askedAmount,
    totalAmount: row.totalAmount,
    isPreApproved: row.isPreApproved,
    purpose: row.purpose,
    sumOfExpenses: calculateTotalAmount(row.expenses),
    requestedBy: `${row.by.firstName} ${row.by.lastName}`, // Combine firstName and lastName
  }));
  

  const columns = [
    { field: "title", headerName: "Title", flex: 1, headerRender: customHeaderCell },
    { field: "purpose", headerName: "Purpose", flex: 1.4, headerRender: customHeaderCell },
    {
      field: "description",
      headerName: "Description",
      flex: 1.2,
      cellClassName: "name-column--cell",
      headerRender: customHeaderCell,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1.2,
      cellClassName: "name-column--cell",
      headerRender: customHeaderCell,
      valueGetter: (params) => {
        switch (params.value) {
          case "pa":
            return "Purchase";
          case "ta":
            return "Travel";
          case "aa":
            return "Accommodation";
          case "fa":
            return "Meal";
          default:
            return params.value;
        }
      },
    },
    
    {
      field: "visitLocation",
      headerName: "Place",
      flex: 0.8,
      headerRender: customHeaderCell,
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 0.7,
      valueFormatter: (params) => formatDate(params.value),
      headerRender: customHeaderCell,
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 0.7,
      valueFormatter: (params) => formatDate(params.value),
      headerRender: customHeaderCell,
    },
    { field: "noOfDays", headerName: "Days", flex: 0.4, headerRender: customHeaderCell },
    {
        field: "requestedBy",
        headerName: "Requested By",
        flex: 1.2,
        renderCell: (params) => {
          const role = params.row.by?.role;
          return (
            <Box
              width="100%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "admin"
                  ? colors.greenAccent[600]
                  : role === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              {params.row.requestedBy}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {role}
              </Typography>
            </Box>
          );
        },
        headerRender: customHeaderCell,
      },
    {
      field: "askedAmount",
      headerName: "Ask",
      flex: 1,
      headerRender: customHeaderCell,
    },
    {
        field: "claimed",
        headerName: "Claimed",
        flex: 1,
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
    //   {
    //     field: "status",
    //     headerName: "Status",
    //     flex: 1,
    //     headerRender: customHeaderCell,
    //     renderCell: (params) => {
    //       const isPreApproved = params.row.isPreApproved;
    //       const isApproved = params.row.isApproved;
      
    //       if (isApproved && isPreApproved) {
    //         return "Approved";
    //       } else if (isPreApproved && !isApproved) {
    //         return "Preapproved";
    //       } else {
    //         return "Pending";
    //       }
    //     },
    //   }
      
      {
        field: "isPreApproved",
        headerName: "Pre Approved",
        flex: 1.4,
        renderCell: ({ row }) => {
          return (
            <Box
              width="120%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                row.isPreApproved
                  ? row.expenses.length > 0
                    ? row.isApproved
                      ? "#0BF265"
                      : colors.blueAccent[500]
                    : colors.greenAccent[500]
                  : colors.redAccent[500]
              }
              borderRadius="4px"
            >
              <Typography style={{ color: "white" }} sx={{ ml: "5px" }}>
                {row.isPreApproved
                  ? row.expenses.length > 0
                    ? row.isApproved
                      ? "Approved"
                      : "Claimed"
                    : "Pre Approved "
                  : "Pending"}
              </Typography>
            </Box>
          );
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
            History of Reimbursements
          </h4>
        </div>
        <Box
          height="82.3vh"
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
            rows={rows}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default AllApprovedReimbursementsFinance ;
