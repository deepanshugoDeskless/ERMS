// src/components/Sidebar/index.jsx
import React, { useState } from "react";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";
// import BrandLogo from "./BrandLogo.svg";

import { SidebarItems } from "..";
import { requirePropFactory } from "@mui/material";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            {/* Logo wrapper starts */}
            <SidebarLogo href="#">
              <span className="app-brand-logo demo">
                {/* <img src={BrandLogo} alt="Brand logo" /> */}
              </span>
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app__brand__text"
              >
                <img src={require('../../Assets/GD Logo 128px 1.png')} style={{
                  height: 60
                }}/>
              </SidebarBrand>
            </SidebarLogo>
            {/* <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="outer__circle">
                <div className="inner__circle" />
              </div>
            </SidebarToggler> */}
          </SidebarLogoWrapper>
          {/* Render the SidebarItems component */}
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
}
