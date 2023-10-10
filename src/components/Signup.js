// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';



// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
//   const history = useHistory(); // Create a history object for navigation

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
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
//     e.preventDefault();

//     // Show OTP input fields
//     setDisplayOtp(true);

//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//   };

//   // Handle redirection to another page
//   const handleRedirect = () => {
//     // Redirect to another page when the button is clicked
//     history.push('/another-page'); // Replace '/another-page' with your desired URL
//   };

//   return (
//     <>
//       <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
//         <Lottie animationData={signup} />
//       </div>
//       <div className="container my-container" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '40.5em',
//         width: '380px',
//         margin: '0 auto',
//         padding: '10px 40px 0px 40px',
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//         transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
//         marginTop: '-33em',
//         marginLeft: '55em',
//       }}>
//         {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: '-5em' }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img style={{
//           maxWidth: '09%',
//           height: '20em',
//           marginLeft: '0em',
//           position: 'absolute',
//           top: '8em'
//         }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//         </img>
//         <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
//         <form onSubmit={handleSubmit}>
//           <Box
//             component="form"
//             sx={{
//               '& .MuiTextField-root': { m: 1, width: '25ch' },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div>
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Email ID"
//                 multiline
//                 maxRows={4}
//                 onChange={handleChange}
//                 required
//                 style={{ position: 'absolute', top: '27em', left: '59.5em' }}
//               />
//             </div>
//           </Box>
//           <button className="btn #673ab7 deep-purple" type="submit" style={{ position: 'absolute', top: '35em', left: '70em' }}>
//             Submit
//           </button>
//         </form>

//         {/* OTP input fields */}
//         {displayOtp && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1em" }}>
//             <h3>OTP Verification</h3>
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
//                   }}
//                 />
//               ))}
//             </div>
//             <button
//               className="btn #673ab7 deep-purple"
//               type="button" // Set type as "button" to prevent form submission
//               onClick={handleRedirect}
//               style={{ marginTop: "1em" }}
//             >
//               Redirect to Another Page
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { useHistory } from 'react-router-dom';


// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
//   const history = useHistory() // Create a history object for navigation

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
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
//     e.preventDefault();

//     // Show OTP input fields
//     setDisplayOtp(true);

//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//   };

//   // Handle redirection to another page
//   const handleRedirect = () => {
//     // Redirect to another page when the button is clicked
//     history.push('/another-page'); // Replace '/another-page' with your desired URL
//   };

//   return (
//     <>
//       <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
//         <Lottie animationData={signup} />
//       </div>
//       <div className="container my-container" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '40.5em',
//         width: '380px',
//         margin: '0 auto',
//         padding: '10px 40px 0px 40px',
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//         transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
//         marginTop: '-33em',
//         marginLeft: '55em',
//       }}>
//         {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: '-5em' }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img style={{
//           maxWidth: '09%',
//           height: '20em',
//           marginLeft: '0em',
//           position: 'absolute',
//           top: '8em'
//         }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//         </img>
//         <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
//         <form onSubmit={handleSubmit}>
//           <Box
//             component="form"
//             sx={{
//               '& .MuiTextField-root': { m: 1, width: '25ch' },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div>
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Email ID"
//                 multiline
//                 maxRows={4}
//                 onChange={handleChange}
//                 required
//                 style={{ position: 'absolute', top: '27em', left: '59.5em' }}
//               />
//             </div>
//           </Box>
//           <button className="btn #673ab7 deep-purple" type="submit" style={{ position: 'absolute', top: '35em', left: '70em' }}>
//             Submit
//           </button>
//         </form>

//         {/* OTP input fields */}
//         {displayOtp && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1em" }}>
//             <h3>OTP Verification</h3>
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
//                   }}
//                 />
//               ))}
//             </div>
//             <button
//               className="btn #673ab7 deep-purple"
//               type="button" // Set type as "button" to prevent form submission
//               onClick={handleRedirect}
//               style={{ marginTop: "1em" }}
//             >
//               Redirect to Another Page
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqloperations/mutations";
import signup from '../Assets/signup.json';
import Lottie from 'lottie-react'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  // State to manage OTP input fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [displayOtp, setDisplayOtp] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
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

    // Automatically move to the next digit field
    if (index < 5 && e.target.value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show OTP input fields
    setDisplayOtp(true);

    // Additional logic to send OTP or validate it
    // You can send the OTP to the user's email or phone here
  };

  // Handle redirection to another page
  const handleRedirect = () => {
    // Redirect to another page when the button is clicked
  };

  return (
    <>
      <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
        <Lottie animationData={signup} />
      </div>
      <div className="container my-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40.5em',
        width: '380px',
        margin: '0 auto',
        padding: '10px 40px 0px 40px',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
        marginTop: '-33em',
        marginLeft: '55em',
      }}>
        {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

        {data && data.user && (
          <div className="green card-panel" style={{ padding: '-5em' }}>
            {data.user.firstName} is Signed Up. You can login now!
          </div>
        )}
        <img style={{
          maxWidth: '09%',
          height: '20em',
          marginLeft: '0em',
          position: 'absolute',
          top: '8em'
        }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
        </img>
        <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
        
        {/* Email ID field */}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Email ID"
              multiline
              maxRows={4}
              onChange={handleChange}
              required
              style={{ position: 'absolute', top: '27em', left: '59.5em', }}
            />
          </div>
        </Box>
        
        {!displayOtp ? (
          <button className="btn #673ab7 deep-purple" type="submit" onClick={handleSubmit} style={{ position: 'absolute', top: '35em', left: '70em' }}>
            Submit
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{fontSize:'x-large',position:'absolute',top:'19em',fontWeight:'bold'}}>OTP Verification</h3>
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
                    marginTop:'18em'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {displayOtp && (
          <button
            className="btn #673ab7 deep-purple"
            type="button" // Set type as "button" to prevent form submission
            onClick={handleRedirect}
            style={{ marginTop: "1em" }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
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
//     e.preventDefault();

//     // Show OTP input fields
//     setDisplayOtp(true);

//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//   };

//   // Handle redirection to another page
//   const handleRedirect = () => {
//     // Redirect to another page when the button is clicked

//   };

//   return (
//     <>
//       <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
//         <Lottie animationData={signup} />
//       </div>
//       <div className="container my-container" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '40.5em',
//         width: '380px',
//         margin: '0 auto',
//         padding: '10px 40px 0px 40px',
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//         transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
//         marginTop: '-33em',
//         marginLeft: '55em',
//       }}>
//         {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: '-5em' }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img style={{
//           maxWidth: '09%',
//           height: '20em',
//           marginLeft: '0em',
//           position: 'absolute',
//           top: '8em'
//         }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//         </img>
//         <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
//         {!displayOtp ? (
//           <form onSubmit={handleSubmit}>
//             <Box
//               component="form"
//               sx={{
//                 '& .MuiTextField-root': { m: 1, width: '25ch' },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <div>
//                 <TextField
//                   id="outlined-multiline-flexible"
//                   label="Email ID"
//                   multiline
//                   maxRows={4}
//                   onChange={handleChange}
//                   required
//                   style={{ position: 'absolute', top: '27em', left: '59.5em' }}
//                 />
//               </div>
//             </Box>
//             <button className="btn #673ab7 deep-purple" type="submit" style={{ position: 'absolute', top: '35em', left: '70em' }}>
//               Submit
//             </button>
//           </form>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <h3>OTP Verification</h3>
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
//             Redirect to Another Page
//           </button>
//         )}
//       </div>
//     </>
//   );
// }


// import { useMutation } from "@apollo/client";
// import React, { useState } from "react";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   if (loading) return <h1>Loading</h1>;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOtpChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);

//     // Automatically move to the next digit field
//     if (index < 5 && e.target.value !== "") {
//       document.getElementById(`otpInput-${index + 1}`).focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Show OTP input fields
//     setDisplayOtp(true);

//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//   };

//   return (
//     <>
//       <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
//         <Lottie animationData={signup} />
//       </div>
//       <div className="container my-container" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '40.5em',
//         width: '380px',
//         margin: '0 auto',
//         padding: '10px 40px 0px 40px',
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//         transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
//         marginTop: '-33em',
//         marginLeft: '55em',
//       }}>
//         {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: '-5em' }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img style={{
//           maxWidth: '09%',
//           height: '20em',
//           marginLeft: '0em',
//           position: 'absolute',
//           top: '8em'
//         }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//         </img>
//         <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
//         <form onSubmit={handleSubmit}>
//           <Box
//             component="form"
//             sx={{
//               '& .MuiTextField-root': { m: 1, width: '25ch' },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div>
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Email ID"
//                 multiline
//                 maxRows={4}
//                 onChange={handleChange}
//                 required
//                 style={{ position: 'absolute', top: '27em', left: '59.5em' }}
//               />
//             </div>
//           </Box>
//           <button className="btn #673ab7 deep-purple" type="submit" style={{ position: 'absolute', top: '35em', left: '70em' }}>
//             Submit
//           </button>
//         </form>

//         {/* OTP input fields */}
//         {displayOtp && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1em" }}>
//             <h3 style={{fontSize:'x-large',fontWeight:'bold', position:'absolute',top:'22.5em',left:'38.5em'}}>OTP Verification</h3>
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
//                     marginTop:'23em'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useMutation } from "@apollo/client";
// import React, { useState } from "react";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

//   // State to manage OTP input fields
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [displayOtp, setDisplayOtp] = useState(false);

//   if (loading) return <h1>Loading</h1>;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOtpChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Show OTP input fields
//     setDisplayOtp(true);

//     // Additional logic to send OTP or validate it
//     // You can send the OTP to the user's email or phone here
//   };

//   return (
//     <>
//       <div className="leftcontainer" style={{ width: '30em', marginLeft: '10em', marginTop: '5em' }}>
//         <Lottie animationData={signup} />
//       </div>
//       <div className="container my-container" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '40.5em',
//         width: '380px',
//         margin: '0 auto',
//         padding: '10px 40px 0px 40px',
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//         transition: 'backgroundColor 0.3s ease, transform 0.3s ease',
//         marginTop: '-33em',
//         marginLeft: '55em',
//       }}>
//         {error && <div className="red card-panel" style={{ position: 'absolute', top: '9em', width: '26%', height: '10%', fontSize: 'small', borderRadius: '20px' }}>{error.message}</div>}

//         {data && data.user && (
//           <div className="green card-panel" style={{ padding: '-5em' }}>
//             {data.user.firstName} is Signed Up. You can login now!
//           </div>
//         )}
//         <img style={{
//           maxWidth: '09%',
//           height: '20em',
//           marginLeft: '0em',
//           position: 'absolute',
//           top: '8em'
//         }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//         </img>
//         <h5 style={{ position: 'absolute', top: '14em' }}>Signup!!</h5>
//         <form onSubmit={handleSubmit}>
//           <Box
//             component="form"
//             sx={{
//               '& .MuiTextField-root': { m: 1, width: '25ch' },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div>
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Email ID"
//                 multiline
//                 maxRows={4}
//                 onChange={handleChange}
//                 required
//                 style={{ position: 'absolute', top: '27em', left: '59.5em' }}
//               />
//             </div>
//           </Box>
//           <button className="btn #673ab7 deep-purple" type="submit" style={{ position: 'absolute', top: '35em', left: '70em' }}>
//             Submit
//           </button>
//         </form>

//         {/* OTP input fields */}
//         {displayOtp && (
//           <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={digit}
//                 maxLength="1"
//                 onChange={(e) => handleOtpChange(e, index)}
//                 style={{
//                   width: "2em",
//                   height: "2em",
//                   textAlign: "center",
//                   marginRight: "0.7em",
//                   marginTop:'24em',
//                   fontSize: "1.2em",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useMutation } from "@apollo/client";
// import React, { useState } from "react";
// import { SIGNUP_USER } from "../gqloperations/mutations";
// import signup from '../Assets/signup.json';
// import Lottie from 'lottie-react'; 
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function Signup() {
//   const [formData, setFormData] = useState({});
//   const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

//   if (loading) return <h1>Loading</h1>;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signupUser({
//       variables: {
//         userNew: formData,
//       },
//     });
//   };
//   return (
//     <>
//     <div className="leftcontainer" style={{width:'30em',marginLeft:'10em',marginTop:'5em'}}>
//       <Lottie animationData={signup} />
//       </div>
//     <div className="container my-container" style={{
//       display: 'flex',
//       flexDirection:'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '40.5em',
//       // flexDirection: 'column',
//       // padding: '50px',
//       // backgroundColor:'black',
//       // marginTop:'45px',
//       // borderRadius:'20px',
//       width: '380px', /* Adjust the width as needed */
//       margin: '0 auto', /* Center the container horizontally */
//       padding: '10px 40px 0px 40px',
//       backgroundColor: '#ffffff', /* Background color */
//       borderTopLeftRadius: '20px',   // Adjust the value as needed
//       borderTopRightRadius: '20px',
//       // borderRadius: '30px', /* Rounded corners */
//       boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', /* Box shadow for a subtle elevation effect */
//       transition: 'backgroundColor 0.3s ease, transform 0.3s ease', /* Add transitions */
//       marginTop:'-33em',
//       marginLeft:'55em',
//     }}>
//       {error && <div className="red card-panel" style={{position:'absolute',top:'9em',width:'26%',height:'10%',fontSize:'small',borderRadius:'20px'}}>{error.message}</div>}

//       {data && data.user && (
//         <div className="green card-panel" style={{padding:'-5em'}}>
//           {data.user.firstName} is Signed Up. You can login now!
//         </div>
//       )}
//       <img style={{
//     maxWidth: '09%',
//     height: '20em',
//     marginLeft: '0em',
//     position:'absolute',
//     top:'8em'
//   }} src="https://godeskless.com/wp-content/uploads/2023/05/icon-q2.svg">
//       </img>
//       <h5 style={{position:'absolute',top:'14em'}}>Signup!!</h5>
//       <form onSubmit={handleSubmit}>
//       <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Email ID"
//           multiline
//           maxRows={4}
//           onChange={handleChange}
//           required
//           style={{position:'absolute',top:'27em',left:'59.5em'}}
//         />
//       </div>
//       </Box>
//         <button className="btn #673ab7 deep-purple" type="submit" style={{position:'absolute',top:'35em',left:'70em'}}>
//           Submit
//         </button>
//       </form>
//     </div>
//     </>
//   );
// }