import { useMutation } from '@apollo/client'
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
        navigate('/')
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
    return (
        <div className="container my-container">
            {
                error &&
                <div className="red card-panel">{error.message}</div>
            }

            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 placeholder="email"
                 name="email"
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
                 <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
    )
}