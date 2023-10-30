import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { tokens } from "../../src/theme";
import { Loader, Error } from "./loader";

// Define your GraphQL query
const GET_REIMBURSEMENTS = gql`
  query GetMyReimbursements {
    ireimbursements {
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
      by
      isPreApproved
    }
  }
`;

const ApprovedExpensesHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS);

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
        return "Travel Expense";
      case "aa":
        return "Accommodation Expense";
      case "fa":
        return "Meal Expense";
      case "pa":
        return "Purchase Expense";
      default:
        return type;
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  const formattedData = data.ireimbursements.map((reimbursement) => ({
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
      flex: 1.2,
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
              marginLeft: 20,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
              marginTop:'-2em',
            //   backgroundColor:'yellow',
              width: "100%",
            //   textAlign:'left',
              marginLeft:'0em',
              height:'1.2em'
              

            }}
          >
            Approved Expenses
          </h4>
        </div>
        <Box
          height="80vh"
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

// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useMutation, useQuery } from "@apollo/client";
// import {
//   GET_TEAM_MEMBERS,
//   GET_PRE_REQUESTS,
//   UPDATE_REIMBURSEMENTS,
// } from "../gqloperations/mutations";
// import { tokens } from "../../src/theme";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import Header from "./Header";
// import { ColorModeContext, useMode } from "../../src/theme";
// import Button from "@mui/material/Button";
// import { ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";
// import { useState } from "react";
// import { Loader, Error } from "./loader";

// const ApprovedExpensesHistory = () => {
//   const [colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [selectionModel, setSelectionModel] = useState([]);

//   const handleSelectionModelChange = (newSelection) => {
//     console.log(
//       "🚀 ~ file: preApproveRequests.jsx:25 ~ handleSelectionModelChange ~ newSelection:",
//       newSelection
//     );
//     setSelectionModel(newSelection);
//   };
//   const { loading, error, data, refetch } = useQuery(GET_PRE_REQUESTS, {
//     context: {
//       headers: {
//         Authorization: `${localStorage.getItem("token")}`,
//       },
//     },
//   });

//   const [updateReimbursements, { updateData, updateLoading, updateError }] =
//     useMutation(UPDATE_REIMBURSEMENTS, {
//       onCompleted: () => {
//         refetch({
//           context: {
//             headers: {
//               Authorization: `${localStorage.getItem("token")}`,
//             },
//           },
//         });
//       },
//     });

//   if (loading) return <Loader />;
//   if (error) return <Error />;

//   const handleBulkApproveSubmit = () => {
//     updateReimbursements({
//       context: {
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       },
//       variables: {
//         reimbursementsUpdateInput: {
//           ids: selectionModel,
//           reimbursementInput: {
//             isapproved: true,
//           },
//         },
//       },
//     });
//   };

//   const columns = [
//     { field: "title", headerName: "Title", flex: 1 },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 0.7,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "type",
//       headerName: "Type",
//       flex: 0.5,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "by",
//       headerName: "Requested By",
//       flex: 1,
//       renderCell: ({ row }) => {
//         return (
//           <Box
//             width="60%"
//             m="0 auto"
//             p="5px"
//             display="flex"
//             justifyContent="center"
//             backgroundColor={
//               row.role === "admin"
//                 ? colors.greenAccent[600]
//                 : row.role === "manager"
//                 ? colors.greenAccent[700]
//                 : colors.greenAccent[700]
//             }
//             borderRadius="4px"
//           >
//             {row.by.firstName + " " + row.by.lastName}
//             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//               {row.role}
//             </Typography>
//           </Box>
//         );
//       },
//     },

//     {
//       field: "visitLocation",
//       headerName: "Place",
//       flex: 0.5,
//     },
//     {
//       field: "fromDate",
//       headerName: "From",
//       flex: 0.7,
//     },
//     {
//       field: "toDate",
//       headerName: "To",
//       flex: 0.7,
//     },
//     {
//       field: "askedAmount",
//       headerName: "Ask",
//       flex: 1,
//     },
//   ];

//   return (
//     <>
//       <Box
//         style={{
//           position: "absolute",
//           bottom: "0px",
//           left: "5em",
//           right: "0px",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor:'yellow',
//             color: colors.blueAccent[200],
//             width: "100%",
//             position:'relative',
//             zIndex: -1,
//             flex: 1,
//             height: "100%",
//             display: "flex",
//             textAlign: "center",
//             alignItems: "center",
//             justifyContent: "space-between",

//           }}
//           className="banner"
//         >
//           <h4
//             style={{
//               marginLeft: 20,
//               fontFamily: "Bebas Neue,sans-serif",
//               fontSize: "xxx-large",
//             }}
//           >
//             Approved Expenses
//           </h4>
//         </div>
//         <Box
//           height="80vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column--cell": {
//               color: colors.greenAccent[300],
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: colors.blueAccent[700],
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: colors.primary[400],
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: "none",
//               backgroundColor: colors.blueAccent[700],
//             },
//             "& .MuiCheckbox-root": {
//               color: `${colors.greenAccent[200]} !important`,
//             },
//           }}
//         >
//           <DataGrid
//             checkboxSelection
//             onRowSelectionModelChange={(newRowSelectionModel) => {
//               handleSelectionModelChange(newRowSelectionModel);
//             }}
//             rowSelectionModel={selectionModel}
//             rows={data.pendingPreRequests}
//             columns={columns}
//             getRowId={(row) => row._id}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ApprovedExpensesHistory;
