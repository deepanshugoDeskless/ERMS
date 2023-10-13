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
  TravelIcon,
  AddIcon,
  AddmoneyIcon,
  HistoryIcon,
} from "./Icons";
import Addemployee from "./Addemployee";
import Home from "./Home";
import Team from "./team";
import AddBulkEmployee from "./AddBulkEmployees";
import { AddReimbursement } from "./AddReimbursement";
import {ApprovedExpenses} from "./ApprovedExpenses";
import { AddTravel } from "./AddTravel";



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
    name: "View Team",
    page: <Team />,
    path: "team",
    icon: <PeopleIcon />,
  },
  {
    id: 3,
    name: "Add Employees",
    page: <AddBulkEmployee/>,
    path: "users",
    icon: <BulkUpload />,
  },
  {
    id: 4,
    name: "Raise Request",
    page: <AddTravel/>,
    path: "addtravel",
    icon: <TravelIcon />,
  },
  {
    id: 5,
    name: "Claim Reimbursement",
    page: <AddReimbursement />,
    path: "addreimbursement",
    icon: <AddmoneyIcon />
  },
  {
    id: 6,
    name: "Approved Expenses",
    page: <ApprovedExpenses/>,
    path: "expensesapproved",
    icon: <HistoryIcon />
  },

  // ,
  // {
  //   id: 6,
  //   name: "invoice",
  //   page: <Addemployee />,
  //   path: "invoice",
  //   icon: <InvoiceIcon />,
  // },
  // {
  //   id: 7,
  //   name: "calendar",
  //   page: <Addemployee />,
  //   path: "calendar",
  //   icon: <CalendarIcon />,
  // },
  // {
  //   id: 8,
  //   name: "FAQ",
  //   page: <Addemployee />,
  //   path: "faq",
  //   icon: <FaqIcon />,
  // },
];

