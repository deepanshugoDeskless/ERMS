import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Loader, Error, PersonScroll, UserDashboardAnimation } from "./loader";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADMIN_FETCH_REQUESTS,
  GET_PRE_REQUESTS,
  GET_REIMBURSEMENTS,
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations";
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import Button from "@mui/material/Button";
import MyCounterCard from "./counterCard";

const UserHome = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  //   Get the numeber of pending prerequests count
  //   Get the numeber of pending reimbursements count
  const {
    loadingRequests,
    errorRequests,
    data: dataRequests,
  } = useQuery(GET_REIMBURSEMENTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });
  if (loadingRequests) return <Loader />;
  if (errorRequests) return <Error />;

  const pendingPreRequests = dataRequests?.ireimbursements.filter(
    (element) => !element.isPreApproved && !element.isApproved
  );
  const pendingReimbursementRequests = dataRequests?.ireimbursements.filter(
    (element) => element.isPreApproved && !element.isApproved
  );
  console.log(
    "🚀 ~ file: userHome.jsx:54 ~ UserHome ~ pendingPreRequests:",
    pendingPreRequests
  );
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
                marginLeft: 40,
                color: colors.blueAccent[500],
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
                color: colors.blueAccent[200],
                opacity: 0.5,
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
          <UserDashboardAnimation />
          <MyCounterCard
            count={pendingPreRequests?.length}
            title={"Requested For Pre Approval"}
          />
          <MyCounterCard
            count={pendingReimbursementRequests?.length}
            title={"Claimed Reimbursement"}
          />
        </div>
      </Box>
    </>
  );
};

export default UserHome;
