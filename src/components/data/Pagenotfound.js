import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import { Link } from 'react-router-dom'; // Import the Link component

export default function Pagenotfound() {
  return (
      <>
    <div  style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        marginTop: '50px'
      }}><h1>Oops! Page Not Found  <ErrorIcon style={{fontSize: '50px'}}></ErrorIcon></h1>
      <h4  style={{ }}>We apologize, but it seems you've landed on a page that doesn't exist.</h4>
      <h5><Link to="/login">Redirect to Login Page</Link></h5>
      </div>
      <div style={{marginTop: '80px', marginLeft : '580px'}}>©2023 goDeskless Inc. All rights reserved.</div>
      </>

  )
}
