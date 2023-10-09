import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../gqloperations/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <h1>Loading</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };
  return (
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
      marginTop:'3.3em',
      marginLeft:'55em',
    }}>
      {error && <div className="red card-panel">{error.message}</div>}

      {data && data.user && (
        <div className="green card-panel">
          {data.user.firstName} is Signed Up. You can login now!
        </div>
      )}
      <h5>Signup!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="EmployeeID"
          name="employeeCode"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="confirm password"
          name="password"
          onChange={handleChange}
          required
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

