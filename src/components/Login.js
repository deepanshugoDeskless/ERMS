import { useMutation } from "@apollo/client";
import { padding, spacing } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";
import React, { useEffect, useRef } from "react";
import login from "../Assets/signinfinale.json";
import Lottie from "lottie-react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import loginupdated from "../Assets/loginupdated.json";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Loader, Error } from "./loader";
import { Link } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [SigninUser, { error, loading, data }] = useMutation(LOGIN_USER);

  if (loading)
    return (
      <div
        className="loading"
        style={{
          textAlign: "center",
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  if (data) {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("user-firstname", data.user.user.firstName);
    localStorage.setItem("user-lastname", data.user.user.lastName);
    localStorage.setItem("user-role", data.user.user.role);
    switch (data.user.user.role) {
      case "user":
        navigate("/userHome");
        break;
      case "admin":
        navigate("/adminHome");
        break;
      case "finance":
        navigate("/financeHome");
        break;
      default:
        navigate("/userHome");
        break;
    }
  }

  const handleEmailChange = (email) => {
    console.log("🚀 ~ file: Login.js:38 ~ handleEmailChange ~ email:", email);
    setLoginRequest({
      ...loginRequest,
      email: email,
    });
  };

  const handlePasswordChange = (password) => {
    console.log(
      "🚀 ~ file: Login.js:46 ~ handlePasswordChange ~ password:",
      password
    );
    setLoginRequest({
      ...loginRequest,
      password: password,
    });
  };


  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SigninUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  const callLogIn = () => {
    console.log(
      "🚀 ~ file: Login.js:73 ~ callLogIn ~ loginRequest:",
      loginRequest
    );

    SigninUser({
      variables: {
        userSignin: loginRequest,
      },
    });
  };

  var bgColors = {
    Default: "#81b71a",
    Blue: "#00B1E1",
    Cyan: "#37BC9B",
    Green: "#8CC152",
    Red: "#E9573F",
    Yellow: "#F6BB42",
  };

  const isLoginButtonDisabled = !loginRequest.email || !loginRequest.password;
  const isEmailValid = loginRequest.email.endsWith("@godeskless.com");

  return (
    <>
      <div
        className="wholepage"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="leftpart" style={{ width: "30em", marginLeft: "10em" }}>
          <Lottie
            style={{ position: "absolute", width: "35%", top: "09em" }}
            animationData={loginupdated}
          />
        </div>

        <div className="rightpart">
          <div
            className="container my-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "40.5em",
              width: "380px",
              margin: "0 auto",
              padding: "10px 40px 0px 40px",
              backgroundColor: "#ffffff",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              transition: "backgroundColor 0.3s ease, transform 0.3s ease",
              marginTop: "-28em",
              marginLeft: "55em",
              position: "absolute",
              bottom: "0px",
            }}
          >
            {error && (
              <div
                className="red card-panel"
                style={{
                  display:'flex',
                  justifyContent:'center',
                  paddingTop:'10px',
                  textAlign:'center',
                  backgroundColor:'red',
                  color:'white',
                  borderRadius:'12px',
                  width:'20em',
                  position: "relative",
                  top: "0em",
                  height: "10%",
                  fontSize: "large",
                }}
              >
                Error : {error.message} 
              </div>
            )}
            <img
              style={{
                width: 130,
                marginTop: 30,
              }}
              src={require("../Assets/gdklogo.png")}
            ></img>
            <h3 style={{ marginTop: 30 }}>Reimburesment Portal</h3>
            <h3 style={{ marginTop: 30 }}>Login! </h3>
            <form
              onSubmit={handleSubmit}
              style={{
                flexDirection: "red",
                display: "flex",
                width: "100%",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
         <TextField
            type="email"
            placeholder="Enter your EmailID"
            name="email"
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            style={{
              marginTop: "10px",
              width: "100%",
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            error={loginRequest.email.trim() !== "" && !isEmailValid}
            helperText={
              loginRequest.email.trim() !== "" && !isEmailValid
                ? "Please enter your goDeskless Email ID"
                : ""
            }
          />
          
            <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        placeholder="Enter Your Password"
        name="password"
        onChange={(e) => handlePasswordChange(e.target.value)}
        required
        style={{
          marginTop: "20px",
          width: "100%",
        }}
        InputProps={{
          endAdornment: (
             <InputAdornment position="end">
                 <IconButton onClick={handleTogglePassword}>
               {showPassword ? <Visibility /> : <VisibilityOff />}
             </IconButton>
           </InputAdornment>
          ),
        }}
      />
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              callLogIn();
            }}
            style={{ fontSize: "medium", marginTop: 60, width: "100%" }}
            disabled={isLoginButtonDisabled}
          >
            Login
          </Button>
          {/* Add the "Forgot Password?" hyperlink */}
          <Link to="/forgotpassword" style={{ marginTop: 10, textDecoration: "none" }}>
            Forgot Password?
          </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
