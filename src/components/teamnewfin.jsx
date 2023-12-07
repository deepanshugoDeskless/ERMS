import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_TEAM_MEMBERS } from "../gqloperations/mutations";
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { ColorModeContext, useMode } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Loader, Error } from "./loader";

const Team = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const columns = [
    { field: "employeeCode", headerName: "Employee ID", flex: 1 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.8,
      valueFormatter: (params) => params.value.toLowerCase(),
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.role === "admin"
                ? colors.greenAccent[600]
                : row.role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.role === "admin"}
            {row.role === "manager"}
            {row.role === "user"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1.5,
    },
  ];

  return (
    <>
      <Box
        style={{
          position: "absolute",
          bottom: "0px",
          left: "5em",
          width: "84%",
        }}
      >
        <div
          style={{
            color: colors.blueAccent[200],
            width: "84vw",
            position: "fixed",
            top: "01.5em",
            height: "2em",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
          className="banner"
        >
          <h4 style={{}}>goDeskless Workforce</h4>
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
            rows={data.users}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </>
  );
};

export default Team;
