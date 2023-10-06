import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { maxWidth } from '@mui/system';
import Typewriter from 'typewriter-effect';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link} from 'react-router-dom'





const ImageWithText = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'};

  const imageContainerStyle = {
    flex: 1,
    padding: '0 20px', // Adjust padding as needed
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    // backgroundImage: 
    // "url('https://godeskless.com/wp-content/uploads/2023/04/go-deskless-logo.svg')",
    backgroundRepeat: 'no-repeat',
    maxWidth:'40vw'
  };

  const imageStyle = {
    maxWidth: '50%',
    height: 'auto'
  };

  const textContainerStyle = {
    flex: 1,
    padding: '0 20px', // Adjust padding as needed,
    backgroundColor: '#2e2b81',
    color: '#ffff',
    height: '100vh',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '10px',
    marginLeft: '40px'
  };

  const textStyle = {
    fontSize: '16px',
  };

  const titleStyleheader = {
      fontSize: '25px',
      marginLeft: '44px',
      fontStyle: 'oblique',
      fontWeight: 'bold'
  };


  const buttonStyle = {
    backgroundColor: '#eb0c70',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft:'45px',
    marginTop:'180px'
  };

  const buttonStyle2 = {
    backgroundColor: '#eb0c70',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft:'580px',
    marginBottom: '40px'
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
      <img style={{
    maxWidth: '80%',
    height: 'auto',
    marginLeft: '50px'
  }} src="https://godeskless.com/wp-content/uploads/2023/04/go-deskless-logo.svg">
      </img>
      </div>
      <div style={textContainerStyle}>
        <h2 className='font-link'> Welcome to GoDeskless Employee Reimbursement Portal</h2>
        <h5 className='font-link2'>
            <Typewriter 
            options={{
                autoStart: true,
                loop: true,
                delay : 40,
                strings: ["Empowering employees with seamless reimbursement management at GoDeskless.","Log in, get reimbursed. GoDeskless keeps it simple!","New hire? Signup, Activate, Reimburse, and thrive with GoDeskless!"]
            }}/>
        </h5>
        <Link to="/login">
        <button style={buttonStyle}>Login</button>
      </Link>

      <Link to="/signup">
        <button style={buttonStyle2}>Signup</button>
      </Link>

      </div>
    </div>
  );
};

export default ImageWithText;
