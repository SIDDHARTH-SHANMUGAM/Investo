import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './profile.css'

const accessToken = JSON.parse(sessionStorage.getItem('token'));
axios.interceptors.request.use(
    config =>{
        config.headers.authorization = `Bearer ${accessToken}`;
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
)

function Profile() {

  const [user ,setUser] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.get('http://localhost:3001/user/getUser').then(res=>{
        if(res.data.message==='got')
        {
          setUser(res.data.user);
        }
      })
    }
    fetchData();
  },[])
    

  return (
    <div>
      <h1>Profile</h1>
    <div className='profileContainer'>
      <div>
        <img src='/asserts/profile.png'></img>
      </div>
      <div>
        <p>User ID: {user.userId}</p>
        <p>User Name: {user.name}</p>
        <p>User ID: {user.email}</p>
        {/* this can be calculated using the holdings of each user*/}
        <p>Current Investment Rate: 78%</p>
        <p>Current Invested Amount: &#8377;100000</p>
      </div>
    </div>
      
    </div>
  )
}

export default Profile
