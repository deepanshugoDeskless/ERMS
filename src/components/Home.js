import React from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Loader, Error, PersonScroll } from "./loader";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@apollo/client"; // Import useQuery
import {
  GET_TEAM_MEMBERS,
  GET_PRE_REQUESTS,
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations"; // Import your GraphQL query
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import Button from "@mui/material/Button";
import MyCounterCard from "./counterCard";

const Home = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    console.log(
      "🚀 ~ file: preApproveRequests.jsx:25 ~ handleSelectionModelChange ~ newSelection:",
      newSelection
    );
    setSelectionModel(newSelection);
  };
  const { loading, error, data, refetch } = useQuery(GET_PRE_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const [updateReimbursements, { updateData, updateLoading, updateError }] =
    useMutation(UPDATE_REIMBURSEMENTS, {
      onCompleted: () => {
        refetch({
          // Additional fetch options
          context: {
            headers: {
              // Your custom headers here
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
        });
      },
    });

  if (loading) return <Loader />;

  const userFirstName = `${localStorage.getItem("user-firstname")}`;
  const userLastName = `${localStorage.getItem("user-lastname")}`;
  const handleBulkApproveSubmit = () => {
    updateReimbursements({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        reimbursementsUpdateInput: {
          ids: selectionModel,
          reimbursementInput: {
            isPreApproved: true,
          },
        },
      },
    });
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "by",
      headerName: "Requested By",
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
            {row.by.firstName + " " + row.by.lastName}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.role}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "visitLocation",
      headerName: "Place",
      flex: 0.5,
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 0.7,
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 0.7,
    },
    {
      field: "askedAmount",
      headerName: "Ask",
      flex: 1,
    },
  ];

  return (
    <>
      <Box
        style={{
          position: "absolute",
          left: "5em",
          right: "0px",
          top: "1.5em",
        }}
      >
        <div
          style={{
            // backgroundColor: colors.blueAccent[800],
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="banner"
        >
          <div
            style={{
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "baseline",
              display: "flex",
              width: "100%",
            }}
            className="banner"
          >
            <h4
              style={{
                marginTop: 40,
                marginLeft: 40,
                // fontFamily: "Bebas Neue,sans-serif",
                fontSize: "xxx-large",
                fontSize: 50,
                fontWeight: 400,
                color: colors.blueAccent[200],
              }}
            >
              Hi
            </h4>
            <h3
              style={{
                marginTop: 40,
                marginLeft: 40,
                color: colors.blueAccent[500],
                // fontSize: 50,
                // fontWeight: 400,
                // fontFamily: "Bebas Neue,sans-serif",
                fontSize: "xxx-large",
              }}
            >
              {userFirstName},
            </h3>
            <h4
              style={{
                marginTop: 40,
                marginLeft: 40,
                fontSize: 40,
                fontWeight: 400,
                // fontFamily: "Bebas Neue,sans-serif",
                // fontSize: "xxx-large",
                color: colors.blueAccent[200],
                opacity: 0.5,
              }}
            >
              Welcome To GoDeskless ERMS
            </h4>
          </div>

          {/* <Button
            variant="contained"
            type="submit"
            onClick={() => {
              handleBulkApproveSubmit();
            }}
            style={{
              marginRight: 40,
              fontSize: "small",
              width: "10%",
              height: "50%",
            }}
          >
            Approve
          </Button> */}
        </div>
        <div
          style={{
            // backgroundColor: colors.blueAccent[800],
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: 40,
            justifyContent: "space-between",
          }}>
          <PersonScroll />
          <MyCounterCard count={23} title={"Reimbursement Approved"}/>
          <MyCounterCard count={12} title={"Reimbursement Pending"}/>
        </div>
        {/* <Box
          height="85vh"
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
            rows={data.pendingPreRequests}
            columns={columns}
            getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
          />
        </Box> */}
      </Box>
    </>
  );
};

export default Home;
