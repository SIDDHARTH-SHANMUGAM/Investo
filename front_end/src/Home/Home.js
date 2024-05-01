import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Holding from '../Holding/Holding';
import History from '../History/History';

function Home() {
  const navigate = useNavigate('');
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

  const [stocks ,setStock] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.get('http://localhost:3001/stock/getAllStocks').then(res=>{
        if(res.data.message==='got')
        {
          setStock(res.data.stocks);
        }
      })
    }
    fetchData();
  },[])
  const [logOut, setLogout] = useState(false);
  const handleLogOut= () =>{
    setLogout(!logOut);

  }
  const makeLogout = ()=>{
    sessionStorage.removeItem('token');
    navigate('/');

  }
  var logoutmask
  if(logOut)
  {
    logoutmask = <div className='logoutContainer'>
        <p>Are you sure to Logout</p>
        <br/>
        <br/>
      <div className='cont'>
        <button onClick={makeLogout}> Yes </button>
        <button onClick={handleLogOut}> NO </button>
      </div>
    </div>
  }

  const openHoldings = () =>{
    setHoldingsBool(true);
    setStockBool(false);
    setProfileBool(false);
    setHistoryBool(false);
  }
  const openprofile = () =>{
    setHoldingsBool(false);
    setStockBool(false);
    setProfileBool(true);
    setHistoryBool(false);
  }
  const openStocks = () =>{
    setHoldingsBool(false);
    setStockBool(true);
    setProfileBool(false);
    setHistoryBool(false);
  }
  const openHistory = () =>{
    setHoldingsBool(false);
    setStockBool(false);
    setProfileBool(false);
    setHistoryBool(true);
  }

  const [stockBool, setStockBool] = useState(true);
  const [profileBool, setProfileBool] = useState(false);
  const [holdingsBool, setHoldingsBool] = useState(false);
  const [historyBool, setHistoryBool] = useState(false);

  return (
    <div className='homeContainer'>
      <div className='navbar'>
        <div className='pad'></div>
        <div className='pad'></div>
        <h1>Investo</h1>
        <div className='navLinks'>
            <p className={stockBool?'mention':''} onClick={openStocks}>Purchase Stocks</p>
            <p className={holdingsBool?'mention':''} onClick={openHoldings}>Sell Stocks</p>
            <p className={historyBool?'mention':''} onClick={openHistory}>History</p>
            <p className={profileBool?'mention':''} onClick={openprofile}>Profile</p>
            <p onClick={handleLogOut}>Logout</p>
        </div>
      </div>
      <div className='pad'></div>
      {stockBool&&
        <div className='displayStocks'>
          <h2>Stocks are in demand</h2>
          {
            stocks && stocks.map((stock) => (
              <StockCard key={stock._id} stock={stock} />
            ))
          }

        </div>
      }
      {profileBool&&
        <Profile/>
      }
      {historyBool&&
        <History/>
      }
      {holdingsBool&&
        <Holding/>
      }
      {logoutmask}
    </div>
  )
}

function StockCard ({stock})
{

  const [boolean, setBoolean] = useState(false);
  const [quantity, setQuantity] = useState();
  const [prize, setPrize] = useState();
  const change = () =>{
    setBoolean(!boolean);
  }
  const getPrize = ()=>{
      setPrize(Number.parseInt(quantity*stock.prize));
  }

  const handlePayment= () =>{
    const amount = Number.parseInt(prize)*100;
    const currency = 'INR';
    const receiptId = '1234567890';
    axios.post('http://localhost:3001/payment/pay', {amount, currency, receipt: receiptId})
    .then(res=>{
      const order = res.data.order;
      var options = {
      key: "rzp_test_REXMTQAYcLYeVZ",
      amount,
      currency,
      name: "Siddharth",
      description: "demo",
      image: "",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        axios.post( "http://localhost:3001/payment/validate",{body}).then(
          res=>{
            if(res.data.message==='success')
            {
              const stockId = stock.stockId;
              axios.put("http://localhost:3001/stock/purchaseStock", {stockId, quantity})
              .then((res)=>{
                console.log(res.data);
                window. location. reload()
              })
              .catch((er)=>{
                console.log(er);
              })
            }
          }
        )
      },
        prefill: {
          name: "Customers",
          email: "customer@gmail.com",
          contact: "123456790",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();


    })
    .catch(err=>{
      console.log(err)
    })
  }
  var newDiv ;
  if(boolean)
  {

    newDiv = <div className='newDivContainer'>
      <div className='btc'>
      </div>
      <div className='purchaseConatiner'>
        <div>
          <h1>{stock.companyName}</h1>
          <h2>Current Prize &#8377;{stock.prize}</h2>
        </div>
        <div className='linear'>
          <label>Quantity</label>
          <input type='number' 
          value={quantity} 
          onChange={(e)=>{setQuantity(e.target.value); setPrize('')}} />
          {quantity&&<button onClick={getPrize}>get Total Prize</button>}
        </div>
        {quantity&&prize&&
        <div>
          <br/>
          <label>Prize: &#8377;{prize}</label>
          <br/>
          <br/>
        </div>
        }
        <div>
          {prize&& <button className='pay' onClick={handlePayment}>Pay</button> }
        </div>
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
        <p >&#8377;{stock.prize}</p>
      </div>
      <div className='purchase'>
        <p >puchase</p>
      </div>
    </div>
    {boolean&& newDiv}
  </div>
}

export default Home
