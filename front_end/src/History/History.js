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

function History() {

  const [ historys, setHistory] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.get('http://localhost:3001/stock/getHistory').then(res=>{
        if(res.data.message==='got')
        {
          setHistory(res.data.history);
        }
      })
    }
    fetchData();
  },[])



  return (
    <div className='holdings container'>
      <h1>History of Transactions</h1>
      {
            historys && historys.reverse().map((history) => (
              <HoldingCard key={history._id} history={history} />
            ))
      }
    </div>
  )
}

function HoldingCard ({history}){
  const [stock, setStock] = useState('');

    const createdDate = new Date(parseInt(history.createdAt));
    const fDate = createdDate.toLocaleString();
  const stockId = history.stockId;
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.post('http://localhost:3001/stock/getStock', {stockId}).then(res=>{
        if(res.data.message==='got')
        {
          setStock(res.data.stock);
        }
      })
    }
    fetchData();
  },[])

  return <div className='pad' >
    <div className='stockCard2'>
      <div className='icon '>
        <img src={stock.icon} alt='stock'/>
      </div>
      <div className='details'>
        <p>Id : {stock.stockId}.nse</p>
        <p>Quantity : {history.quantity}</p>
        <p>Transaction Status : {history.isPurchased?"Purchased":"Sold"}</p>
        <p>Transaction Done at : {fDate}</p>
        <p >Amount Transferred : &#8377;{Number.parseInt(history.prize*history.quantity)} {history.isPurchased?"Tranfered":"Received"}</p>
      </div>
    </div>
  </div>
}

export default History