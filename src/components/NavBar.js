import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            // backgroundColor: "yellow",
            color: "white",
            marginLeft: 10,
            fontSize: 32,
          }}
        >
          Employee Reimburesment Management Portal
        </h2>

        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
