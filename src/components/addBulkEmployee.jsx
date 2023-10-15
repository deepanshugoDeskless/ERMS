import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_REIMBURSEMENT,
  GET_REIMBURSEMENTS,
  GET_TEAM_MEMBERS,
  SIGNUP_USER,
  BULK_UPLOAD_USER,
} from "../gqloperations/mutations"; // Import your GraphQL query
import "../../src/App.css";
import * as XLSX from "xlsx";
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

  const [individualFirstName, setIndividualFirstName] = useState("");
  const [individualLasttName, setIndividualLasttName] = useState("");
  const [individualEmail, setIndividualEmail] = useState("");
  const [individualPhone, setIndividualPhone] = useState("");
  const [individualEmployeeCode, setIndividualEmployeeCode] = useState("");
  const [file, setFile] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);

  const [
    bulkUserCreate,
    { bulkUploadData, bulkUploadLoading, bulkUploadEerror },
  ] = useMutation(BULK_UPLOAD_USER);

  const readFile = () => {
    if (!file) {
      // setErrorMessage("Please submit the file"); // Show "Please submit the file" if no file is selected
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const parsedData = convertToJson(data);
      setJsonData(parsedData);
      setDisplayTable(true);
      // setErrorMessage("Thank you for uploading the file"); // Show "Thank you for uploading the file" upon successful upload

      handleBulkSubmit({ bulkUserInput: parsedData });
    };
    reader.readAsBinaryString(file);
  };

  const convertToJson = (csv) => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  };

  const handleBulkSubmit = ({ bulkUserInput }) => {
    bulkUserCreate({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        bulkUserInput,
      },
    });
  };

  const fileInputRef = React.createRef();

  const filePathset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
  };


  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const [addEmployee] = useMutation(SIGNUP_USER, {
    // refetchQueries: [{ query: GET_REIMBURSEMENTS }],
  });

  const callAddIndividualEmployee = () => {
    addEmployee({
      variables: {
        userNew: {
          firstName: individualFirstName,
          lastName: individualLasttName,
          email: individualEmail,
          employeeCode: individualEmployeeCode,
          role: "user",
          contactNumber: individualPhone,
          username:
            individualFirstName +
            "-" +
            individualLasttName +
            "-" +
            "godeskless",
        },
      },
    })
      .then(() => {
        // Data submitted successfully, you can perform any additional actions here
        setIndividualFirstName("");
        setIndividualLasttName("");
        setIndividualEmail("");
        setIndividualPhone("");
        setIndividualEmployeeCode("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

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

  // const onFileChange = (files) => {
  //   console.log(files);
  // };

  const onFileChange = (e) => {
    const selectedFile = e[0];
    console.log(selectedFile);
    setFile(selectedFile);

    // if (selectedFile) {
    //   setErrorMessage("Please submit the file"); // Show "Please submit the file" when the file is selected
    // } else {
    //   setErrorMessage("Please upload an Excel file"); // Show "Please upload an Excel file" when no file is selected
    // }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "blue",
        width: "90%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 0.2,
          marginLeft: 30,
          flexDirection: "column",
          // backgroundColor: "red",
          border: "2px solid #ddd",
          padding: 4,
          borderRadius: 20,
          width: "90%",
          alignItems: "flex-start",
          justifyContent: "center",
          marginRight: 20,
        }}
      >
        <h6
          style={{
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
          Upload Excel
        </h6>

        <DropFileInput onFileChange={(files) => onFileChange(files)} uploadFile ={(files) => readFile(files)} />
      </div>

      <div
        style={{
          border: "2px solid #ddd",
          padding: 4,
          flex: 0.5,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "yellow",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h6
          style={{
            marginLeft: 10,
          }}
        >
          Add Individually
        </h6>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "yellow",
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              // backgroundColor: "palegreen",
              flexDirection: "column",
              display: "flex",
              width: "80%",
              height: 120,
              margin: 4,
              marginTop: 12,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div>
              <div
                style={{
                  // backgroundColor: "orange",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={individualFirstName}
                  onChange={(e) => setIndividualFirstName(e.target.value)}
                  required
                  style={{
                    width: "60%",
                    margin: 4,
                  }}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={individualLasttName}
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={(e) => setIndividualLasttName(e.target.value)}
                  required
                  style={{
                    width: "60%",
                    margin: 4,
                  }}
                />
              </div>

              <div
                style={{
                  // backgroundColor: "orange",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={individualEmail}
                  onChange={(e) => setIndividualEmail(e.target.value)}
                  required
                  style={{
                    width: "60%",
                    margin: 4,
                  }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  type="number"
                  placeholder="Enter Number"
                  value={individualPhone}
                  name="phone"
                  onChange={(e) => setIndividualPhone(e.target.value)}
                  required
                  style={{
                    width: "60%",
                    margin: 4,
                  }}
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Employee Code"
                variant="outlined"
                value={individualEmployeeCode}
                type="number"
                placeholder="Enter Employee Code"
                name="employeeCode"
                onChange={(e) => setIndividualEmployeeCode(e.target.value)}
                required
                style={{
                  width: "100%",
                  marginTop: 4,
                }}
              />
              <div
                style={{
                  // backgroundColor: "orange",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    callAddIndividualEmployee();
                  }}
                  style={{ fontSize: "medium", marginTop: 40, width: "80%" }}
                >
                  Add Employee
                </Button>
              </div>
            </div>
          </div>

          {/* <DropFileInput onFileChange={(files) => onFileChange(files)} /> */}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
