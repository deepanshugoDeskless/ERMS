import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"; // Import useQuery
import { GET_TEAM_MEMBERS, GET_PRE_REQUESTS } from "../gqloperations/mutations"; // Import your GraphQL query
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { ColorModeContext, useMode } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import {Loader, Error} from "./loader";

const PreApproveRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data using the GraphQL query
  //   const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);

  // Fetch data using the GraphQL query
  const { loading, error, data } = useQuery(GET_PRE_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return <Loader />;
  if (error) return <Error />;

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "visitLocation",
      headerName: "Place",
      flex: 1,
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 1,
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 1,
    },
    {
      field: "askedAmount",
      headerName: "Ask",
      flex: 1,
    },
    {
      field: "isPreApproved",
      headerName: "Approved",
      flex: 1,
    },

    // {
    //   field: "role",
    //   headerName: "Access Level",
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
    //         {row.role === "admin"}
    //         {row.role === "manager"}
    //         {row.role === "user"}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    // {
    //   field: "username",
    //   headerName: "Username",
    //   flex: 1.5,
    // },
    // {
    //   field: "sex",
    //   headerName: "Gender",
    //   flex: 1,
    // },
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
            backgroundColor: colors.blueAccent[800],
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            zIndex: -1,
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
          className="banner"
        >
          <h4
            style={{
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Pre Approval Requests
          </h4>
        </div>
        <Box
          height="85vh"
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
            rows={data.pendingPreRequests}
            columns={columns}
            getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
          />
        </Box>
      </Box>
    </>
  );
};

export default PreApproveRequest;
