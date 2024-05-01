import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div className='profileContainer'>
      <div>
        <p>User ID: {user.userId}</p>
        <p>User Name: {user.name}</p>
        <p>User ID: {user.email}</p>
      </div>
      
    </div>
  )
}

export default Profile
