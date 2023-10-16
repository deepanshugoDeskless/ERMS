import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
      user {
        _id
        firstName
        lastName
        role
      }
    }
  }
`;

export const BULK_UPLOAD_USER = gql`
  mutation BulkUserCreate($bulkUserInput: [UserElement]) {
    String: bulkUserCreate(bulkUserInput: $bulkUserInput)
  }
`;

export const GENERATE_OTP = gql`
  mutation GenerateOTP($email: String) {
    String: sendOtp(email: $email)
  }
`;

export const VALIDATE_OTP = gql`
  mutation ReSetUserPassword($reSetPasswordInput: ReSetPasswordInput) {
    String: reSetPassword(reSetPasswordInput: $reSetPasswordInput)
  }
`;

export const GET_TEAM_MEMBERS = gql`
  query GetAllUsers {
    users {
      _id
      firstName
      lastName
      email
      role
      username
      employeeCode
      sex
    }
  }
`;

export const CREATE_REIMBURSEMENT = gql`
  mutation CreateReimbursement($reimbursementNew: ReimbursementInput!) {
    createReimbursement(input: $reimbursementNew) {
      id
      title
      description
      type
      visitLocation
      noOfDays
      fromDate
      toDate
      askedAmount
    }
  }
`;

export const UPDATE_REIMBURSEMENTS = gql`
mutation UpdateReimbursments(
  $reimbursementsUpdateInput: ReimbursementsUpdateInput!
) {
  String: updateReimbursments(
    reimbursementsUpdateInput: $reimbursementsUpdateInput
  )
}

`;
export const GET_REIMBURSEMENTS = gql`
  query GetMyReimbursements {
    ireimbursements {
      _id
      title
      description
      type
      visitLocation
      noOfDays
      fromDate
      toDate
      askedAmount
      totalAmount
      by
      isPreApproved
    }
  }
`;
export const RAISE_REIMBURSEMENT_REQUEST = gql`
  mutation RaiseRequest($reimbursementNew: ReimbursementInput!) {
    Reimbursement: createReimbursment(reimbursementNew: $reimbursementNew) {
      _id
      by
    }
  }
`;
export const ADD_BULK_EXPENSE = gql`
  mutation CreateBulkExpense($expenseNewArray: [ExpenseInput]!) {
    expense: createBulkExpense(expenseNewArray: $expenseNewArray)
  }
`;

export const GET_PRE_REQUESTS = gql`
  query PendingPreApprovals {
    pendingPreRequests {
      _id
      title
      description
      type
      visitLocation
      noOfDays
      fromDate
      toDate
      askedAmount
      totalAmount
      isPreApproved
      expenses{
        amount
      }
      by {
        firstName
        lastName
      }
    }
  }
`;
