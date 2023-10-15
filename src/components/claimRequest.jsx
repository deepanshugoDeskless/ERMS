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
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

import { useMutation, useQuery, gql } from "@apollo/client";

const ClaimRequest = () => {
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

  const [expenses, setExpenses] = useState([]);
  const [reimbursement, setReimbursement] = useState({});
  const [rowSelectionModel, setRowSelectionModel] = useState();

  const addExpense = (expense) => {
    const formId = Date.now();
    setExpenses([
      ...expenses,
      {
        formId,
        expense,
      },
    ]);
  };

  const selectReimbursement = (reimbursement) => {
    setReimbursement(reimbursement);
    const formId = Date.now();
    setExpenses([
      {
        formId,
      },
    ]);
  };

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
    {
      field: "title",
      headerName: "Title",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },
    {
      field: "askedAmount",
      headerName: "Approved",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "isPreApproved",
      headerName: "Approval",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.isPreApproved
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.isPreApproved ? " Approved " : "Pending"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            style={{
              bottom: "0px",
              left: "5em",
              marginRight: "5em",
              top: "1.5em",
              width: "100%",
              flexDirection: "column",
              display: "flex",
              height: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: colors.blueAccent[800],
                color: colors.blueAccent[200],
                width: "100%",
                position: "fixed",
                top: "1em",
                height: "2em",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{}}>Claim Reimbursement</h4>
            </div>
            <Box
              style={{
                flexDirection: "row",
                backgroundColor: "gray",
                display: "flex",
              }}
            >
              <Box
                style={{
                  marginTop: "1.5em",
                  width: "33%",
                  flexDirection: "column",
                  backgroundColor: "yellow",
                  display: "flex",
                  height: "95%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <DoneAllRoundedIcon
                    style={{
                      marginRight: 4,
                      transform: "scale(1.5)",
                    }}
                  />
                  <h4
                    style={{
                      marginLeft: 4,
                      fontFamily: "Bebas Neue,sans-serif",
                      fontSize: "xx-large",
                    }}
                  >
                    Approved For
                  </h4>
                </div>
                <Box
                  height="77vh"
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
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                      console.log(
                        "🚀 ~ file: claimRequest.jsx:291 ~ ClaimRequest ~ newRowSelectionModel:",
                        newRowSelectionModel
                      );
                      setRowSelectionModel(newRowSelectionModel);
                      selectReimbursement(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    rows={data.ireimbursements}
                    columns={columns}
                    getRowId={(row) => row._id}
                  />
                </Box>
              </Box>
              <Box
                style={{
                  marginTop: "1.5em",
                  width: "100%",
                  flexDirection: "column",
                  backgroundColor: "red",
                  display: "flex",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <CurrencyRupeeRoundedIcon
                    style={{
                      marginRight: 4,
                      transform: "scale(1.5)",
                    }}
                  />
                  <h4
                    style={{
                      marginLeft: 4,
                      fontFamily: "Bebas Neue,sans-serif",
                      fontSize: "xx-large",
                    }}
                  >
                    Add Expenses
                  </h4>
                </div>
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    overflowY: "scroll",
                    height: "70%",
                  }}
                >
                  {expenses.map((expense, index) => (
                    <Form
                      key={expense.formId}
                      showPlusButton={index === expenses.length - 1}
                      addExpense={addExpense}
                    />
                  ))}
                </div>
              </Box>
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
    margin: 4,
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

function Form({ key, showPlusButton, addExpense }) {
  const top100Films = [
    { label: "Travel Expense" },
    { label: "Food Expense" },
    { label: "Accommodation Expense" },
    { label: "Purchase Expense" },
  ];
  const currencies = [
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

  return (
    <div
      key={key}
      style={{
        width: "71%",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        marginTop: "0.55em",
        height: "40%",
      }}
    >
      <form>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: "100%" }}
          style={{ position: "relative" }}
          renderInput={(params) => (
            <TextField {...params} label="Expense Type" />
          )}
        />
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          value="100"
          sx={{
            "&.Mui-focused": {
              "& .MuiInput-underline:before": {
                borderBottom: "none !important",
              },
            },
          }}
          style={{ width: "05em", position: "relative", marginLeft: "9em" }}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "2ch",
              height: "1ch",
              position: "relative",
              top: "-2.65em",
              left: "1em",
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
              style={{
                position: "relative",
                marginLeft: "-8.27em",
                width: "5.55em",
                top: "-2.2em",
              }}
            />
          </Box>
        </div>
        <div style={{ position: "relative", marginLeft: "9em", top: "-4.5em" }}>
          <Button
            variant="contained"
            style={{
              width: "11em",
              position: "relative",
              left: "-8.5em",
              top: "-1.4em",
            }}
            onClick={addExpense}
          >
            Add Expense
          </Button>
          <Stack spacing={2} direction="row" />
        </div>
      </form>
    </div>
  );
}

export default ClaimRequest;
