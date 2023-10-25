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
import { Loader, Error } from "./loader";

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
        setRequest({
          name: "",
          fromDate: "",
          toDate: "",
          description: "",
          place: "",
        });
      })
      .catch((error) => {
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

  if (loading) return <Loader />;
  if (error) return <Error />;

  const dataRows = data.ireimbursements;
  console.log("🚀 ~ file: AddTravel.js:98 ~ AddTravel ~ dataRows:", dataRows);

  const top100Films = [
    { label: "Travel Expense" },
    { label: "Meal Expense" },
    { label: "Accomodation Expense" },
    { label: "Purchase Expense" },
  ];

  const columns = [
    { field: "_id", headerName: "Employee ID", flex: 1 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Request</h2>
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
          <div style={styles.input}>
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
      <div
        className="viewingdata"
        style={{
          position: "absolute",
          top: "7.8em",
          width: "130vw", 
          marginLeft: "0", 
          overflowX: "auto", 
          maxHeight: "5.7em", 
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
            getRowId={(row) => row._id} 
          />
        </Box>
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
    fontSize: "x-small", 
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  tableData: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "small", 
  },
};

export default AddTravel;
