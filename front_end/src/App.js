import React from 'react'
import Login from './SignIn/Login'
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import Holding from './Holding/Holding';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/holding' element={ <Holding/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path="*" element={ <PageNotFound/> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
