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

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [emailData, setEmailData] = useState("");
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const [sendOtp, { otpData, otpLoading, otpError }] = useMutation(GENERATE_OTP);
  const [reSetPassword,{otpvalid,otpchecking,otpverifyError}]=useMutation(VALIDATE_OTP);
  const navigate = useNavigate();

  // State to manage OTP input fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [completeOtp, setCompleteOtp] = useState("");
  const [displayOtp, setDisplayOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayPasswordFields, setDisplayPasswordFields] = useState(false);

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
    })

    setCompleteOtp(password)
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
    });
    setDisplayOtp(true);
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
          variables:{
            reSetPasswordInput:{
              email: emailData,
              password: password,
              otp: completeOtp,
            }
          }
        })


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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40.5em",
          width: "380px",
          margin: "0 auto",
          padding: "10px 40px 0px 40px",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
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
            maxWidth: "29%",
            height: "20em",
            marginLeft: "0em",
            position: "absolute",
            top: "-5em",
          }}
          src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg"
        ></img>
        <h5 style={{ position: "absolute", top: "6em" }}>Signup!!</h5>

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
                position: "absolute",
                top: "15em",
                left: "2em",
                width: "80%",
              }}
            />
          </div>
        </Box>

        {!displayOtp && (
          <button
            className="btn #673ab7 deep-purple"
            type="button"
            onClick={handleSubmit}
            style={{ position: "absolute", left: "11em", top: "22em" }}
          >
            Submit
          </button>
        )}

        {displayOtp && !displayPasswordFields && (
          <button
            className="btn #673ab7 deep-purple"
            type="button"
            onClick={handleActivateAccount}
            style={{ position: "absolute", left: "7em", top: "31em" }}
          >
            Activate Account
          </button>
        )}

        {displayOtp && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "medium",
                position: "absolute",
                top: "18em",
                fontWeight: "regular",
              }}
            >
              OTP Verification
            </h3>
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
                    width: "2em",
                    height: "2em",
                    textAlign: "center",
                    marginRight: "0.5em",
                    fontSize: "1.2em",
                    border: "1px solid #ccc",
                    marginTop: "8em",
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
                position: "absolute",
                top: "28em",
                left: "2em",
                width: "80%",
              }}
            />
            <TextField
              type="password"
              label="Confirm Password"
              onChange={handleConfirmPasswordChange}
              required
              style={{
                position: "absolute",
                top: "33em",
                left: "2em",
                width: "80%",
                textDecoration: 'none !important'
              }}

                />
          </>
         ) }

        {displayPasswordFields && (
          <button
            className="btn #673ab7 deep-purple"
            type="button"
            onClick={handleActivateAccount}
            style={{ position:'absolute',top:'39em' }}
          >
            Confirm
          </button>
        )}
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { GENERATE_OTP, SIGNUP_USER } from "../gqloperations/mutations";
// import signup from "../Assets/signup.json";
// import Lottie from "lottie-react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [emailData, setEmailData] = useState("");
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
//   const [sendOtp, { otpData, otpLoading, otpError }] =
//     useMutation(GENERATE_OTP);

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     console.log("🚀 ~ file: Signup.js:28 ~ handleChange ~ e:", e.target.value);
//     setEmailData(e.target.value);
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle OTP input changes
//   const handleOtpChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);

//     // Automatically move to the next digit field
//     if (index < 5 && e.target.value !== "") {
//       document.getElementById(`otpInput-${index + 1}`).focus();
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     console.log(
//       "🚀 ~ file: Signup.js:45 ~ handleSubmit ~ e.target.value:",
//       emailData
//     );
//     e.preventDefault();
//     sendOtp({
//       variables: {
//         //   Need to put the Query variable as provided in the documentation
//         email: emailData,
//       },
//     });
//     // Show OTP input fields
//     setDisplayOtp(true);
//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//     // Call Api for Generate otp
//   };

//   // Handle redirection to another page
//   const handleRedirect = () => {
//     // Redirect to another page when the button is clicked
//   };

//   return (
//     <>
//       <div
//         className="leftcontainer"
//         style={{ width: "30em", marginLeft: "10em", marginTop: "5em" }}
//       >
//         <Lottie animationData={signup} />
//       </div>
//       <div
//         className="container my-container"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "40.5em",
//           width: "380px",
//           margin: "0 auto",
//           padding: "10px 40px 0px 40px",
//           backgroundColor: "#ffffff",
//           borderTopLeftRadius: "20px",
//           borderTopRightRadius: "20px",
//           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//           transition: "backgroundColor 0.3s ease, transform 0.3s ease",
//           position: "absolute",
//           bottom: "0px",
//           marginLeft: "55em",
//         }}
//       >
//         {(error || otpError) && (
//           <div
//             className="red card-panel"
//             style={{
//               position: "absolute",
//               top: "9em",
//               width: "26%",
//               height: "10%",
//               fontSize: "small",
//               borderRadius: "20px",
//             }}
//           >
//             {error.message}
//           </div>
//         )}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: "-5em" }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img
//           style={{
//             maxWidth: "29%",
//             height: "20em",
//             marginLeft: "0em",
//             position: "absolute",
//             top: "-5em",
//           }}
//           src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg"
//         ></img>
//         <h5 style={{ position: "absolute", top: "6em" }}>Signup!!</h5>

//         {/* Email ID field */}
//         <Box
//           component="form"
//           sx={{
//             "& .MuiTextField-root": { m: 1, width: "25ch" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <div>
//             <TextField
//               id="outlined-multiline-flexible"
//               label="email"
//               multiline
//               maxRows={4}
//               onChange={handleChange}
//               required
//               style={{
//                 position: "absolute",
//                 top: "15em",
//                 left: "2em",
//                 width: "80%",
//               }}
//             />
//           </div>
//         </Box>

//         {!displayOtp ? (
//           <button
//             className="btn #673ab7 deep-purple"
//             type="submit"
//             onClick={handleSubmit}
//             style={{ position: "absolute", left: "11em", top: "22em" }}
//           >
//             Submit
//           </button>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <h3
//               style={{
//                 fontSize: "x-large",
//                 position: "absolute",
//                 top: "12em",
//                 fontWeight: "bold",
//               }}
//             >
//               OTP Verification
//             </h3>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otpInput-${index}`}
//                   type="text"
//                   value={digit}
//                   maxLength="1"
//                   onChange={(e) => handleOtpChange(e, index)}
//                   style={{
//                     width: "2em",
//                     height: "2em",
//                     textAlign: "center",
//                     marginRight: "0.5em",
//                     fontSize: "1.2em",
//                     border: "1px solid #ccc",
//                     marginTop:'12em'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {displayOtp && (
//           <button
//             className="btn #673ab7 deep-purple"
//             type="button" // Set type as "button" to prevent form submission
//             onClick={handleRedirect}
//             style={{ marginTop: "1em" }}
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

