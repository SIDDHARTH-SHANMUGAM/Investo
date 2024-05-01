import React, { useState } from 'react'
import './SignIn.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const navigate = useNavigate('');


  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      if(password===cpassword)
      {
        await axios.post("http://localhost:3001/user/register", {
          name, email, password
        })
        .then(res=>{
          if(res.data.message==='signedIn')
          {
            sessionStorage.setItem('token', JSON.stringify(res.data.token));
            navigate('/home');
          }
          else
          {
            alert(res.data.message);
          }
        })
      }
      else{
        alert('Password and Confirm Password should be same');
      }
      }
      catch(e){
        console.log(e);
      }
    }

  const gotoLogIn=()=>{
  navigate('/');
  }
  return (
    <div className='loginContainer'>
      <div className='inner'>
        <h2>Signin</h2>
        <div className='ipContainer'>
          <div>
            <label >Name</label>
            <input 
              type='text'
              value= {name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
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
          <div>
            <label >Confirm Password</label>
            <input 
              type='password'
              value={cpassword}
              onChange={(e)=>{ setCPassword(e.target.value)}}
              />
          </div>
        </div>
        <button type='submit' onClick={handleSubmit}> Get Started</button>
        <div className='stol'>
          <p>Have account already? </p>
          <p className='link' onClick={gotoLogIn}>Login</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
