import React from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { colorMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Your code here

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }

  return (
    // <div className="container">
    <>
      {/* <blockquote>
        <h6>if it works dont touch it</h6>
        <p className="right-align">~ram</p>
      </blockquote>
      <blockquote>
        <h6>if it works dont touch it</h6>
        <p className="right-align">~ram</p>
      </blockquote> */}
    </>

    // </div>
  );
}
{
  /* <blockquote>
<h6>if it works dont touch it</h6>
<p className="right-align">~ram</p>
</blockquote>
<blockquote>
<h6>if it works dont touch it</h6>
<p className="right-align">~ram</p>
</blockquote> */
}
