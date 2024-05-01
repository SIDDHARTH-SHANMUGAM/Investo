import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

function Holding() {

  const [ holdings, setHoldins] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.get('http://localhost:3001/stock/getHolding').then(res=>{
        if(res.data.message==='got')
        {
          setHoldins(res.data.holding);
        }
      })
    }
    fetchData();
  },[])



  return (
    <div className='holdings container'>
      {
            holdings && holdings.map((holding) => (
              <HoldingCard key={holding._id} holding={holding} />
            ))
      }
    </div>
  )
}

function HoldingCard ({holding}){
  const [stock, setStock] = useState('');
  const [boolean, setBoolean] = useState('');
  console.log(holding);
  useEffect( ()=>
  {
    async function fetchData()
    {
      const stockId = holding.stockId;
      await axios.post('http://localhost:3001/stock/getstock', {stockId}).then(res=>{
        if(res.data.message==='got')
        {
          setStock(res.data.stock);
        }
      })
    }
    fetchData();
  },[])


  var newDiv ;
  const change = () =>{
    setBoolean(!boolean);
  }
  if(boolean)
  {

    newDiv = <div className='newDivContainer'>
      <div className='btc'>
        <button className='b1' onClick={change}>X</button>

      </div>
      <div className='purchaseConatiner'>
      </div>
    </div>

  }

  return <div className='pad' >
    <div className='stockCard' onClick={change}>
      <div className='icon '>
        <img src={stock.icon} alt='stock'/>
      </div>
      <div className='details'>
        <p>{stock.stockId}.nse</p>
        <p>{stock.companyName}</p>
        <p>Quantity : {holding.quantity}</p>
        <p >&#8377;{stock.prize}</p>
      </div>
      <div className='purchase'>
        <p >puchase</p>
      </div>
    </div>
    {boolean&& newDiv}
  </div>
}

export default Holding
