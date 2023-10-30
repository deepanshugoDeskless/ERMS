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

import Home from "./Home";
import Team from "./team";
import RaiseRequest from "./raiseRequest";
import AddEmployee from "./addBulkEmployee";
import ClaimReimbursement, { claimReimbursement } from "./claimReimbursement";
import ClaimRequest from "./claimRequest";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";
import PreApproveResuests from "./preApproveRequests";
import PreApproveRequest from "./preApproveRequests";
import ApproveReimbursements from "./approveReimbursements";
import ApprovedExpensesHistory from "./approvedexpenseshistory";


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
    page: <AddEmployee />,
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
    page: <PreApproveRequest />,
    path: "approveRequest",
    icon: <AirplaneTicketRoundedIcon />,
  },
  {
    id: 5,
    name: "Approve Reimbursements",
    page: <ApproveReimbursements />,
    path: "approveReimbursements",
    icon: <PriceCheckRoundedIcon />,
  },
  {
    id: 6,
    name: " Approved Requests",
    page: <ApprovedExpensesHistory />,
    path: "approvedrequests",
    icon: <HistoryIcon />,
  },
];

export const NEWFINANCE_SIDEBAR_DATA = [
  {
    id: 1,
    name: "dashboards",
    page: <Home />,
    path: "financeHome",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Add Employees",
    page: <AddEmployee />,
    path: "financeUsers",
    icon: <BulkUpload />,
  },
  {
    id: 3,
    name: "View Team",
    page: <Team />,
    path: "financeTeam",
    icon: <PeopleIcon />,
  },
  {
    id: 4,
    name: "Preapprove Reimbursements",
    page: <PreApproveRequest />,
    path: "financeApproveRequest",
    icon: <AirplaneTicketRoundedIcon />,
  },
  {
    id: 5,
    name: "Approve Reimbursements",
    page: <ApproveReimbursements />,
    path: "financeApproveReimbursements",
    icon: <PriceCheckRoundedIcon />,
  },
  {
    id: 6,
    name: " Approved Requests",
    page: <ApprovedExpensesHistory />,
    path: "financeApprovedrequests",
    icon: <HistoryIcon />,
  },
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
