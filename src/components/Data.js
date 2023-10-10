// src/components/Data.js
import {
    HomeIcon,
    LayoutIcon,
    CalendarIcon,
    InvoiceIcon,
    UserIcon,
    RolesIcon,
    PagesIcon,
    AuthIcon,
    WizardIcon,
    ModalIcon,
    PeopleIcon,
    BulkUpload,
    ContactIcon,
    FaqIcon,
  } from "./Icons";
  
  export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "dashboards",
      path: "home",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      name: "Manage Team",
      path: "layouts",
      icon: <PeopleIcon />,
    },
    {
        id: 3,
        name: "Contact Information",
        path: "contact",
        icon: <ContactIcon />,
      },
    {
        id: 4,
        name: "Add Employees",
        path: "users",
        icon: <BulkUpload />,
        
      },
      {
        id: 5,
        name: "invoice",
        path: "invoice",
        icon: <InvoiceIcon />,
      },
      {
      id: 6,
      name: "calendar",
      path: "calendar",
      icon: <CalendarIcon />,
    },
    // {
    //   id: 7,
    //   name: "roles & permissions",
    //   path: "roles",
    //   icon: <RolesIcon />,
    // },
    {
      id: 8,
      name: "FAQ",
      path: "faq",
      icon: <FaqIcon />,
    },
    // {
    //   id: 9,
    //   name: "authentication",
    //   path: "authentication",
    //   icon: <AuthIcon />,
    // },
    // {
    //   id: 10,
    //   name: "wizard examples",
    //   path: "wizard",
    //   icon: <WizardIcon />,
    // },
    // {
    //   id: 11,
    //   name: "modal examples",
    //   path: "modal",
    //   icon: <ModalIcon />,
    // },
  ];