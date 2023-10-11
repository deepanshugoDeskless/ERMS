import React, { useState } from "react";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
      jsonData: [],
      displayTable: false,
      errorMessage: "Please Enter Excel File",
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file, errorMessage: null }); // Clear error message when a file is selected
  }

  readFile() {
    var f = this.state.file;
    if (!f) {
      // If no file is selected, set an error message
      this.setState({ errorMessage: "No file selected" });
      return;
    }
    var name = f.name;
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
      const jsonData = this.convertToJson(data);
      this.setState({ jsonData, displayTable: true, errorMessage: "Thank you for uploading the file" }, () => {
        console.log("Bulk User Input:", this.state.jsonData);
        // Need to call the GraphQL API with the data 

      });
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }

  render() {
    const { jsonData, displayTable, errorMessage } = this.state;

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
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
          className="uploadfile"
        />
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              this.readFile();
            }}
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
}

export default ExcelToJson;