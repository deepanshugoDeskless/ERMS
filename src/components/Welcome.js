import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { maxWidth } from "@mui/system";
import Typewriter from "typewriter-effect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ImageWithText = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const imageContainerStyle = {
    flex: 1,
    padding: "0px 0px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundRepeat: "no-repeat",
    maxWidth: "40vw",
  };

  const imageStyle = {
    maxWidth: "50%",
    height: "auto",
  };

  const textContainerStyle = {
    flex: 1,
    padding: "0 20px",
    backgroundColor: "#2e2b81",
    color: "#ffff",
    height: "100vh",
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    marginLeft: "40px",
  };

  const textStyle = {
    fontSize: "16px",
  };

  const titleStyleheader = {
    fontSize: "25px",
    marginLeft: "44px",
    fontStyle: "oblique",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#eb0c70",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "40px",
  };

  const buttonStyle2 = {
    backgroundColor: "#eb0c70",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "40px",
    backgroundColor: "transparent",
    border: "2px solid #eb0c70",
    padding: "10px 20px",
    color: "#ffffff",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff69b4",
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          style={{
            position: "relative",
            left: "10em",
            top: "6em",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            height: "14em",
            width: "14em",
          }}
          src={require("../Assets/gdklogo.png")}
        ></img>
        <h2
          className="font-link3"
          style={{ position: "absolute", left: "0em", top: "09em" }}
        >
          {" "}
          goDeskless
        </h2>
      </div>
      <div
        style={{
          ...textContainerStyle,
          direction: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          className="font-link"
          style={{
            marginTop: 220,
          }}
        >
          Welcome to goDeskless Expense Reimbursement Portal
        </h1>
        <h3 className="font-link2">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 40,
              strings: [
                "Empowering employees with seamless reimbursement at goDeskless.",
                "Log in, get reimbursed. goDeskless keeps it simple!",
                "New hire? Signup, Activate, Reimburse, and thrive with goDeskless!",
              ],
            }}
          />
        </h3>
        <div
          className="buttonsforloginsignup"
          style={{
            direction: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Link to="/login">
            <button style={buttonStyle}>Log In</button>
          </Link>

          <Link to="/signup">
            <button style={buttonStyle2}>New Here? Get Started!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;
