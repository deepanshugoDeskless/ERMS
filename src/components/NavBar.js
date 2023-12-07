import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [colorMode] = useMode();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <nav>
      <div
        className="nav-wrapper"
        style={{
          backgroundColor: "#eb0c70",
          flexDirection: "row",
          flex: 1,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems:'center',
        }}
      >
        <h2
          style={{
            color: "white",
            marginLeft: 10,
            padding: 20,
          }}
        >
          Expense Reimbursement Management Portal
        </h2>

        {token ? (
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{color:'white',backgroundColor:colors.blueAccent[500], width:'8%',height:'2%',right:'1em'}}
          >
            Logout
          </Button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
