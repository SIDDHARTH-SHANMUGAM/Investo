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
    <h1>Your Holdings</h1>
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
  const [quantity, setQuantity] = useState('');
  const [prize, setPrize] = useState('')
  const stockId = holding.stockId;
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


  var newDiv ;
  const change = () =>{
    setBoolean(!boolean);
  }
  const handleSelling = async() =>{
    if(quantity>holding.quantity)
    {
      alert('Insufficient stocks to sell');
    }
    else
    {
      await axios.put('http://localhost:3001/stock/sellStock', {stockId, quantity}).then((res)=>{
        if(res.data.message === 'sold')
        {
          alert(stockId +" has been sold with quantity of "+quantity);
          alert("Money Transaction is beeing in process. it would complete within 2 days");
          window. location. reload()
        }
      })

    }
  }

  const getPrize = ()=>{
      setPrize(quantity*stock.prize);
  }

  if(boolean)
  {

    newDiv = <div className='newDivContainer2'>
      <div className='btc'>
        <div className='purchaseConatiner'>
          <h1>{stock.stockId}</h1>
          <p>Company Name : {stock.companyName}</p>
        <div className='linear'>
          <label>Quantity</label>
          <input type='number' 
          value={quantity} 
          onChange={(e)=>{setQuantity(e.target.value); setPrize('')}} />
          {quantity&&<button onClick={getPrize}>getPrize</button>}
        </div>
        <div>
        {quantity&&prize&&
        <div>
          <label>Prize: &#8377;{prize}</label>
        </div>
        }
          <br/>
          {quantity&& <button className='pay' onClick={handleSelling}>Sell</button> }
        </div>
      </div>

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
        <p>Id : {stock.stockId}.nse</p>
        <p>Quantity : {holding.quantity}</p>
        <p >Current Prize : &#8377;{stock.prize}</p>
      </div>
      <div className='purchase'>
        <p >Sell</p>
      </div>
    </div>
    {boolean&& newDiv}
  </div>
}

export default Holding
