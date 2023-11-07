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
  ViewSidebarRoundedIcon,
  BackHandRoundedIcon,
  ApproveIcon,
} from "./Icons";

import Home from "./Home";
import Team from "./team";
import RaiseRequest from "./raiseRequest";
import AddEmployee from "./addBulkEmployee";
import ClaimRequest from "./claimRequest";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import PreApproveResuests from "./preApproveRequests";
import PreApproveRequest from "./preApproveRequests";
import ApproveReimbursements from "./approveReimbursements";
import ApprovedExpensesHistory from "./approvedexpenseshistory";
import UserHome from "./userHome";
import AdminHome from "./adminHome";
import FinanceHome from "./financeHome";
import ApprovedReimbursementsFinance from "./approvedReimbursementsFinance";
import ClaimedReimbursements from "./claimedReimbursements";
import ApprovedReimbursementsAdmin from "./approvedReimbursementsAdmin";
import ApprovedReimbursementsUser from "./approvedReimbursementsUser";
import AllApprovedReimbursementsFinance from "./AllApprovedReimbursementsFinance";
import AllApprovedReimbursementsAdmin from "./AllApprovedReimbursementsAdmin";
import DisburseReimbursement from "./DisburseReimbursement";

export const ADMIN_SIDEBAR_DATA = [
  {
    id: 1,
    name: "Admin Dashboards",
    page: <AdminHome />,
    path: "adminHome",
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
    icon: <ApproveIcon />,
  },
  {
    id: 6,
    name: "Approved Reimbursements",
    page: <ApprovedReimbursementsAdmin />,
    path: "approvedrequests",
    icon: <ApproveIcon />,
  },
  {
    id: 7,
    name: "History",
    page: <AllApprovedReimbursementsAdmin />,
    path: "AllApprovedRequests",
    icon: <HistoryIcon />,
  },
];

export const NEWFINANCE_SIDEBAR_DATA = [
  {
    id: 1,
    name: "Finance Dashboards",
    page: <FinanceHome />,
    path: "financeHome",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "View Team",
    page: <Team />,
    path: "financeTeam",
    icon: <PeopleIcon />,
  },
  {
    id: 3,
    name: "Disburse Reimbursements",
    page: <DisburseReimbursement />,
    path: "DisbursementFinance",
    icon: <PeopleIcon />,
  },
  {
    id: 4,
    name: "Approved Reimbursements",
    page: <ApprovedReimbursementsFinance />,
    path: "financeApproveReimbursements",
    icon: <ApproveIcon />,
  },
  {
    id: 5,
    name: "History",
    page: <AllApprovedReimbursementsFinance />,
    path: "financAlleApprovedReimbursements",
    icon: <HistoryIcon />,
  }
];

export const USER_SIDEBAR_DATA = [
  {
    id: 1,
    name: "User Dashboards",
    page: <UserHome />,
    path: "userHome",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Raise Request",
    page: <RaiseRequest />,
    path: "raiseRequest",
    icon: <BackHandRoundedIcon />,
  },
  {
    id: 3,
    name: "Claim Reimbursement",
    page: <ClaimRequest />,
    path: "claimRequest",
    icon: <AddmoneyIcon />,
  },
  {
    id: 4,
    name: "View Claimed Requests",
    page: <ClaimedReimbursements />,
    path: "viewClaimedRequests",
    icon: <ViewSidebarRoundedIcon />,
  },
  {
    id: 5,
    name: "View Approved Reimbursements",
    page: <ApprovedReimbursementsUser />,
    path: "viewApprovedReimbursementsUser",
    icon: <ApproveIcon />,
  },
];
