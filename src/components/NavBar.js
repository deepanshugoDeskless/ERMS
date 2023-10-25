import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
        }}
      >
        <h2
          style={{
            color: "white",
            marginLeft: 10,
            padding: 20,
          }}
        >
          Expense Reimburesment Management Portal
        </h2>

        {token ? (
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
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
