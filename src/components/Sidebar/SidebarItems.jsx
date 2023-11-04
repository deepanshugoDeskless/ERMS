import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

import { adminSideMenu, userSideMenu, newfinanceSideMenu } from "..";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);

  const role = localStorage.getItem("user-role");
  var sideMenu;
  if (role == "admin") {
    sideMenu = adminSideMenu;
  } else if (role == "finance") {
    sideMenu = newfinanceSideMenu;
  } else {
    sideMenu = userSideMenu;
  }
  return (
    <ItemsList>
      {sideMenu.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.path}>
            <ItemWrapper>
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
