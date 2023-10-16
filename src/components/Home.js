import React from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Loader, Error} from "./loader";

// Your code here

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <Loader/>;
  if (error) {
    console.log(error.message);
  }

  return (
    <div
      style={{
        width: "100%",
        hight: "100%",
        flex: 1,
        display: "flex",
        backgroundColor: "red",
      }}
    />
  );
}
