import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../src/theme";
import { useMode } from "../../src/theme";
import { useQuery } from "@apollo/client";
import {
  GET_TEAM_MEMBERS,
  GET_REIMBURSEMENTS,
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations";

const PreApproveRequest = (key, showPlusButton, addForm) => {
  const [colorMode] = useMode();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    // Open the form when a row is selected
    setFormOpen(true);
  };

  // Function to format date as "date, month"
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sample data
  const sampleData = [
    {
      id: 1,
      title: "Mumbai Visit",
      name: "Souraj",
      type: "Mumbai Visit",
      fromDate: "2023-05-12",
      askedAmount: 5000,
    },
    {
      id: 2,
      title: "Bangalore Visit",
      name: "Deepanshu",
      type: "Mumbai Travel",
      fromDate: "2023-02-01",
      askedAmount: 7000,
    },
    {
      id: 2,
      title: "SFO Visit",
      name: "Punam",
      type: "Mumbai Travel",
      fromDate: "2023-02-01",
      askedAmount: 7000,
    },
    {
      id: 2,
      title: "Delhi Visit",
      name: "Ram",
      type: "Mumbai Travel",
      fromDate: "2023-02-01",
      askedAmount: 7000,
    },

    // Add more sample data entries here
  ];

  // Update the fromDate in the sample data to display in "date, month" format
  sampleData.forEach((item) => {
    item.fromDate = formatDate(item.fromDate);
  });

  const columns = [
    { field: "title", headerName: "Title", flex: 0.6 },
    { field: "name", headerName: "Requester", flex: 0.5 },
    // { field: "type", headerName: "Type", flex: 1 },
    { field: "fromDate", headerName: "Date", flex: 0.5 },
    { field: "askedAmount", headerName: "Ask", flex: 0.5 },
  ];

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
            backgroundColor: "yellow",
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            zIndex: -1,
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="banner"
        >
          <h4
            style={{
              marginLeft: 10,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Approve Reimbursements
          </h4>
          <Button
            variant="contained"
            type="submit"
            style={{
              marginRight: 40,
              fontSize: "medium",
              width: "10%",
              height: "50%",
            }}
          >
            Approve
          </Button>
        </div>
        <Box
          height="82.3vh"
          width="36vw"
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
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleSelectionModelChange(newRowSelectionModel);
            }}
            rowSelectionModel={selectionModel}
            rows={sampleData}
            columns={columns}
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>

      {isFormOpen && (
        <div
          style={{
            position: "relative",
            marginTop: "1em",
            marginLeft: "5.8em",
            width: "calc(70% - 7em)",
            backgroundColor: "white",
            maxHeight: "82vh",
            overflow: "auto",
            borderLeft: "2px solid #ccc", // Adding a border
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Adding a box shadow
          }}
        >
          <h4
            style={{
              marginBottom: "0.5em",
              fontSize: "x-large",
              fontSize: 50,
              fontWeight: 400,
              position: "fixed",
              marginLeft: "0.5em",
              color: colors.blueAccent[200],
            }}
          >
            Mumbai Visit
          </h4>
          <h6
            style={{
              marginTop: "2.4em",
              marginLeft: "-15.2em",
              marginBottom: "1em",
              fontSize: "0.6em",
            }}
          >
            Flight Travel
          </h6>
          <div
            className="innerbox"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Type"
                defaultValue="Travel"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Date "
                defaultValue="12 May"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="#Invoice ID"
                defaultValue="#98612"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="#Establishment"
                defaultValue="Vistara"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Amount"
                defaultValue="₹4000"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={2}
              style={{
                width: "4.8em",
                position: "relative",
                left: "-3.8em",
                top: "0.4em",
              }}
              defaultValue="Flight Cost PUN-BOM AIR VISTARA"
            />
          </Box>
          <h6
            style={{
              marginTop: "1em",
              marginLeft: "-15.5em",
              marginBottom: "1em",
              fontSize: "0.6em",
            }}
          >
            Team Lunch
          </h6>
          <div
            className="innerbox"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Type"
                defaultValue="Meal"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em", position: "relative", left: "0.5em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Date "
                defaultValue="14 June"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em", position: "relative", left: "0.4em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="#Invoice ID"
                defaultValue="#8236"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em", position: "relative", left: "0.3em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="#Establishment"
                defaultValue="BBQ Nation"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em", position: "relative", left: "0.2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Amount"
                defaultValue="₹4000"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={2}
              style={{
                width: "4.8em",
                position: "relative",
                left: "-3.8em",
                top: "0.4em",
              }}
              defaultValue="TML Team Lunch at Barbcue Nation, Worli"
            />
          </Box>
          <h6
            style={{
              marginTop: "1em",
              marginLeft: "-14em",
              marginLeft: "-15.5em",
              marginBottom: "1em",
              fontSize: "0.6em",
            }}
          >
            Purchase{" "}
          </h6>
          <div
            className="innerbox"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Type"
                defaultValue="Purchase"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Date "
                defaultValue="18 June"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-read-only-input"
                label="Amount"
                defaultValue="₹4000"
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                style={{ width: "2em" }}
              />
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default PreApproveRequest;
