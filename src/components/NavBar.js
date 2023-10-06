import React from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function NavBar() {
    const token =localStorage.getItem("token")
    const navigate = useNavigate()
  return (
    <nav>
        <div className="nav-wrapper " style={{backgroundColor: '#eb0c70'}}>
          <Link to="/" className="brand-logo left" >GoDeskless ERMS</Link>
          <ul id="nav-mobile" className="right">
              {
                  token ?
                  <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/create">Create</Link></li>
                  <li><button className='red btn' onClick={()=>{
                      localStorage.removeItem("token")
                      navigate('/')
                  }}>Logout</button></li>
                  </> :
                  
                  <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                  </>
              }
            
          </ul>
        </div>
      </nav>
  )
}
