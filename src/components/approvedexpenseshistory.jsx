import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { tokens } from "../../src/theme";
import { Loader, Error } from "./loader";
import { GET_APPROVED_REIMBURSEMENTS, GET_REIMBURSEMENTS } from "../gqloperations/mutations";

const ApprovedExpensesHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, error, data } = useQuery(GET_APPROVED_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  // Function to format date as "date, month"
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day).toLocaleDateString(
      undefined,
      options
    );
  };

  // Function to map the types to expenses
  const mapTypeToExpense = (type) => {
    switch (type) {
      case "ta":
        return "Travel";
      case "aa":
        return "Accommodation";
      case "fa":
        return "Meal";
      case "pa":
        return "Purchase";
      default:
        return type;
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  const formattedData = data.approvedReimbursements.map((reimbursement) => ({
    ...reimbursement,
    fromDate: formatDate(reimbursement.fromDate),
    toDate: formatDate(reimbursement.toDate),
    type: mapTypeToExpense(reimbursement.type),
  }));

  const columns = [
    { field: "title", headerName: "Title", flex: 0.9 },
    {
      field: "description",
      headerName: "Description",
      flex: 1.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "by",
    //   headerName: "Requested By",
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           row.role === "admin"
    //             ? colors.greenAccent[600]
    //             : row.role === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {row.by.firstName + " " + row.by.lastName}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "visitLocation",
      headerName: "Place",
      flex: 0.5,
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 0.7,
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 0.7,
    },
    {
      field: "askedAmount",
      headerName: "Ask",
      flex: 1,
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
            position: "relative",
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
            Approved Expenses
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
            checkboxSelection
            rows={formattedData}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </>
  );
};

export default ApprovedExpensesHistory;