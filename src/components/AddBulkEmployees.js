import React, { useState } from "react";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BULK_UPLOAD_USER, SIGNUP_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";

function AddBulkEmployee() {
  const [file, setFile] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Please Enter Excel File");
  const [bulkUserCreate, { data, loading, error }] =
    useMutation(BULK_UPLOAD_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Use the data from the GraphQL response here

  const handleClick = (e) => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    bulkUserCreate({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`, // Include your authorization token here
          // Other headers can be added as needed
        },
      },

      variables: {
        //   Need to put the Query variable as provided in the documentation
        bulkUserInput: [
          {
            employeeCode: "098865445678",
            firstName: "RAJ",
            lastName: "PAL",
            email: "paul123@gmail.com",
            sex: "male",
            username: "0987654321pal",
            role: "user",
          },
          {
            employeeCode: "12343245e2890",
            firstName: "RAJ",
            lastName: "PAL",
            email: "paul098765098765678@gmail.com",
            sex: "male",
            username: "pal4567899876",
            role: "user",
          },
          {
            employeeCode: "34567852352343",
            firstName: "RAJ",
            lastName: "PAL",
            email: "paul098987654567821@gmail.com",
            sex: "male",
            username: "dilipe89r9yr80",
            role: "user",
          },
        ],
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
    setErrorMessage(null); // Clear error message when a file is selected
  };

  const readFile = () => {
    if (!file) {
      // If no file is selected, set an error message
      setErrorMessage("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      const parsedData = convertToJson(data);
      setJsonData(parsedData);
      setDisplayTable(true);
      setErrorMessage("Thank you for uploading the file");
      console.log("Functional Bulk User Input:", parsedData);

      handleSubmit();
      console.log(
        "🚀 ~ file: AddBulkEmployees.js:99 ~ readFile ~ handleSubmit:"
      );

      // Need to call the GraphQL API with the data
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
    fontSize: "9px",
    borderCollapse: "collapse",
    overflowX: "auto",
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
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "6px",
    textAlign: "left",
  };

  const horizontalScrollStyle = {
    overflowX: "auto",
  };

  return (
    <div className="addemployee">
      <div className="h1">Add Employees</div>
      <Stack sx={{ width: "100%", marginTop: "-05%" }} spacing={2}>
        {errorMessage ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : (
          <Alert severity="success">Thank you for uploading the file</Alert>
        )}
      </Stack>
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        onChange={filePathset}
        className="uploadfile"
      />
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={readFile}
          style={{ fontSize: "medium", marginLeft: "30%" }}
        >
          Submit File
        </Button>
      </Stack>

      {displayTable && (
        <div style={tableContainerStyle}>
          <div style={horizontalScrollStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {Object.keys(jsonData[0]).map((key) => (
                    <th key={key} style={thStyle}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jsonData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index} style={tdStyle}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBulkEmployee;
