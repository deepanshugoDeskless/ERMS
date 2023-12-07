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
import { FileUploader } from "react-drag-drop-files";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Loader, Error } from "./loader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import dayjs from "dayjs";
import { toDate } from "date-fns";
import { AddmoneyIcon, SendIcon } from "./Icons";

const ClaimRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalAmount, setTotalAmount] = useState(0);

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
    invoiceId: "",
    establishment: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [reimbursement, setReimbursement] = useState({});
  const [rowSelectionModel, setRowSelectionModel] = useState();
  const [selectedReimbursementTitle, setSelectedReimbursementTitle] =
    useState(""); // Add this state variable

  const addExpense = (expense) => {
    const newTotalAmount = totalAmount + parseFloat(expense.amount);
    setTotalAmount(newTotalAmount);
    const formId = Date.now();
    const formattedExpenseDate = expense.date.format("DD/MM/YYYY");
    setExpenses([
      ...expenses,
      {
        formId,
        ...expense,
        date: formattedExpenseDate,
      },
    ]);
  };

  const selectReimbursement = (reimbursement) => {
    setReimbursement(reimbursement[0]);
    setSelectedReimbursementTitle(reimbursement[0].title); // Set the selected reimbursement title
    const formId = Date.now();
    setExpenses([
      {
        formId,
        reimbursement: reimbursement[0],
      },
    ]);
  };

  const showExpensesUploadedAlert = () => {
    if (expenses.length > 0) {
      alert("Expenses uploaded successfully");
    } else {
      alert("Please add expenses first");
    }
  };

  const callBulkExpenseUpload = () => {
    if (expenses.length === 0) {
      return;
    }

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
        setExpenses([]);
        showExpensesUploadedAlert();
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
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fromDate",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      valueFormatter: (params) => {
        const date = dayjs(params.value, "DD/MM/YYYY");
        return date.format("DD MMM");
      },
    },
    {
      field: "askedAmount",
      headerName: "Approved",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "isPreApproved",
      headerName: "Status",
      flex: 1.6,
      renderCell: ({ row }) => {
        let status = "Pending";
        if (row.isPreApproved) {
          if (row.expenses.length > 0) {
            if (row.isApproved) {
              status = "Approved";
            } else {
              status = "Claimed";
            }
          } else {
            status = "Pre Approved";
          }
        }

        if (row.isPaid) {
          status = "Disbursed";
        }

        return (
          <Box
            width="120%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Approved"
                ? "#0BF265"
                : status === "Claimed"
                ? colors.blueAccent[500]
                : status === "Pre Approved"
                ? colors.greenAccent[500]
                : status === "Disbursed"
                ? colors.blueAccent[500]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            <Typography style={{ color: "white" }} sx={{ ml: "5px" }}>
              {status}
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
      <Box
        style={{
          position: "absolute",
          bottom: "0px",
          left: "5em",
          right: "0px",
          // width: "100%", // Change the width to 100% to occupy the full available width
        }}
      >
        <div
          style={{
            color: colors.blueAccent[200],
            width: "100%",
            height: 10,
            paddingTop: 50,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4
            style={{
              marginLeft: 20,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Claim Reimbursement
          </h4>
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
                width: "7.5em",
                position: "fixed",
                marginLeft: "-0.3em",
                marginTop: "1.7em",
                position: "fixed",
                bottom: "0",
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
                  (element) => element.isPreApproved && !element.isApproved
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
                <h4
                  style={{
                    marginLeft: 4,
                    fontFamily: "Bebas Neue,sans-serif",
                    fontSize: "xx-large",
                  }}
                >
                  Total = {totalAmount}
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
                disabled={expenses.length === 0} // Disable the button if no expenses are added
              >
                Claim Reimbursement
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                padding: "20px",
                overflowY: "scroll",
                height: "70vh",
              }}
            >
              {console.log(
                "🚀 ~ file: claimRequest.jsx:421 ~ ClaimRequest ~ expenses:",
                expenses
              )}
              {expenses.map((expense, index) => (
                <Form
                  key={expense.formId}
                  isLastElement={index === expenses?.length - 1}
                  addExpense={addExpense}
                  submitExpenses={callBulkExpenseUpload}
                  reimbursement={reimbursement}
                />
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

function Form({
  key,
  isLastElement,
  addExpense,
  submitExpenses,
  reimbursement,
}) {
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
  const [expenseInvoiceId, setExpenseInvoidId] = useState("");
  const [expenseEstablishment, setExpenseEstablishment] = useState("");
  const [expenseHeader, setExpenseHeader] = useState("");

  const colors = tokens(theme.palette.mode);
  const currencies = [
    {
      value: "INR",
      label: "₹",
    },
  ];

  const expenseHeaders = [
    { label: "Expense Header 1" },
    { label: "Expense Header 2" },
    { label: "Expense Header 3" },
  ];

  const [image, setImage] = useState("");

  const submitImageAndAddExpense = (submit) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ermstesting");
    data.append("cloud_name", "dscv7wuqq");

    fetch("http://api.cloudinary.com/v1_1/dscv7wuqq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ file: claimRequest.jsx:471 ~ .then ~ data:", data);
        console.log(data);
        addExpense({
          type: expenseType.code,
          amount: expenseAmount,
          description: expenseDescription,
          reimbursement: reimbursement,
          invoiceId: expenseInvoiceId,
          establishment: expenseEstablishment,
          date: expenseDate,
          expenseHeader: expenseHeader,
          attachment: data.url,
        });
        // if (submit) {
        //   setTimeout(() => {
        //     submitExpenses();
        //   }, 1000);
        // }
      })
      .catch((err) => {
        console.error(err);
        addExpense({
          type: expenseType.code,
          amount: expenseAmount,
          description: expenseDescription,
          reimbursement: reimbursement,
          invoiceId: expenseInvoiceId,
          establishment: expenseEstablishment,
          date: expenseDate,
          expenseHeader: expenseHeader,
        });
        // if (submit) {
        //   setTimeout(() => {
        //     submitExpenses();
        //   }, 1000);
        //   submitExpenses();
        // }
      });
  };

  const AcceptedFileFormats = " PDF, JPG, PNG";
  const [selectedFileName, setSelectedFileName] = useState("");

  return (
    <div
      key={key}
      style={{
        // backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        key={key}
        style={{
          width: "55vw",
          border: "2px solid #ccc",
          borderRadius: "12px",
          border: "1px solid #ccc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          marginTop: "0.2em",
          padding: 8,
          paddingBottom: 8,
          position: "relative",
          // left:'-2.4em'
        }}
      >
        <form>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              marginTop: 5,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                width: "100%",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box
                height="10vh"
                component="form"
                sx={{
                  "& .MuiTextField-root": {},
                }}
                style={{}}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  disablePortal
                  disabled={!isLastElement}
                  id="combo-box-demo"
                  options={expenseTypes}
                  value={expenseType?.label}
                  onChange={(event, selectedType) => {
                    setExpenseType(selectedType);
                  }}
                  sx={{ width: 140 }}
                  renderInput={(params) => (
                    <TextField {...params} value={expenseType?.label} label="Type" style={{}} />
                  )}
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
                  disabled={!isLastElement}
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescrption(e.target.value)}
                  style={{
                    width: "3em",
                  }}
                />
              </Box>

              <div style={{ marginTop: -8 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={
                        expenseDate
                          ? dayjs(expenseDate, "DD/MM/YYYY").toDate()
                          : null
                      }
                      disabled={!isLastElement}
                      onChange={(date) => setExpenseDate(date)}
                      label="Payment Date"
                      style={{ width: "3em" }}
                      // Add the disableFuture prop to allow only current and past dates
                      disableFuture
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "2ch",
                    height: "1ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    disabled={!isLastElement}
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
                  disabled={!isLastElement}
                  value={expenseAmount}
                  onChange={(e) => setExpensesAmount(e.target.value)}
                  style={{
                    width: "3em",
                  }}
                />
              </Box>
            </div>

            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                width: "100%",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "2.4em" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Establishment"
                  multiline
                  disabled={!isLastElement}
                  variant="outlined"
                  value={expenseEstablishment}
                  onChange={(e) => setExpenseEstablishment(e.target.value)}
                  style={{
                    width: "3.9em",
                  }}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "2.4em" },
                }}
                noValidate
                autoComplete="off"
                style={{}}
              >
                <TextField
                  id="outlined-multiline-static"
                  label="#Invoice ID"
                  disabled={!isLastElement}
                  value={expenseInvoiceId}
                  onChange={(e) => setExpenseInvoidId(e.target.value)}
                  style={{
                    width: "2.9em",
                  }}
                />
              </Box>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={expenseHeaders}
                sx={{ width: 500 }}
                disabled={!isLastElement}
                onChange={(event, selectedExpenseHeaders) => {
                  setExpenseHeader(selectedExpenseHeaders.label);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Expense Header" style={{}} />
                )}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                margin: 10,
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  border: !isLastElement
                    ? "2px dashed #2196F3"
                    : "2px dashed #2126F3",
                  height: 40,
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <DriveFolderUploadIcon style={{}} />
                <input
                  type="file"
                  id="fileInput"
                  disabled={!isLastElement}
                  style={{
                    backgroundColor: "yellow",
                    position: "absolute",
                    width: "100%",
                    height: 40,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <span style={{ marginRight: "8px", fontSize: "medium" }}>
                  {selectedFileName?.name ?? "Choose File"}
                </span>
                <span
                  style={{
                    marginRight: "8px",
                    fontSize: "medium",
                    color: "green",
                  }}
                >
                  {image?.name}
                </span>
                <div
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    fontSize: "medium",
                  }}
                >
                  {AcceptedFileFormats}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isLastElement && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            margin: 10,
            paddingRight: 20,
            paddingLeft: 20,
            display: "flex",
          }}
        >
          <div>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
                display: "flex",
                height: 40,
                marginRight: 20,
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (
                  expenseType &&
                  expenseDescription &&
                  expenseDate &&
                  expenseAmount &&
                  expenseInvoiceId &&
                  expenseEstablishment &&
                  expenseHeader
                ) {
                  submitImageAndAddExpense();
                } else {
                  alert("Please Fill Details.");
                }
              }}
              color="secondary"
              disabled={false}
              size="medium"
              variant="outlined"
              startIcon={<AddmoneyIcon />}
            >
              Add Expenses
            </Button>
          </div>
          <div>
            {/* <Button
              style={{
                display: "flex",
                marginLeft: 20,
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                height: 40,
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (
                  expenseType &&
                  expenseDescription &&
                  expenseDate &&
                  expenseAmount &&
                  expenseInvoiceId &&
                  expenseEstablishment &&
                  expenseHeader
                ) {
                  submitImageAndAddExpense(true);
                } else {
                  alert("Please Fill Details Before Submitting .");
                }
              }}
              color="secondary"
              disabled={false}
              size="medium"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit Expenses
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClaimRequest;
