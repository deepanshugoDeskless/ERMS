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

