import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import { Link } from 'react-router-dom'; // Import the Link component
import errorfinal from '../Assets/errorfinal.json';
import Lottie from 'lottie-react';

export default function Pagenotfound() {
  return (
      <>
      <div className="leftpart" style={{width:'20em',marginTop:'5em',marginLeft:'40em'}}>
        <Lottie animationData={errorfinal} />
        </div>
    <div  style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        marginTop: '-5em'
      }}><h1>Oops! Page Not Found  <ErrorIcon style={{fontSize: '50px'}}></ErrorIcon></h1>
      <h4  style={{ }}>We apologize, but it seems you've landed on a page that doesn't exist.</h4>
      <h5><Link to="/login">Redirect to Login Page</Link></h5>
      </div>
      <div style={{marginTop: '-5em', marginLeft : '580px'}}>©2023 goDeskless Inc. All rights reserved.</div>
      </>

  )
}

