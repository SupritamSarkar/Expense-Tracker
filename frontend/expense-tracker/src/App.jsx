import React from 'react'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import UserProvider from './context/UserContext'
import {Toaster} from "react-hot-toast"



import {                             // Import necessary components from react-router-dom
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'


const App = () => {
  return (                    // Main App component
    <UserProvider>
    <div>
      <Router>
      <Routes>
        <Route path='/' element={<Root/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Home/>}></Route>
        <Route path='/income' element={<Income/>}></Route>
        <Route path='/expense' element={<Expense/>}></Route>
      </Routes>
      </Router>
    </div>

      <Toaster
        toastOptions = {{
          className: "",
          style: {
            fontSize:'13px'
          },
        }}
      />
      
    </UserProvider>
  )
}

export default App

const Root = () => {
  //check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem('token')
  return (
    <div>
      {isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />}
    </div>
  )


}