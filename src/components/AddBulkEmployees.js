import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"; // Import useQuery
import { GET_TEAM_MEMBERS } from "../gqloperations/mutations"; // Import your GraphQL query
import { tokens } from "../../src/theme";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BULK_UPLOAD_USER, SIGNUP_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { ColorModeContext, useMode } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

function AddBulkEmployee() {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [file, setFile] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please upload an Excel file"
  );
  const [bulkUserCreate, { data, loading, error }] =
    useMutation(BULK_UPLOAD_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (e) => {
    fileInputRef.current.click();
  };

  const handleSubmit = ({ bulkUserInput }) => {
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
    setFile(selectedFile);

    if (selectedFile) {
      setErrorMessage("Please submit the file"); // Show "Please submit the file" when the file is selected
    } else {
      setErrorMessage("Please upload an Excel file"); // Show "Please upload an Excel file" when no file is selected
    }
  };

  const readFile = () => {
    if (!file) {
      setErrorMessage("Please submit the file"); // Show "Please submit the file" if no file is selected
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
      setErrorMessage("Thank you for uploading the file"); // Show "Thank you for uploading the file" upon successful upload

      handleSubmit({ bulkUserInput: parsedData });
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

  const tableStyle = {
    fontSize: "09px",
    borderCollapse: "collapse",
    overflowX: "scroll",
    minWidth: "100%",
  };

  const tableContainerStyle = {
    maxHeight: "400px",
    overflowY: "auto",
    overflowX: "auto",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "6px",
    textAlign: "center",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "6px",
    textAlign: "center",
  };

  const horizontalScrollStyle = {
    overflowX: "auto",
    maxWidth: "100%",
  };

  const columns = [
    { field: "employeeCode", headerName: "Employee ID", flex: 1 },
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
    {
      field: "email",
      headerName: "Email",
      flex: 1.8,
      valueFormatter: (params) => params.value.toLowerCase(),
    },
    {
      field: "role",
      headerName: "Access Level",
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
              row.role === "admin"
                ? colors.greenAccent[600]
                : row.role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.role === "admin"}
            {row.role === "manager"}
            {row.role === "user"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1.5,
    },
    {
      field: "sex",
      headerName: "Gender",
      flex: 1,
    },
  ];

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <h1 style={{ position: 'absolute', top: '0.3em', left: '11em' }}>Team</h1>
          <h5 style={{ position: 'absolute', top: '4.8em', left: '25em' }}>Managing the Team Members</h5> */}
          <Box
            style={{
              flex: 1,
              bottom: "0px",
              left: "5em",
              width: "84%",
            }}
          >
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                backgroundColor: "blue",
                height: "100vh",
                flex: 1,
              }}
            >
              <div
                style={{
                  backgroundColor: colors.blueAccent[800],
                  color: colors.blueAccent[200],
                  width: "84vw",
                  position: "fixed",
                  top: "01.5em",
                  height: "2em",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
                className="banner"
              >
                <h4 style={{}}>Add Employees</h4>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  flex: 1,
                  display: "flex",
                  width: "100%",
                  backgroundColor: "yellow",
                }}
              >
                <div
                  className="app"
                  style={{
                    marginTop: "2em",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="parent"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="file-upload"
                      // style={{
                      //   justifyContent: "center",
                      //   alignItems: "center",
                      // }}
                    >
                      <img
                        src={require("../Assets/cloud-upload.png")}
                        alt="upload"
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                      <body>Click box to upload</body>
                      <p>Maximun file size 10mb</p>
                      <input

                        type="file"
                        id="file"
                        style={{
                          display: "none",
                          width: "100%",
                          height: "100%",
                        }}
                        ref={fileInputRef}
                        onChange={filePathset}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="app"
                  style={{
                    marginTop: "2em",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="parent"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="file-upload"
                      // style={{
                      //   justifyContent: "center",
                      //   alignItems: "center",
                      // }}
                    >
                      <img
                        src={require("../Assets/cloud-upload.png")}
                        alt="upload"
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                      <body>Click box to upload</body>
                      <p>Maximun file size 10mb</p>
                      <input
                        type="file"
                        id="file"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        ref={fileInputRef}
                        onChange={filePathset}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <Box
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
                {/* <DataGrid
                checkboxSelection
                rows={data.users}
                columns={columns}
                getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
              /> */}

              {/* </Box> */}
            </div>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>

    // <div className="addemployee">
    //   <div className="h1">Add Employees</div>
    //   <Stack sx={{ width: "100%", marginTop: "-05%" }} spacing={2}>
    //     {displayTable ? (
    //       <Alert severity="success">{errorMessage}</Alert>
    //     ) : (
    //       <Alert severity={file ? "info" : "error"}>{errorMessage}</Alert>
    //     )}
    //   </Stack>
    //   <input
    //     type="file"
    //     id="file"
    //     ref={fileInputRef}
    //     onChange={filePathset}
    //     className="uploadfile"
    //   />
    //   <Stack spacing={2} direction="row">
    //     <Button
    //       variant="contained"
    //       onClick={readFile}
    //       style={{ fontSize: "medium", marginLeft: "30%" }}
    //     >
    //       Submit File
    //     </Button>
    //   </Stack>

    //   {displayTable && (
    //     <div style={tableContainerStyle}>
    //       <div style={horizontalScrollStyle}>
    //         <table style={tableStyle}>
    //           <thead>
    //             <tr>
    //               {Object.keys(jsonData[0]).map((key) => (
    //                 <th key={key} style={thStyle}>
    //                   {key}
    //                 </th>
    //               ))}
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {jsonData.map((row, index) => (
    //               <tr key={index}>
    //                 {Object.values(row).map((value, index) => (
    //                   <td key={index} style={tdStyle}>
    //                     {value}
    //                   </td>
    //                 ))}
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

export default AddBulkEmployee;
