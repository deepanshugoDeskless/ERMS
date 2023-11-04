import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_OTP, SIGNUP_USER } from "../gqloperations/mutations";
import signup from "../Assets/signup.json";
import Lottie from "lottie-react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { VALIDATE_OTP } from "../gqloperations/mutations";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import Button from "@mui/material/Button";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [emailData, setEmailData] = useState("");
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const [sendOtp, { otpData, otpLoading, otpError }] =
    useMutation(GENERATE_OTP);
  const [reSetPassword, { otpvalid, otpchecking, otpverifyError }] =
    useMutation(VALIDATE_OTP);
  const navigate = useNavigate();

  // State to manage OTP input fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [completeOtp, setCompleteOtp] = useState("");
  const [displayOtp, setDisplayOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayPasswordFields, setDisplayPasswordFields] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Handle form input changes
  const handleChange = (e) => {
    setEmailData(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle OTP input changes
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    var password = "";
    newOtp.forEach((dig) => {
      password = password + dig;
    });

    setCompleteOtp(password);
    // console.log("🚀 ~ file: Signup.js:38 ~ handleOtpChange ~ completeOtp:", newOtp)

    // Automatically move to the next digit field
    if (index < 5 && e.target.value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  // Handle password field changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp({
      variables: {
        email: emailData,
      },
    })
      .then(() => {
        // Data submitted successfully, you can perform any additional actions here
        setDisplayOtp(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle activation process
  const handleActivateAccount = () => {
    if (displayOtp && !displayPasswordFields) {
      setDisplayPasswordFields(true);
    } else if (displayPasswordFields) {
      // Handle activation logic here
      if (password === confirmPassword) {
        // Passwords match, continue with activation logic
        console.log("Activation logic here");

        reSetPassword({
          variables: {
            reSetPasswordInput: {
              email: emailData,
              password: password,
              otp: completeOtp,
            },
          },
        });
      } else {
        // Passwords do not match, show an error or handle accordingly
        alert("Passwords do not match.");
      }
    }
  };

  return (
    <>
      <div
        className="leftcontainer"
        style={{ width: "30em", marginLeft: "10em", marginTop: "5em" }}
      >
        <Lottie animationData={signup} />
      </div>
      <div
        className="container my-container"
        style={{
          // backgroundColor: "gray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "40.5em",
          width: "380px",
          margin: "0 auto",
          padding: "10px 40px 0px 40px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          transition: "backgroundColor 0.3s ease, transform 0.3s ease",
          position: "absolute",
          bottom: "0px",
          marginLeft: "55em",
        }}
      >
        {(error || otpError) && (
          <div
            className="red card-panel"
            style={{
              position: "absolute",
              top: "15em",
              width: "236%",
              height: "10%",
              fontSize: "small",
              borderRadius: "20px",
            }}
          >
            {error.message}
          </div>
        )}

        {data && data.user && (
          <div className="green card-panel" style={{ padding: "-5em" }}>
            {data.user.firstName} is Signed Up. You can log in now!
          </div>
        )}

        <img
          style={{
            paddingTop: 30,
            height: 150,
            marginTop: 10,
          }}
          src={require("../Assets/gdklogo.png")}
        ></img>
        <h3
          style={{
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          Activate Account
        </h3>

        {/* Email ID field */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              onChange={handleChange}
              required
              style={{
                width: 320,
              }}
            />
          </div>
        </Box>
        {displayOtp && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "0.4em",
            }}
          >
            <h4
              style={{
                marginLeft: 4,
                fontFamily: "Bebas Neue,sans-serif",
                fontSize: "x-large",
                color: colors.blueAccent[200],
                marginBottom: "0.4em",
              }}
            >
              Please Enter the OTP
            </h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otpInput-${index}`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, index)}
                  style={{
                    width: "2.1em",
                    height: "3em",
                    borderRadius: 4,
                    textAlign: "center",
                    margin: 4,
                    fontSize: "1.2em",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {displayPasswordFields && (
          <>
            <TextField
              type="password"
              label="Create New Password"
              onChange={handlePasswordChange}
              required
              style={{
                marginTop: 24,
                width: "93%",
              }}
            />
            <TextField
              type="password"
              label="Confirm Password"
              onChange={handleConfirmPasswordChange}
              required
              style={{
                marginTop: 8,
                width: "93%",
                textDecoration: "none !important",
              }}
            />
          </>
        )}
        {!displayOtp && (
          <Button
            variant="outlined"
            onClick={handleSubmit}
            style={{ fontSize: "large", width: "93%", marginTop: 24 }}
          >
            Get OTP
          </Button>
        )}

        {displayOtp && !displayPasswordFields && (
          <Button
            variant="outlined"
            onClick={handleActivateAccount}
            style={{ fontSize: "large", width: "93%", marginTop: 24 }}
          >
            Next
          </Button>
        )}

        {displayPasswordFields && (
          <Button
            variant="contained"
            onClick={handleActivateAccount}
            style={{ fontSize: "large", width: "93%", marginTop: 24 }}
          >
            Activate Account
          </Button>
        )}
      </div>
    </>
  );
}
