import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
import { CREATE_REIMBURSEMENT } from "../gqloperations/mutations";
import { GET_REIMBURSEMENTS } from "../gqloperations/mutations";

export const AddTravel = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const [createReimbursement] = useMutation(CREATE_REIMBURSEMENT, {
    refetchQueries: [{ query: GET_REIMBURSEMENTS }],
  });

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

  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const dataRows = data.ireimbursements;
  console.log("🚀 ~ file: AddTravel.js:98 ~ AddTravel ~ dataRows:", dataRows);

  const top100Films = [
    { label: "Travel Expense" },
    { label: "Food Expense" },
    { label: "Accomodation Expense" },
    { label: "Purchase Expense" },
  ];

  // const dataRows = [
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
  //   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],

  //   // Add more data rows as needed
  // ];

  const columns = [
    { field: "_id", headerName: "Employee ID", flex: 1 },
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
    <div style={styles.container}>
      <h2
        style={styles.title}
        style={{
          fontFamily: "Bebas Neue,sans-serif",
          position: "absolute",
          top: "-0.7em",
          left: "8.5em",
        }}
      >
        Add Request
      </h2>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        maxRows={6}
        options={top100Films}
        sx={{ width: 250 }}
        style={{ position: "absolute", left: "1.7em", top: "2.1em" }}
        renderInput={(params) => <TextField {...params} label="Expense Type" />}
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={styles.formGroup}>
          <TextField
            id="outlined-multiline-flexible"
            label="Name of Request"
            multiline
            maxRows={4}
            onChange={handleInputChange}
            style={styles.input}
            style={{
              position: "absolute",
              left: "8em",
              width: "20vw",
              top: "1.9em",
            }}
          />
        </div>
      </Box>
      <div style={{ marginLeft: "15em", position: "absolute", top: "1.9em" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} pl={12}>
          <DemoContainer pl={12} components={["DatePicker"]}>
            <DatePicker pl={12} style={{ padding: "5em" }} label="From Date" />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={styles.input}
            style={{ position: "absolute", marginLeft: "21em", top: "1.7em" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="To Date" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </Box>
      </div>

      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={2}
            style={styles.input}
            style={{
              position: "absolute",
              marginLeft: "-13.27em",
              width: "5.55em",
              top: "4.2em",
            }}
          />
        </Box>
      </div>

      <TextField
        id="standard-basic"
        label="Place of Visit"
        variant="standard"
        style={styles.input}
        sx={{
          "&.Mui-focused": {
            "& .MuiInput-underline:before": {
              borderBottom: "none !important",
            },
          },
        }}
        style={{
          width: "06em",
          position: "absolute",
          marginLeft: "-6.5em",
          top: "4.35em",
          textDecoration: "none",
        }}
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "2ch",
            height: "1ch",
            position: "absolute",
            top: "4.5em",
            left: "15.18em",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-select-currency" select defaultValue="INR">
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              style={styles.input}
              style={{
                position: "absolute",
                marginLeft: "49.5em",
                width: "9em",
                top: "11.85em",
              }}
            />
          </FormControl>
        </div>
      </Box>

      <Stack direction="row" spacing={4}>
        <Button
          variant="contained"
          style={{
            position: "absolute",
            marginLeft: "74em",
            width: "14em",
            top: "17.0em",
          }}
        >
          Submit
        </Button>
      </Stack>

      <HistoryIcon
        style={{
          position: "absolute",
          top: "14.3em",
          left: "3.5em",
          transform: "scale(1.5)",
        }}
      />

      <h4
        style={{
          position: "absolute",
          left: "3.7em",
          top: "9.15em",
          fontFamily: "Bebas Neue,sans-serif",
          fontSize: "xx-large",
        }}
      >
        Request History{" "}
      </h4>
      {/* Add a table here */}
      <div
        className="viewingdata"
        style={{
          position: "absolute",
          top: "7.8em",
          width: "130vw", // Adjust width as needed
          marginLeft: "0", // Adjust left margin as needed
          overflowX: "auto", // Horizontal scrollbar if content overflows
          maxHeight: "5.7em", // Set the maximum height for the table container
          marginLeft: "-4.7em",
        }}
      >
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
            rows={data.ireimbursements}
            columns={columns}
            getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
          />
        </Box>
        {/* <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th>Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Description</th>
              <th>Place of Visit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={styles.tableData}>
            {data.ireimbursements.toLict.map((row, index) => (
              <tr key={index} style={{ color: "green" }}>
                {row.map((item, itemIndex) => (
                  <td key={itemIndex}>{item._id}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
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
    top: "-1.15em",
    left: "-2.2em",
  },
  formGroup: {
    margin: "10px 0",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "08em",
    position: "absolute",
    left: "01.5em",
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

export default AddTravel;
