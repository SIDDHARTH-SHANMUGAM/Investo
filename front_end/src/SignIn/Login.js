import React, { useState } from 'react'
import './SignIn.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');


  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:3001/user/login", {
          email, password
        })
        .then(res=>{
          if(res.data.message==='Exist')
          {
            sessionStorage.setItem('token', JSON.stringify(res.data.token));
            navigate('/home');
          }
        })
      }
      catch(e){
        console.log(e);
      }
    }

  const gotoSignIn=()=>{
    navigate('/signin');
  }
  return (
    <div className='loginContainer'>
      <div className='inner'>
        <h2>Login</h2>
        <div className='ipContainer2'>
          <div>
            <label >Email</label>
            <input 
              type='email'
              value= {email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <label >Password</label>
            <input 
              type='password'
              value={password}
              onChange={(e)=>{ setPassword(e.target.value)}}
              />
          </div>
        </div>
        <button type='submit' onClick={handleSubmit}> Submit</button>
        <div className='stol'>
          <p>Don't have account? </p>
          <p className='link' onClick={gotoSignIn}>SignIn</p>
        </div>
      </div>
    </div>
  )
}

export default Login
