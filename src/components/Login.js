import { useMutation } from '@apollo/client'
import { padding, spacing } from '@mui/system'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperations/mutations'
import React, { useEffect, useRef } from 'react';
import login from '../Assets/signinfinale.json';
import Lottie from 'lottie-react'; 
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import loginupdated from '../Assets/loginupdated.json'

export default function Login() {


    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [SigninUser,{error,loading,data}]= useMutation(LOGIN_USER)

    if(loading) return <div className="loading" style={{textAlign:'center',marginTop:'15em',}}><h1>Loading</h1> </div>
    if(data){
        localStorage.setItem("token",data.user.token)
        navigate('/home')
    }
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        SigninUser({
            variables:{
                userSignin:formData
            }
        })
    }

    var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};


    return (
        <>

        <div className="wholepage" style={{display:'flex',flexDirection:'column'}}>
        <div className="leftpart" style={{width:'30em',marginLeft:'10em'}}>
        <Lottie style={{position:'absolute',width:'35%',top:'09em'}} animationData={loginupdated} />
        </div>


        <div className="rightpart">
        <div className="container my-container" style={{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40.5em',
            // flexDirection: 'column',
            // padding: '50px',
            // backgroundColor:'black',
            // marginTop:'45px',
            // borderRadius:'20px',
            width: '380px', /* Adjust the width as needed */
            margin: '0 auto', /* Center the container horizontally */
            padding: '10px 40px 0px 40px',
            backgroundColor: '#ffffff', /* Background color */
            borderTopLeftRadius: '20px',   // Adjust the value as needed
            borderTopRightRadius: '20px',
            // borderRadius: '30px', /* Rounded corners */
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', /* Box shadow for a subtle elevation effect */
            transition: 'backgroundColor 0.3s ease, transform 0.3s ease', /* Add transitions */
            marginTop:'-28em',
            marginLeft:'55em',
            position: 'absolute',
            bottom: '0px',
          }}>
            {
                error &&
                <div className="red card-panel" style={{position:'absolute',top:'0em',height:'10%',fontSize:'medium',}}>{error.message}</div>
            }
            <img style={{
    maxWidth: '30%',
    height: '20em',
    marginLeft: '0em',
    marginTop:'-07em'
  }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
      </img>
             <h5 style={{marginTop:'-60px',marginLeft:'0px'}}> Reimburesment Portal </h5>
            <h5 style={{marginTop:'25px',marginBottom:'30px'}}>Login! </h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email" 
                 placeholder="                   Enter your EmailID"
                 name="email"
                 onChange={handleChange}
                 required
                 style={{
                    marginTop: '10px',
                    border:'2px solid grey',
                    borderRadius:'4px'
                }}
                 />
                <input
                 type="password"
                 placeholder="                  Enter Your Password"
                 name="password"
                 onChange={handleChange}
                 required
                 style={{
                    marginTop: '40px',
                    border:'2px solid grey',
                    borderRadius:'4px'
                }}
                 />
                 <button className="btn #673ab7 deep-purple" type="submit" style={{

                     marginLeft: '40px',
                     position: 'relative',
                     top: '50px',
                     left: '15px',
                     width:'200px'
                     
                 }}>Login</button>
            </form>
        </div>
        </div>
        </div>
        </>
    )
}
// import { useMutation } from "@apollo/client";
// import { padding, spacing } from "@mui/system";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { LOGIN_USER } from "../gqloperations/mutations";
// import React, { useEffect, useRef } from "react";
// import login from "../Assets/signinfinale.json";
// import Lottie from "lottie-react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [SigninUser, { error, loading, data }] = useMutation(LOGIN_USER);

//   if (loading)
//     return (
//       <div
//         className="loading"
//         style={{ textAlign: "center", marginTop: "15em" }}
//       >
//         <h1>Loading</h1>{" "}
//       </div>
//     );
//   if (data) {
//     localStorage.setItem("token", data.user.token);
//     navigate("/home");
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     SigninUser({
//       variables: {
//         userSignin: formData,
//       },
//     });
//   };

//   var bgColors = {
//     Default: "#81b71a",
//     Blue: "#00B1E1",
//     Cyan: "#37BC9B",
//     Green: "#8CC152",
//     Red: "#E9573F",
//     Yellow: "#F6BB42",
//   };

//   return (
//     <>
//       <div
//         className="wholepage"
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         <div
//           className="leftpart"
//           style={{ width: "30em", marginLeft: "10em", top: "20em" }}
//         >
//           <Lottie animationData={login} />
//         </div>

//         <div className="rightpart">
//           <div
//             className="container my-container"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "40.5em",
//               // flexDirection: 'column',
//               // padding: '50px',
//               // backgroundColor:'black',
//               // marginTop:'45px',
//               // borderRadius:'20px',
//               width: "380px" /* Adjust the width as needed */,
//               margin: "0 auto" /* Center the container horizontally */,
//               padding: "10px 40px 0px 40px",
//               backgroundColor: "#ffffff" /* Background color */,
//               borderTopLeftRadius: "20px", // Adjust the value as needed
//               borderTopRightRadius: "20px",
//               // borderRadius: '30px', /* Rounded corners */
//               boxShadow:
//                 "0px 0px 10px rgba(0, 0, 0, 0.2)" /* Box shadow for a subtle elevation effect */,
//               transition:
//                 "backgroundColor 0.3s ease, transform 0.3s ease" /* Add transitions */,
//               position: "absolute",
//               bottom: "0px",
//               marginLeft: "55em",
//             }}
//           >
//             {error && (
//               <div className="red card-panel" style={{ position:'absolute',top:'0em',width:'100%',height:'9%',fontSize:'small' }}>
//                 {error.message}
//               </div>
//             )}
//             <img
//               style={{
//                 maxWidth: "30%",
//                 height: "20em",
//                 position:'absolute',
//                 top:'-2em',
//               }}
//               src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg"
//             ></img>
//             <h5 style={{ marginTop: "-75px", marginLeft: "0px" }}>
//               {" "}
//               Reimburesment Portal{" "}
//             </h5>
//             <h5 style={{ marginTop: "15px", marginBottom: "30px" }}>Login! </h5>
//             <form onSubmit={handleSubmit}>
//               {/* Email ID field */}
//               {/* <Box
//                 component="form"
//                 sx={{
//                   "& .MuiTextField-root": { m: 1, width: "25ch" },
//                 }}
//                 noValidate
//                 autoComplete="off"
//               > */}
//                 {/* <div> */}
//                 <input
//                  type="email" 
//                  placeholder="                   Enter your EmailID"
//                  name="email"
//                  onChange={handleChange}
//                  required
//                  style={{
//                     marginTop: '10px'
//                 }}
//                  />
//                 <input
//                  type="password"
//                  placeholder="                  Enter Your Password"
//                  name="password"
//                  onChange={handleChange}
//                  required
//                  style={{
//                     marginTop: '40px'
//                 }}
            
//                  />
//                   {/* <TextField
//                     id="outlined-multiline-flexible"
//                     label="Email"
//                     multiline
//                     maxRows={4}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       position: "absolute",
//                       top: "19em",
//                       width: "79%",
//                       left: "2em",
//                     }}
//                   />
//                 </div>
//               </Box>
//               <Box
//                 component="form"
//                 sx={{
//                   "& .MuiTextField-root": { m: 1, width: "25ch" },
//                 }}
//                 noValidate
//                 autoComplete="off"
//               >
//                 <TextField
//                   id="outlined-password-input"
//                   label="Password"
//                   type="password"
//                   autoComplete="current-password"
//                   onChange={handleChange}
//                   style={{position:'absolute',top:'25em', width: "79%",left: "2em"}}
//                 />
//               </Box> */}
//               <button
//                 className="btn #673ab7 deep-purple"
//                 type="submit"
//                 style={{
//                   marginLeft: "40px",
//                   position: "relative",
//                   top: "12em",
//                   left: "-01em",
//                   width: "200px",
//                 }}
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

