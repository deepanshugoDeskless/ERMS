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

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });
  const [SigninUser, { error, loading, data }] = useMutation(LOGIN_USER);

  if (loading)
    return (
      <div
        className="loading"
        style={{ textAlign: "center", marginTop: "15em" }}
      >
        <h1>Loading</h1>{" "}
      </div>
    );
  if (data) {
    localStorage.setItem("token", data.user.token);
    navigate("/home");
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
              justifyContent: "center",
              height: "40.5em",
              width: "380px" /* Adjust the width as needed */,
              margin: "0 auto" /* Center the container horizontally */,
              padding: "10px 40px 0px 40px",
              backgroundColor: "#ffffff" /* Background color */,
              borderTopLeftRadius: "20px", // Adjust the value as needed
              borderTopRightRadius: "20px",
              boxShadow:
                "0px 0px 10px rgba(0, 0, 0, 0.2)" /* Box shadow for a subtle elevation effect */,
              transition:
                "backgroundColor 0.3s ease, transform 0.3s ease" /* Add transitions */,
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
                  position: "absolute",
                  top: "0em",
                  height: "10%",
                  fontSize: "medium",
                }}
              >
                {error.message}
              </div>
            )}
            <img
              style={{
                maxWidth: "30%",
                height: "20em",
                marginLeft: "0em",
                marginTop: "-07em",
              }}
              src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg"
            ></img>
            <h3 style={{ marginTop: "-60px", marginLeft: "0px" }}>
              Reimburesment Portal
            </h3>
            <h5 style={{ marginTop: "25px", marginBottom: "30px" }}>Login! </h5>
            <form
              onSubmit={handleSubmit}
              style={{
                // backgroundColor: "yellow",
                flexDirection: "red",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  //   backgroundColor: "yellow",
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
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  style={{
                    marginTop: "20px",
                    width: "100%",
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    callLogIn();
                  }}
                  style={{ fontSize: "medium", marginTop: 40, width: "100%" }}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
