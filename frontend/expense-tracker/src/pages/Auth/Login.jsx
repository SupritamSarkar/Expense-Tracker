import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import {validateEmail} from '../../utils/helper'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    //Handle Login form submit
    const handleLogin = (e) => {
      e.preventDefault()
      if(!email || !password){
        setError('Please fill all fields')
        return
      }
      if(!validateEmail(email)){
        setError('Please enter a valid email')
        return
      }
      //Make API call to login user
      //If success, redirect to dashboard
      //If error, set error message
      console.log('Login successful')
      navigate('/dashboard')
    }


  return (
    <div >
      <div className='flex flex-col items-center justify-center h-full gap-4  '>
        <h3 className='text-4xl font-extrabold text-gray-800 dark:text-black pt-20'>
        Log in
        </h3>

        <p className='text-gray-800 font-semibold text-lg pb-6'>
            Please enter your details to log in
        </p>

        <form className='flex flex-col gap-6 w-full max-w-sm' onSubmit={handleLogin}>

          <Input 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={setEmail} 
          />
          <Input 
            type='password' 
            placeholder='Password' 
            value={password} 
            onChange={setPassword} 
          />
          {error && <p className='text-red-600 text-sm'>{error}</p>}

          <button type='submit' className='bg-blue-600 text-white text-xl py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer mt-3'>
            Sign Up
          </button>

          <p className='text-gray-700 dark:text-gray-700 text-lg text-center'>
            Don't have an account?
            <Link to='/signup' className='text-blue-600 hover:underline ml-1 cursor-pointer'>
              Sign Up
            </Link>
          </p>
        </form>
        <p className='text-gray-500 dark:text-gray-400 text-sm'>
          By logging in, you agree to our 
          <Link to='/terms' className='text-blue-600 hover:underline ml-1 cursor-pointer'>
            Terms of Service
          </Link> and 
          <Link to='/privacy' className='text-blue-600 hover:underline ml-1 cursor-pointer'>
            Privacy Policy
          </Link>
        </p>
        </div>
    </div>
  )
}

export default Login
