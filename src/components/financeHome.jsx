import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Loader,
  Error,
  PersonScroll,
  FinanceDashboardAnimation,
} from "./loader";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_TEAM_MEMBERS,
  GET_PRE_REQUESTS,
  ADMIN_FETCH_REQUESTS,
  UPDATE_REIMBURSEMENTS,
  GET_APPROVED_REIMBURSEMENTS,
} from "../gqloperations/mutations";
import { tokens } from "../../src/theme";
import Header from "./Header";
import Button from "@mui/material/Button";
import MyCounterCard from "./counterCard";

const FinanceHome = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const {
    loadingApprovedReimbursements,
    errorApprovedReimbursements,
    data: dataApprovedReimbursements,
  } = useQuery(GET_APPROVED_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const {
    loadingReimbursementRequests,
    errorReimbursementRequests,
    data: dataReimbursementRequest,
  } = useQuery(ADMIN_FETCH_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  if (loadingApprovedReimbursements || loadingReimbursementRequests)
    return <Loader />;
  if (errorApprovedReimbursements || errorReimbursementRequests)
    return <Error />;

  const userFirstName = `${localStorage.getItem("user-firstname")}`;
  const userLastName = `${localStorage.getItem("user-lastname")}`;

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
                marginLeft: 20,
                color: colors.blueAccent[500],
                fontSize: "xxx-large",
              }}
            >
              {userFirstName},
            </h3>
            <h4
              style={{
                marginTop: 40,
                marginLeft: 10,
                fontSize: 40,
                fontWeight: 400,
                color: colors.blueAccent[200],
                opacity: 0.5,
                textTransform: "none", 
              }}
            >
              Welcome To goDeskless ERMS
            </h4>
          </div>
        </div>
        <div
          style={{
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
          }}
        >
          <FinanceDashboardAnimation />
          <MyCounterCard
            count={dataApprovedReimbursements?.approvedReimbursements?.length}
            title={"Approved Reimbursement"}
          />
          <MyCounterCard
            count={dataReimbursementRequest?.pendingReimbursements?.length}
            title={"Pending Claims"}
          />
        </div>
      </Box>
    </>
  );
};

export default FinanceHome;
