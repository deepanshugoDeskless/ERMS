import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  RAISE_REIMBURSEMENT_REQUEST,
} from "../gqloperations/mutations";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../src/theme";
import { ColorModeContext, useMode } from "../../src/theme";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import HistoryIcon from "@mui/icons-material/History";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { Loader, Error } from "./loader";
import 'dayjs/locale/en-gb';

const RaiseRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [type, setType] = useState({});
  const [purpose, setPurpose] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [amount, setAmount] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [createReimbursement] = useMutation(RAISE_REIMBURSEMENT_REQUEST, {
    onCompleted: () => {
      refetch({
        context: {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      });
      setSuccessAlert(true);
    },
  });

  const { loading, error, data, refetch } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const currencies = [
    {
      value: "INR",
      label: "₹",
    },
  ];

  const getTypeDescription = (type) => {
    switch (type) {
      case "ta":
        return "Travel ";
      case "pa":
        return "Purchase ";
      case "fa":
        return "Meal ";
      case "aa":
        return "Accomodation";
      default:
        return type;
    }
  };

  const handleAmountInput = (e) => {
    const input = e.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };

  const reimbursements = data?.ireimbursements?.map((reimbursement, index) => {
    return {
      ...reimbursement,
      type: getTypeDescription(reimbursement.type),
    };
  });

  const callRaiseReimbursementRequest = () => {
    var numberOfDays = getDatesInRange(fromDate, toDate).length.toString();

    createReimbursement({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        reimbursementNew: {
          title: title,
          purpose: purpose,
          description: description,
          type: type.code,
          visitLocation: place,
          noOfDays: numberOfDays,
          fromDate: fromDate,
          toDate: toDate,
          askedAmount: amount,
        },
      },
    })
      .then(() => {
        setTitle("");
        setDescription("");
        setType({});
        setPurpose("");
        setPlace("");
        setFromDate(null);
        setToDate(null);
        const newAmount = parseFloat(amount);
        setTotalAmount((prevTotal) => prevTotal + newAmount);
        setAmount("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getDatesInRange(startDateStr, endDateStr) {
    // Parse the input date strings into Date objects
    const startDate = new Date(startDateStr?.split("/").reverse().join("/"));
    const endDate = new Date(endDateStr?.split("/").reverse().join("/"));

    // Initialize an array to store the date strings
    const dateArray = [];

    // Start from the startDate and loop until the endDate
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const dd = String(currentDate?.getDate()).padStart(2, "0");
      const mm = String(currentDate?.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const yyyy = currentDate?.getFullYear();
      dateArray?.push(`${dd}/${mm}/${yyyy}`);

      // Move to the next day
      currentDate?.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }
  if (loading) return <Loader />;
  if (error) return <Error />;

  const TypeMap = [
    { label: "Travel", code: "ta" },
    { label: "Meal", code: "fa" },
    { label: "Accommodation", code: "aa" },
    { label: "Purchase", code: "pa" },
  ];

  const TypeNature = [
    { label: "Internal", code: "in" },
    { label: "Customer Visit", code: "cv" },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 0.8,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
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
      field: "visitLocation",
      headerName: "Place",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "noOfDays",
      headerName: "Days",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "askedAmount",
      headerName: "Asked For",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "isPreApproved",
      headerName: "Pre Approved",
      flex: 1.4,
      renderCell: ({ row }) => {
        return (
          <Box
            width="120%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.isPreApproved
                ? row.expenses.length > 0
                  ? row.isApproved
                    ? "#0BF265"
                    : colors.blueAccent[500]
                  : colors.greenAccent[500]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            <Typography style={{ color: "white" }} sx={{ ml: "5px" }}>
              {row.isPreApproved
                ? row.expenses.length > 0
                  ? row.isApproved
                    ? "Approved"
                    : "Claimed"
                  : "Pre Approved "
                : "Pending"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      style={{
        position: "absolute",
        bottom: "0px",
        left: "5em",
        right: "0px",
      }}
    >
      <>
        <div
          style={{
            color: colors.blueAccent[200],
            width: "84vw",
            position: "fixed",
            top: "1.6em",
            height: "2em",
            display: "flex",
            textAlign: "center",
            justifyContent: "flex-start",
          }}
          className="banner"
        >
          <h4
            style={{
              marginLeft: 20,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Raise Your Request
          </h4>
        </div>
        <div
          style={{
            marginTop: "0.6em",
            padding: "0.5em",
            width: "84vw",
            height: 80,
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-nature"
            maxRows={6}
            options={TypeNature}
            sx={{ width: 200, height: 80 }}
            value={purpose}
            style={{
              width: "4em",
              marginLeft: "0.12em",
            }}
            onChange={(event, selectedType) => {
              setPurpose(selectedType?.label);
            }}
            renderInput={(params) => (
              <TextField {...params} value={purpose} label="Purpose" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-type"
            maxRows={6}
            options={TypeMap}
            sx={{ width: 240, height: 80 }}
            style={{
              width: "4.8em",
              marginLeft: "0.6em",
            }}
            value={type?.label}
            onChange={(event, selectedType) => {
              setType(selectedType);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Allowance Type"
                value={type?.label}
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
            style={{
              width: "3.5em",
            }}
          />

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
              setDescription(descriptionInput.target.value);
            }}
            style={{ width: "6em" }}
          />

          <TextField
            id="outlined-multiline-static"
            label="Place of Visit"
            variant="outlined"
            value={place}
            onChange={(placeInput) => {
              setPlace(placeInput.target.value);
            }}
            style={{ width: "4em" }}
          />
        </div>
        <div
          style={{
            padding: "0.5em",
            width: "100%",
            height: 110,
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "baseline",
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={
                    fromDate ? dayjs(fromDate, "DD/MM/YYYY").toDate() : null
                  }
                  onChange={(fromDateInput) => {
                    const formattedDate =
                      dayjs(fromDateInput).format("DD/MM/YYYY");
                    setFromDate(formattedDate);
                  }}
                  label="From Date"
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={toDate ? dayjs(toDate, "DD/MM/YYYY").toDate() : null}
                  onChange={(toDateInput) => {
                    const formattedDate =
                      dayjs(toDateInput).format("DD/MM/YYYY");
                    setToDate(formattedDate);
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
              style={{ ...styles.input, width: 60, marginLeft: "-0.3em" }}
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
              onChange={handleAmountInput}
              variant="outlined"
              style={{ ...styles.input, width: "7.8em" }}
            />
          </div>

          <Button
            variant="contained"
            style={{
              width: 180,
              height: 50,
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
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <HistoryIcon
              style={{
                marginLeft: 16,
                marginRight: 4,
                transform: "scale(1.5)",
              }}
            />
            <h4
              style={{
                marginLeft: 16,
                fontFamily: "Bebas Neue,sans-serif",
                fontSize: "xx-large",
              }}
            >
              Request History
            </h4>
          </div>

          {amountError && (
            <Alert
              severity="error"
              sx={{
                marginRight: 3,
              }}
            >
              Please enter only numbers
            </Alert>
          )}

          {successAlert && (
            <Alert severity="success" sx={{ marginRight: 3 }}>
              Your request has been submitted successfully!
            </Alert>
          )}
        </div>
      </>

      <Box
        style={{
          bottom: "0px",
          right: "0px",
        }}
        height="56vh"
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
          rows={reimbursements}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
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

export default RaiseRequest;
