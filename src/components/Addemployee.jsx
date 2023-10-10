// import React, { useState } from "react";
// import * as XLSX from 'xlsx'; // or import { utils } from 'xlsx';

// import axios from "axios";
// import "./style.scss";
// import { utils } from 'xlsx'; // or import { read, write } from 'xlsx';


// function ExcelToJson() {
//   const [file, setFile] = useState({});
//   const [status, setStatus] = useState("");

//   function handleChange(e) {
//     const files = e.target.files[0];
//     setFile(files);
//   }

//   function handleFile() {
//     // const { file } = this.state;
//     /* Boilerplate to set up FileReader */
//     const reader = new FileReader();
//     const rABS = !!reader.readAsBinaryString;

//     reader.onload = e => {
//       /* Parse data */
//       const bstr = e.target.result;

//       const wb = XLSX.read(bstr, {
//         type: rABS ? "binary" : "array",
//         bookVBA: true
//       });

//       /* Get first worksheet */
//       //This const only read the first excelSheet
//       const wsname = wb.SheetNames[0];

//       //This const reads the excelData
//       const ws = wb.Sheets[wsname];

//       /* Converting the data into array object */
//       const data = XLSX.utils.sheet_to_json(ws);
//       console.log(data);

//       data.map(async unique => {
//         const response = await axios
//           .post("http://localhost:3000/api/point", {
//             x: unique["X"],
//             y: unique["Y"],
//             text: unique["NORMALIZED ADDRESS"],
//             brand: unique["MERCHANT"].toLowerCase(),
//             marker: unique["MARKER"]
//           })
//           .then(response => {
//             setStatus("success");
//           })
//           .catch(error => {
//             if (error.response) {
//               setStatus(`Error ${error.request.status}. ¡Volvé a intentarlo!`);
//             } else if (error.request) {
//               setStatus(`Error ${error.request.status}. ¡Volvé a intentarlo!`);
//             } else {
//               setStatus("Error. ¡Volvé a intentarlo!");
//             }
//           });
//       });
//     };

//     if (rABS) {
//       reader.readAsBinaryString(file);
//     } else {
//       reader.readAsArrayBuffer(file);
//     }
//   }

//   const Types = ["xlsx", "xls"]
//     .map(function (x) {
//       return "." + x;
//     })
//     .join(",");

//   const { name } = file;

//   return (
//     <div className="converter">
//       <p>Carga de archivo</p>
//       <input type="file" id="file" accept={Types} onChange={handleChange} />
//       <label htmlFor="file">Upload File</label>
//       {name === undefined ? <p>No hay archivo disponible</p> : <p>{name}</p>}
//       <br />
//       <button className="button" onClick={handleFile}>
//         MAPA
//       </button>
//       {status && status == "success" ? (
//         <p className="success">¡Carga exitosa!</p>
//       ) : (
//         <p className="error">{status}</p>
//       )}
//     </div>
//   );
// }

// export default ExcelToJson;
// import react, { usestate } from "react";
// import * as xlsx from "xlsx";

// class exceltojson extends react.component {
//   constructor(props) {
//     super(props);
//     this.handleclick = this.handleclick.bind(this);
//     this.state = {
//       file: "",
//     };
//   }

//   handleclick(e) {
//     this.refs.fileuploader.click();
//   }

//   filepathset(e) {
//     e.stoppropagation();
//     e.preventdefault();
//     var file = e.target.files[0];
//     console.log(file);
//     this.setstate({ file });

//     console.log(this.state.file);
//   }

//   readfile() {
//     var f = this.state.file;
//     var name = f.name;
//     const reader = new filereader();
//     reader.onload = (evt) => {
//       // evt = on_file_select event
//       /* parse data */
//       const bstr = evt.target.result;
//       const wb = xlsx.read(bstr, { type: "binary" });
//       /* get first worksheet */
//       const wsname = wb.sheetnames[0];
//       const ws = wb.sheets[wsname];
//       /* convert array of arrays */
//       const data = xlsx.utils.sheet_to_csv(ws, { header: 1 });
//       /* update state */
//       console.log("data>>>" + data);// shows that excel data is read
//       console.log(this.converttojson(data)); // shows data in json format
//     };
//     reader.readasbinarystring(f);
//   }

//   converttojson(csv) {
//     var lines = csv.split("\n");

//     var result = [];

//     var headers = lines[0].split(",");

//     for (var i = 1; i < lines.length; i++) {
//       var obj = {};
//       var currentline = lines[i].split(",");

//       for (var j = 0; j < headers.length; j++) {
//         obj[headers[j]] = currentline[j];
//       }

//       result.push(obj);
//     }

//     //return result; //javascript object
//     return json.stringify(result); //json
//   }

//   render() {
//     return (
//       <div>
//         <input
//           type="file"
//           id="file"
//           ref="fileuploader"
//           onchange={this.filepathset.bind(this)}
//         />
//         <button
//           onclick={() => {
//             this.readfile();
//           }}
//         >
//           read file
//         </button>
//       </div>
//     );
//   }
// }

// export default exceltojson;

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











// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// class ExcelToJson extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//     this.state = {
//       file: "",
//     };
//   }

//   handleClick(e) {
//     this.refs.fileUploader.click();
//   }

//   filePathset(e) {
//     e.stopPropagation();
//     e.preventDefault();
//     var file = e.target.files[0];
//     console.log(file);
//     this.setState({ file });

//     console.log(this.state.file);
//   }

//   readFile() {
//     var f = this.state.file;
//     var name = f.name;
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       // evt = on_file_select event
//       /* Parse data */
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       /* Get first worksheet */
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       /* Convert array of arrays */
//       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
//       /* Update state */
//       console.log("Data>>>" + data);// shows that excel data is read
//       const jsonBulk = JSON.parse(this.convertToJson(data));
//       var jsonBulkNew = {
//         "bulkUserInput" : jsonBulk
//       }
//       console.log(this.convertToJson(data)); // shows data in json format
//       console.log(jsonBulk); // shows data in json format
//       console.log(jsonBulkNew); // shows data in json format
//     };
//     reader.readAsBinaryString(f);
//   }

//   convertToJson(csv) {
//     var lines = csv.split("\n");

//     var result = [];

//     var headers = lines[0].split(",");

//     for (var i = 1; i < lines.length; i++) {
//       var obj = {};
//       var currentline = lines[i].split(",");

//       for (var j = 0; j < headers.length; j++) {
//         obj[headers[j]] = currentline[j];
//       }

//       result.push(obj);
//     }

//     //return result; //JavaScript object
//     return JSON.stringify(result); //JSON
//   }

//   render() {
//     return (
//       <div className="addemployee">
//         <div className="h1">Add Employees</div>
//         <Stack sx={{ width: '100%' , marginTop:'-05%'}} spacing={2}>
//       <Alert severity="info">Please Enter the Employee Excel Sheet</Alert>
//     </Stack>
//         <input
//           type="file"
//           id="file"
//           ref="fileUploader"
//           onChange={this.filePathset.bind(this)}
//           className="uploadfile"
//         />
//         <Stack spacing={2} direction="row">
//           <Button variant="contained"
//           onClick={() => {
//             this.readFile();
//           }} style={{fontSize:'medium', marginLeft}}> Submit File
//         </Button>
//         </Stack>

//       </div>
//     );
//   }
// }

// export default ExcelToJson;
// // import { useState } from "react";
// // import * as XLSX from 'xlsx';
// // import Pagination from '@mui/material/Pagination';
// // import Stack from '@mui/material/Stack';
// // import { Button } from '@mui/material';
// // import IconButton from '@mui/material/IconButton';

// // function App() {

// //   // onchange states
// //   const [excelFile, setExcelFile] = useState(null);
// //   const [typeError, setTypeError] = useState(null);

// //   // submit state
// //   const [excelData, setExcelData] = useState(null);

// //   // onchange event
// //   const handleFile=(e)=>{
// //     let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
// //     let selectedFile = e.target.files[0];
// //     if(selectedFile){
// //       if(selectedFile&&fileTypes.includes(selectedFile.type)){
// //         setTypeError(null);
// //         let reader = new FileReader();
// //         reader.readAsArrayBuffer(selectedFile);
// //         reader.onload=(e)=>{
// //           setExcelFile(e.target.result);
// //         }
// //       }
// //       else{
// //         setTypeError('Please select only excel file types');
// //         setExcelFile(null);
// //       }
// //     }
// //     else{
// //       console.log('Please select your file');
// //     }
// //   }
  
// //   // submit event
// //   const handleFileSubmit=(e)=>{
// //     e.preventDefault();
// //     if(excelFile!==null){
// //       const workbook = XLSX.read(excelFile,{type: 'buffer'});
// //       const worksheetName = workbook.SheetNames[0];
// //       const worksheet = workbook.Sheets[worksheetName];
// //       const data = XLSX.utils.sheet_to_json(worksheet);
// //       setExcelData(data.slice(0,1500000));
// //     }
// //   }

// //   return (
// //     <div className="wrapper">


// //       <h3 style={{marginLeft:'11em'}}>Employee Excel Sheet</h3>
// //       <div className="panel" style={{backgroundColor:'yellow',padding:'20px'}}>
// //           <div className="internalelem" style={{marginLeft:'29em'}}>
// //       <form className="form-group custom-form" onSubmit={handleFileSubmit}>
// //         <input type="file" className="form-control" required onChange={handleFile} />
// //         <button type="submit" className="btn btn-success btn-md" style={{marginLeft:'0em'}}>VIEW UPLOAD</button>
// //         <Button variant="contained" style={{padding:'0.64em',marginLeft:'4em', width:'10em'}}>Submit Upload</Button>
// //         {typeError&&(
// //           <div className="alert alert-danger" role="alert">{typeError}</div>
// //         )}
// //       </form>
// //       </div>
// //       </div>
// //       {/* form */}

      {/* view data */}
      

// //     </div>
    
// //   );
// // }

// // export default App;