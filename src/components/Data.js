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
import RaiseRequest from "./raiseRequest";
import AddBulkEmployee from "./AddBulkEmployees";
import { AddReimbursement } from "./AddReimbursement";
import { ApprovedExpenses } from "./ApprovedExpenses";
import { AddTravel } from "./AddTravel";
import ClaimReimbursement, { claimReimbursement } from "./claimReimbursement";
import ClaimRequest from "./claimRequest";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";

export const ADMIN_SIDEBAR_DATA = [
  {
    id: 1,
    name: "dashboards",
    page: <Home />,
    path: "home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Add Employees",
    page: <AddBulkEmployee />,
    path: "users",
    icon: <BulkUpload />,
  },
  {
    id: 3,
    name: "View Team",
    page: <Team />,
    path: "team",
    icon: <PeopleIcon />,
  },
  {
    id: 4,
    name: "Preapprove Reimbursements",
    page: <ApprovedExpenses />,
    path: "expensesapproved",
    icon: <AirplaneTicketRoundedIcon />,
  },
  {
    id: 5,
    name: "Approve Reimbursements",
    page: <ApprovedExpenses />,
    path: "expensesapproved",
    icon: <PriceCheckRoundedIcon />,
  },
  // {
  //   id: 6,
  //   name: "Raise Request",
  //   page: <AddTravel />,
  //   path: "addtravel",
  //   icon: <TravelIcon />,
  // },
  // {
  //   id: 7,
  //   name: "Claim Reimbursement",
  //   page: <ClaimReimbursement />,
  //   path: "claimreimbursement",
  //   icon: <AddmoneyIcon />,
  // },

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

export const USER_SIDEBAR_DATA = [
  {
    id: 1,
    name: "dashboards",
    page: <Home />,
    path: "home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Raise Request",
    page: <RaiseRequest />,
    path: "raiseRequest",
    icon: <TravelIcon />,
  },
  {
    id: 3,
    name: "Claim Request",
    page: <ClaimRequest />,
    path: "claimRequest",
    icon: <AddmoneyIcon />,
  },
];
