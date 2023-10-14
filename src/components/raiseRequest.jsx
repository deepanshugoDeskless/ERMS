import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  GET_TEAM_MEMBERS,
} from "../gqloperations/mutations"; // Import your GraphQL query
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../src/theme";
import { ColorModeContext, useMode } from "../../src/theme";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { margin } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import HistoryIcon from "@mui/icons-material/History";
import { useMutation, useQuery, gql } from "@apollo/client";

const RaiseRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data using the GraphQL query

  const [createReimbursement] = useMutation(CREATE_REIMBURSEMENT, {
    refetchQueries: [{ query: GET_REIMBURSEMENTS }],
  });
  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const [request, setRequest] = useState({
    name: "",
    fromDate: "",
    toDate: "",
    amount: "",
    description: "",
    place: "",
  });

  const currencies = [
    ,
    {
      value: "INR",
      label: "₹",
    },
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };
  const handleSubmit = () => {
    createReimbursement({ variables: { reimbursementNew: request } })
      .then(() => {
        // Data submitted successfully, you can perform any additional actions here
        setRequest({
          name: "",
          fromDate: "",
          toDate: "",
          description: "",
          place: "",
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  const top100Films = [
    { label: "Travel Expense" },
    { label: "Food Expense" },
    { label: "Accomodation Expense" },
    { label: "Purchase Expense" },
  ];

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "lastName",
    //   headerName: "Last Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1.8,
    //   valueFormatter: (params) => params.value.toLowerCase(),
    // },
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
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            style={{
              position: "absolute",
              bottom: "0px",
              left: "5em",
              top: "2em",
              width: "84%",
              flex: 1,
              flexDirection: "column",
              display: "flex",
              height: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: colors.blueAccent[800],
                color: colors.blueAccent[200],
                width: "84vw",
                position: "fixed",
                top: "1.5em",
                height: "2em",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
              className="banner"
            >
              <h4 style={{}}>Raise Your Request</h4>
            </div>
            <div
              style={{
                backgroundColor: colors.blueAccent[900],
                marginTop: "1.5em",
                padding: "0.5em",
                width: "84vw",
                height: 80,
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  maxRows={6}
                  options={top100Films}
                  sx={{ width: 200, height: 80 }}
                  style={
                    (styles.input,
                    {
                      textAlign: "center",
                      justifyContent: "center",
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Expense Type" />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Title of Request"
                  variant="outlined"
                  style={{
                    width: "20vw",
                  }}
                />
              </div>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  sx={{
                    width: 200,
                    height: 80,
                  }}
                  style={styles.input}
                />
            </div>
            <div
              style={{
                backgroundColor: colors.blueAccent[900],
                padding: "0.5em",
                width: "100%",
                height: 120,
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="From Date" />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="To Date" />
                    </DemoContainer>
                  </LocalizationProvider>
              </div>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "2ch",
                    height: "1ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  defaultValue="INR"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  style={{
                    width: "20vw",
                  }}
                />
                </div>
              </Box>

              <Button variant="contained" style={{}}>
                Submit
              </Button>

              {/* 
              <TextField
                id="standard-basic"
                label="Place of Visit"
                variant="standard"
                style={styles.input}
                sx={{}}
              /> */}
            </div>

            <Box
              height="55vh"
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
                rows={data.ireimbursements}
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

const styles = {
  container: {
    position: "relative",
    width: "30em",
    marginLeft: "3.5em",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "20em",
  },
  title: {
    textAlign: "center",
    color: "#007BFF",
    position: "relative",
  },
  formGroup: {},
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "08em",
  },
  table: {
    width: "60%",
    borderCollapse: "collapse",
    marginTop: "1em",
    marginLeft: "06em",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    padding: "18px",
    fontSize: "x-small", // Adjust the font size as needed
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  tableData: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "small", // Adjust the font size as needed
  },
};

export default RaiseRequest;
