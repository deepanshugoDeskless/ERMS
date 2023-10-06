import { useMutation } from '@apollo/client'
import { padding, spacing } from '@mui/system'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperations/mutations'

export default function Login() {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [SigninUser,{error,loading,data}]= useMutation(LOGIN_USER)

    if(loading) return <h1>Loading</h1>
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
        
        <div className="container my-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            flexDirection: 'column',
            padding: '50px'
            // background: 'rgb(253,24,126)',
            // background: 'radial-gradient(circle, rgba(253,24,126,1) 0%, rgba(46,43,100,1) 51%, rgba(255,255,255,1) 100%)'
          }}>
            {
                error &&
                <div className="red card-panel">{error.message}</div>
            }

            <h5>Enter  Login Details Below! </h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 placeholder="              Enter your EmailID"
                 name="email"
                 onChange={handleChange}
                 required
                 style={{
                    marginTop: '30px'
                }}
                 />
                <input
                 type="password"
                 placeholder="            Enter Your Password"
                 name="password"
                 onChange={handleChange}
                 required
                 style={{
                    marginTop: '30px'
                }}
                 />
                 <button className="btn #673ab7 deep-purple" type="submit" style={{
                     marginLeft: '100px',
                     marginTop: '30px'
                 }}>Login</button>
            </form>
        </div>
    )
}