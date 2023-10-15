import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  GET_TEAM_MEMBERS,
} from "../gqloperations/mutations"; // Import your GraphQL query
import "../../src/App.css";
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

import DropFileInput from "./drop-file-input/DropFileInput";

const AddEmployee = () => {
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
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "blue",
        width: "85%",
        marginTop: "-1.2em",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4>React drop files input</h4>
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
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
    { label: "Travel" },
    { label: "Food" },
    { label: "Accommodation" },
    { label: "Purchase" },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        // backgroundColor: colors.primary[900],
        width: "100%",
        border: "2px solid #ccc",
        borderRadius: 4,
        marginTop: "0.2em",
        height: "20%",
        padding: 10,
      }}
    >
      <form>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            width="20vh"
            component="form"
            sx={{
              "& .MuiTextField-root": {},
            }}
            noValidate
            autoComplete="off"
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: "100%" }}
              style={{ position: "relative" }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              style={{
                width: "3em",
              }}
            />
          </Box>

          <div
            style={{
              paddingBottom: 24,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Payment Date" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  width: "2ch",
                  height: "1ch",
                  position: "relative",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
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
              </div>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Amount"
                multiline
                style={{
                  width: "3em",
                }}
              />
            </Box>
          </div>

          {showPlusButton && (
            <Button
              variant="contained"
              style={{
                width: "1em",
              }}
              onClick={addExpense}
            >
              Add More
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
