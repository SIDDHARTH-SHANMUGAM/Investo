import React from 'react'
import Login from './SignIn/Login'
import { BrowserRouter,Route, Routes , Navigate} from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';

function Protected({children }){
  const user = JSON.parse(sessionStorage.getItem('token'));
  if(!user)
    return <Navigate to='/' replace />

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/home' element={ <Protected><Home/></Protected> } />
        <Route path="*" element={ <PageNotFound/> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
