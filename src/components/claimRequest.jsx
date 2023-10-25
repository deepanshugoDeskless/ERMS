import { Box, Typography, useTheme } from "@mui/material";
import {
  ADD_BULK_EXPENSE,
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  GET_TEAM_MEMBERS,
} from "../gqloperations/mutations";
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
import { Loader, Error } from "./loader";

const ClaimRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [createReimbursement] = useMutation(CREATE_REIMBURSEMENT, {
    refetchQueries: [{ query: GET_REIMBURSEMENTS }],
  });
  const [createBulkExpenses] = useMutation(ADD_BULK_EXPENSE, {});

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
    console.log(
      "🚀 ~ file: claimRequest.jsx:72 ~ addExpense ~ expense:",
      expense
    );
    const formId = Date.now();
    setExpenses([
      ...expenses,
      {
        formId,
        ...expense,
      },
    ]);
    console.log(
      "🚀 ~ file: claimRequest.jsx:72 ~ addExpense ~ expense:",
      expenses
    );
  };

  const selectReimbursement = (reimbursement) => {
    console.log(
      "🚀 ~ file: claimRequest.jsx:94 ~ selectReimbursement ~ reimbursement:",
      reimbursement[0]
    );
    setReimbursement(reimbursement[0]);
    const formId = Date.now();
    setExpenses([
      {
        formId,
        reimbursement: reimbursement[0],
      },
    ]);
  };

  const callBulkExpenseUpload = () => {
    console.log(
      "🚀 ~ file: claimRequest.jsx:137 ~ callBulkExpenseUpload ~ expenses:",
      expenses
    );
    console.log("Calling bulk upload");
    expenses.shift();
    expenses.forEach((object) => {
      delete object["formId"];
    });
    createBulkExpenses({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: { expenseNewArray: expenses },
    })
      .then(() => {
        alert("Expenses uploaded successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) return <Loader />;
  if (error) return <Error />;


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
  const approvedReimbursements = data?.ireimbursement?.filter(
    (reimbursement) => {
      return (
        reimbursement?.isPreApproved != null &&
        reimbursement?.isPreApproved == true
      );
    }
  );

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
              width: "100%",
              flexDirection: "column",
              display: "flex",
              height: "100%",
            }}
          >
            <div
              style={{
                color: colors.blueAccent[200],
                width: "100%",
                height: "2em",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                position: "fixed",
                top: "1.6em",
                left: "2em",
              }}
            >
              <h4 style={{}}>Claim Reimbursement</h4>
            </div>
            <Box
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box
                style={{
                  marginTop: "1.5em",
                  width: "33%",
                  flexDirection: "column",
                  display: "flex",
                  height: "77vh",
                  marginLeft: "0.3em",
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
                  height="70vh"
                  style={{
                    width: "7.25em",
                    position: "fixed",
                    marginLeft: "-0.3em",
                    marginTop: "1.7em",
                    position: 'fixed',
                    bottom: '0'
                  }}
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
                      setRowSelectionModel(newRowSelectionModel);
                      selectReimbursement(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    rows={data.ireimbursements.filter(
                      (element) => element.isPreApproved
                    )}
                    columns={columns}
                    getRowId={(row) => row._id}
                  />
                </Box>
              </Box>
              <Box
                style={{
                  marginTop: "1.5em",
                  width: "90%",
                  flexDirection: "column",
                  display: "flex",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
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
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        marginLeft: 4,
                        fontFamily: "Bebas Neue,sans-serif",
                        fontSize: "xx-large",
                      }}
                    >
                      Total =
                    </h4>
                    <h4
                      style={{
                        marginLeft: 4,
                        fontFamily: "Bebas Neue,sans-serif",
                        fontSize: "xx-large",
                      }}
                    >
                      {"0"}
                    </h4>
                    <CurrencyRupeeRoundedIcon
                      style={{
                        marginRight: 4,
                        transform: "scale(1.5)",
                      }}
                    />
                  </div>

                  <Button
                    variant="contained"
                    style={{
                      borderRadius: 10,
                      marginRight: 16,
                    }}
                    onClick={callBulkExpenseUpload}
                  >
                    Submit For Reimbursement
                  </Button>
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
                      showPlusButton={index === expenses?.length - 1}
                      addExpense={addExpense}
                      reimbursement={reimbursement}
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

function Form({ key, showPlusButton, addExpense, reimbursement }) {
  const expenseTypes = [
    { label: "Travel", code: "te" },
    { label: "Meal", code: "fe" },
    { label: "Accommodation", code: "ae" },
    { label: "Purchase", code: "pe" },
  ];
  const theme = useTheme();
  const [expenseType, setExpenseType] = useState({});
  const [expenseDescription, setExpenseDescrption] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [expenseAmount, setExpensesAmount] = useState("");

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

  const top100Films = [
    { label: "Expense Header 1" },
    { label: "Expense Header 2" },
    { label: "Expense Header 3" },
  ];

  return (
    <div
      key={key}
      style={{
        width: "55vw",
        border: "2px solid #ccc",
        borderRadius: 20,
        marginTop: "0.2em",
        height: "24vh",
        padding: 8,
        position: "relative",
        left: "0.4em",
      }}
    >
      <form>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            height: "20vh",
            marginTop: 10,
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
              options={expenseTypes}
              value={expenseType?.label ? expenseType?.label : ""}
              onChange={(event, selectedType) => {
                setExpenseType(selectedType);
              }}
              sx={{ width: 140 }}
              style={{ position: "relative" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  style={{ position: "relative", marginTop: "-1em" }}
                />
              )}
            />
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "2.4em" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="#Invoice ID"
              variant="outlined"
              style={{
                width: "2.9em",
                position: "relative",
                marginTop: "1em",
                marginLeft: "-3em",
              }}
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
              value={expenseDescription}
              onChange={(e) => setExpenseDescrption(e.target.value)}
              style={{
                width: "6em",
                position: "relative",
                marginLeft: "0em",
                marginTop: "-1em",
              }}
            />
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "2.4em" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Establishment"
              variant="outlined"
              style={{
                width: "3.9em",
                position: "relative",
                marginTop: "1em",
                marginLeft: "-7.9em",
              }}
            />
          </Box>

          <div
            style={{
              paddingBottom: 24,
              marginLeft: "0.1em",
              marginTop: "-2em",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={expenseDate}
                  onChange={(expenseDateInput) => {
                    setExpenseDate(
                      new Date(expenseDateInput).toLocaleDateString()
                    );
                  }}
                  label="Payment Date"
                  style={{ position: "relative", marginLeft: "4em" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Expense Header"
                style={{
                  position: "relative",
                  marginTop: "0.8em",
                  marginLeft: "-12.4em",
                }}
              />
            )}
          />

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-7em",
              marginTop: "3.1em",
            }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  width: "2ch",
                  height: "1ch",
                  position: "relative",
                  marginTop: "-1em",
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
                value={expenseAmount}
                onChange={(e) => setExpensesAmount(e.target.value)}
                style={{
                  width: "3em",
                  position: "relative",
                  marginTop: "-1em",
                }}
              />
            </Box>
          </div>

          {showPlusButton && (
            <Button
              variant="contained"
              style={{
                borderRadius: 20,
                position: "relative",
                marginTop: "-8em",
                marginLeft: "-8em",
              }}
              onClick={() => {
                console.log(
                  "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseAmount:",
                  expenseAmount
                );
                console.log(
                  "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseDate:",
                  expenseDate
                );
                console.log(
                  "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseDescription:",
                  expenseDescription
                );
                console.log(
                  "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseType:",
                  expenseType
                );

                if (
                  expenseType &&
                  expenseDescription &&
                  expenseDate &&
                  expenseAmount
                ) {
                  addExpense({
                    type: expenseType.code,
                    amount: expenseAmount,
                    description: expenseDescription,
                    reimbursement: reimbursement,
                  });
                } else {
                  alert("Please Fill Details.");
                }
              }}
            >
              Add
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ClaimRequest;
