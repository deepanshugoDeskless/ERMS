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
    padding: "0px 0px", // Adjust padding as needed
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    // backgroundImage:
    // "url('https://godeskless.com/wp-content/uploads/2023/04/go-deskless-logo.svg')",
    backgroundRepeat: "no-repeat",
    maxWidth: "40vw",
  };

  const imageStyle = {
    maxWidth: "50%",
    height: "auto",
  };

  const textContainerStyle = {
    flex: 1,
    padding: "0 20px", // Adjust padding as needed,
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
    backgroundColor: "transparent", // Transparent background
    border: "2px solid #eb0c70", // Pink outline
    padding: "10px 20px", // Adjust padding as needed
    color: "#ffffff", // White text color
    transition: "background-color 0.3s ease", // Add a smooth transition effect
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff69b4", // Pink background when hovered
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          style={{
            maxWidth: "80%",
            height: "20em",
            marginLeft: "45px",
            marginTop: "50px",
          }}
          src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg"
        ></img>
        <h2
          className="font-link3"
          style={{ position: "absolute", left: "0em", top: "09em" }}
        >
          {" "}
          Godeskless
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
          Welcome to GoDeskless Employee Reimbursement Portal
        </h1>
        <h3 className="font-link2">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 40,
              strings: [
                "Empowering employees with seamless reimbursement at GoDeskless.",
                "Log in, get reimbursed. GoDeskless keeps it simple!",
                "New hire? Signup, Activate, Reimburse, and thrive with GoDeskless!",
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
