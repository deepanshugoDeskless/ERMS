import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"; // Import useQuery
import { GET_TEAM_MEMBERS } from "../gqloperations/mutations"; // Import your GraphQL query
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { ColorModeContext, useMode } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";


const Team = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data using the GraphQL query
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

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
            {row.role === "user" }
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
    {
      field: "sex",
      headerName: "Gender",
      flex: 1,
    },
  ];

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <h1 style={{ position: 'absolute', top: '0.3em', left: '11em' }}>Team</h1>
          <h5 style={{ position: 'absolute', top: '4.8em', left: '25em' }}>Managing the Team Members</h5> */}
          <Box style={{ position: 'absolute', bottom: '0px', left: '5em', width: '84%' }}>
          <div style={{backgroundColor:'black',color:'white',width:'84vw',position:'fixed',top:'01.425em',height:'3.15em',display:'flex',textAlign:'center',justifyContent:'center'}} className="banner"><h4 style={{position:'absolute',top:'0.5em'}}>Godeskless Workforce</h4></div>
            <Box
              m="-1em 0 0 0"
              height="75vh"
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
  rows={data.users}
  columns={columns}
  getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
/>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default Team;

// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { mockData,mockDataTeam } from "./data/mockData";
// import {tokens} from "../../src/theme"
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import Header from "./Header";
// import { ColorModeContext,useMode } from "../../src/theme";
// import { ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";
// import { useState } from "react";
// import {GET_TEAM_MEMBERS} from '../gqloperations/mutations'
// import { useQuery } from '@apollo/client';
// import { gql } from 'graphql-tag';

// const Team = () => {
//   const [colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message} </p>; 
//   const teamMembers = data.teamMembers;

//   const columns = [
//     { field: "_id", headerName: "Employee ID" ,flex:0.7},
//     {
//       field: "firstName",
//       headerName: "First Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "lastName",
//       headerName: "Last Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "role",
//       headerName: "Access Level",
//       flex: 1,
//       renderCell: ({ row: { access } }) => {
//         return (
//           <Box
//             width="60%"
//             m="0 auto"
//             p="5px"
//             display="flex"
//             justifyContent="center"
//             backgroundColor={
//               access === "admin"
//                 ? colors.greenAccent[600]
//                 : access === "manager"
//                 ? colors.greenAccent[700]
//                 : colors.greenAccent[700]
//             }
//             borderRadius="4px"
//           >
//             {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//             {access === "manager" && <SecurityOutlinedIcon />}
//             {access === "user" && <LockOpenOutlinedIcon />}
//             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//               {access}
//             </Typography>
//           </Box>
//         );
//       },
//     },
//     {
//       field: " username",
//       headerName: "User Name",
//       flex: 1,
//     },
//     {
//       field: " employeeCode",
//       headerName: "User Name",
//       flex: 1,
//     },
//     {
//       field: " sex",
//       headerName: "Gender",
//       flex: 1,
//     },

//   ];

//   return (
//     <>
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <h1 style={{position:'absolute',top:'0.3em',left:'11em'}}>Team</h1>
//         <h5 style={{position:'absolute',top:'4.8em',left:'25em'}}>Managing the Team Members</h5>
//         {/* <Header title="TEAM" subtitle="Managing the Team Members"  /> */}
//     <Box style={{position:'absolute',bottom: '0px',left:'5em',width:'84%'}}>
      
//       <Box
//         m="-1em 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid checkboxSelection rows={teamMembers} columns={columns} />
//       </Box>
//     </Box>
//     </ThemeProvider>
//     </ColorModeContext.Provider>
//     </>
//   );
// };

// export default Team;

