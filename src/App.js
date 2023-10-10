import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { routes, publicRoutes } from "./routes";
import { useRoutes } from "react-router";
import Sidebar from "./scenes/global/Sidebar";
import Addemployee from "./components/Addemployee";
import { ColorModeContext, useMode } from "../src/theme";
import { useState } from "react";

function App() {
  const element = useRoutes(routes);
  const publicElement = useRoutes(publicRoutes);
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <>
          <NavBar></NavBar> {element}
        </>
      ) : (
        <>
          <NavBar></NavBar>
          {publicElement}
        </>
      )}
    </>
  );
}

export default App;
