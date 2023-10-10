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
import Addemployee from "./Addemployee";
import Home from "./Home";
import Team from "./team";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "dashboards",
    page: <Home />,
    path: "home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Manage Team",
    page: <Team />,
    path: "layouts",
    icon: <PeopleIcon />,
  },
  {
    id: 3,
    name: "Contact Information",
    page: <Addemployee />,
    path: "contact",
    icon: <ContactIcon />,
  },
  {
    id: 4,
    name: "Add Employees",
    page: <Addemployee />,
    path: "users",
    icon: <BulkUpload />,
  },
  {
    id: 5,
    name: "invoice",
    page: <Addemployee />,
    path: "invoice",
    icon: <InvoiceIcon />,
  },
  {
    id: 6,
    name: "calendar",
    page: <Addemployee />,
    path: "calendar",
    icon: <CalendarIcon />,
  },
  {
    id: 8,
    name: "FAQ",
    page: <Addemployee />,
    path: "faq",
    icon: <FaqIcon />,
  },
];
