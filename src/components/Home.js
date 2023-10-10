import React from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import Sidebar from "../scenes/global/Sidebars";
import { ColorModeContext, useMode } from "../theme";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Topbar from "../scenes/global/Topbar";

// Your code here

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }

  return (
    // <div className="container">
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            {/* <Routes>
                <Route path="/team" element={<Team />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

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
