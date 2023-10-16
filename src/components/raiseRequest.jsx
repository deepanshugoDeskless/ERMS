import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  GET_TEAM_MEMBERS,
  RAISE_REIMBURSEMENT_REQUEST,
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

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescriopion] = useState("");
  const [place, setPlace] = useState("");
  const [fromDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data using the GraphQL query

  const [createReimbursement] = useMutation(RAISE_REIMBURSEMENT_REQUEST, {
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
  const callRaiseReimbursementRequest = () => {
    createReimbursement({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        reimbursementNew: {
          title: title,
          description: description,
          type: "ta",
          visitLocation: place,
          noOfDays: "2",
          fromDate: fromDate,
          toDate: toDate,
          askedAmount: amount,
        },
      },
    })
      .then(() => {
        // Data submitted successfully, you can perform any additional actions here
        setTitle("");
        setDescriopion("");
        setType("");
        setPlace("");
        setFormDate("");
        setToDate("");
        setAmount("");
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
    // { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fromDate",
      headerName: "FromDate",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "toDate",
      headerName: "ToDate",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "askedAmount",
      headerName: "Asked For",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "isPreApproved",
      headerName: "Pre Approved",
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
                top: "1.6em",
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
                // backgroundColor: colors.blueAccent[900],
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
                  style={styles.input}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Expense Type"
                      value={type}
                      onChange={(selectedType) => {
                        setType(selectedType.target.value);
                      }}
                    />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Title of Request"
                  variant="outlined"
                  value={title}
                  onChange={(titleInput) => {
                    setTitle(titleInput.target.value);
                  }}
                  style={styles.input}
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
                value={description}
                onChange={(descriptionInput) => {
                  setDescriopion(descriptionInput.target.value);
                }}
                style={styles.input}
              />

              <TextField
                id="outlined-multiline-static"
                label="Place of Visit"
                variant="outlined"
                style={styles.input}
                value={place}
                onChange={(placeInput) => {
                  setPlace(placeInput.target.value);
                }}
                sx={{}}
              />
            </div>
            <div
              style={{
                // backgroundColor: colors.blueAccent[900],
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
                  margin: 4,
                  marginBottom: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={fromDate}
                      onChange={(fromDateInput) => {
                        setFormDate(
                          new Date(fromDateInput).toLocaleDateString()
                        );
                      }}
                      label="From Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={toDate}
                      onChange={(toDateInput) => {
                        setToDate(new Date(toDateInput).toLocaleDateString());
                      }}
                      label="To Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  defaultValue="INR"
                  style={{ ...styles.input, width: 60 }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="outlined-basic"
                  label="Amount"
                  value={amount}
                  onChange={(amountInput) => {
                    setAmount(amountInput.target.value);
                  }}
                  variant="outlined"
                  style={styles.input}
                />
              </div>

              <Button
                variant="contained"
                style={{
                  width: 180,
                  height: 60,
                }}
                onClick={() => {
                  callRaiseReimbursementRequest();
                }}
              >
                Submit
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <HistoryIcon
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
                Request History
              </h4>
            </div>

            <Box
              height="50vh"
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

export default RaiseRequest;
