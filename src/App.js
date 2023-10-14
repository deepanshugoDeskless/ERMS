import "./App.css";
import NavBar from "./components/NavBar";
import { routes, publicRoutes } from "./routes";
import { useRoutes } from "react-router";
import { ColorModeContext, useMode } from "../src/theme";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Home from "./components/Home";
// import Team from "./scenes/team";
// import Contacts from "./scenes/contacts";
import Team from "./components/team";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Welcome from "./components/Welcome";
import Addemployee from "./components/Addemployee";
import { DynamicItem, Sidebar, dummyData } from "./components";

function App() {
  
  const element = useRoutes(routes);
  const publicElement = useRoutes(publicRoutes);
  const token = localStorage.getItem("token");
  return (
    <>

      {token ? (
        <>
          <NavBar></NavBar> 
          <Sidebar>
          <Routes>
          <Route path="/" element={<DynamicItem page={< Home />}/>} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<DynamicItem page={item.page} />}
              />
            ))}
            
        </Routes>
      </Sidebar>
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

