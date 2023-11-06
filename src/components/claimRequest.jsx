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

  const addExpense = (expense) => {
    console.log(
      "🚀 ~ file: claimRequest.jsx:72 ~ addExpense ~ expense:",
      expense
    );
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
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fromDate",
      headerName: "Date",
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
            width="99%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.isPreApproved
                ? row.expenses.length > 0
                  ? colors.blueAccent[800]
                  : "#0BF265"
                : colors.redAccent[800]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.isPreApproved
                ? row.expenses.length > 0
                  ? "Claimed"
                  : "Approved "
                : "Pending"}
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
                width: "7.25em",
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

  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState("");

  const submitImage = () => {
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
          attachment: data,
        });
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
      });
  };
  const fileTypes = ["JPG", "PNG", "PDF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const AcceptedFileFormats = " PDF, JPG, PNG";
  const [selectedFileName, setSelectedFileName] = useState("");
  console.log("🚀 ~ file: claimRequest.jsx:458 ~ Form ~ image:", image);

  return (
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
        left: "0.4em",
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
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Box
              width="20vh"
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
                id="combo-box-demo"
                options={expenseTypes}
                value={expenseType?.label ? expenseType?.label : ""}
                onChange={(event, selectedType) => {
                  setExpenseType(selectedType);
                }}
                sx={{ width: 140 }}
                renderInput={(params) => (
                  <TextField {...params} label="Type" style={{}} />
                )}
              />
            </Box>

            <Box
              component="form"
              height="10vh"
              sx={{
                "& > :not(style)": { width: "2.4em" },
              }}
              noValidate
              autoComplete="off"
              style={{ position: "relative", left: "-0.1em" }}
            >
              <TextField
                id="outlined-multiline-static"
                label="#Invoice ID"
                value={expenseInvoiceId}
                onChange={(e) => setExpenseInvoidId(e.target.value)}
                style={{
                  marginRight: 10,
                  width: "2.9em",
                }}
              />
            </Box>

            <Box
              component="form"
              height="10vh"
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
                  width: "7em",
                  marginRight: 10,
                }}
              />
            </Box>

            {showPlusButton && (
              <Button
                variant="contained"
                style={{
                  borderRadius: 20,
                  width: 100,
                  height: 50,
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
                  console.log(
                    "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseInvoiceid:",
                    expenseInvoiceId
                  );
                  console.log(
                    "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseEstablishment:",
                    expenseEstablishment
                  );
                  console.log(
                    "🚀 ~ file: claimRequest.jsx:604 ~ Form ~ expenseHeader:",
                    expenseHeader
                  );

                  if (
                    expenseType &&
                    expenseDescription &&
                    expenseDate &&
                    expenseAmount &&
                    expenseInvoiceId &&
                    expenseEstablishment &&
                    expenseHeader
                  ) {
                    submitImage();
                    // addExpense({
                    //   type: expenseType.code,
                    //   amount: expenseAmount,
                    //   description: expenseDescription,
                    //   reimbursement: reimbursement,
                    //   invoiceId: expenseInvoiceId,
                    //   establishment: expenseEstablishment,
                    //   date: expenseDate,
                    //   expenseHeader: expenseHeader,
                    // });
                  } else {
                    alert("Please Fill Details.");
                  }
                }}
              >
                Add
              </Button>
            )}
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
                value={expenseAmount}
                onChange={(e) => setExpensesAmount(e.target.value)}
                style={{
                  width: "3em",
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
            >
              <TextField
                id="outlined-multiline-static"
                label="Establishment"
                multiline
                variant="outlined"
                value={expenseEstablishment}
                onChange={(e) => setExpenseEstablishment(e.target.value)}
                style={{
                  width: "3.9em",
                }}
              />
            </Box>

            <div style={{ marginTop: -10 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={
                      expenseDate
                        ? dayjs(expenseDate, "DD/MM/YYYY").toDate()
                        : null
                    }
                    onChange={(date) => setExpenseDate(date)}
                    label="Payment Date"
                    style={{ width: "3em" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={expenseHeaders}
              sx={{ width: 500 }}
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
            {/* <label htmlFor="fileInput"> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "row",
                display: "flex",
                border: "2px dashed #2196F3",
                height: 40,
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <DriveFolderUploadIcon style={{}} />
              <input
                type="file"
                id="fileInput"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
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
            {/* </label> */}
            {image ? (
              <button
                onClick={submitImage}
                style={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Upload
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClaimRequest;
