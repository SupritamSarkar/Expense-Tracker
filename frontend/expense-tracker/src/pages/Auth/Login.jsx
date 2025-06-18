import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import {validateEmail} from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const Login = () => {

    //State variables for form fields
    //and error handling

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {updateUser} = React.useContext(UserContext)    // Access the updateUser function from UserContext

    //Handle Login form submit
    const handleLogin = async (e) => {
      e.preventDefault()           // Prevent default form submission behavior
      if(!email || !password){                // Check if all fields are filled
        setError('Please fill all fields')
        return
      }
      if(!validateEmail(email)){          // Validate email format
        setError('Please enter a valid email')
        return
      }
      setError('') // Reset error message

      //Make API call to login user
      try{
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {    // API call to login user
          email,
          password
        })
        const {token,user} = response.data      // Destructure token and user from response data

        if(token){
          localStorage.setItem('token', token) // Store token in localStorage
          updateUser(user) // Update user context
          localStorage.setItem('user', JSON.stringify(user)) // Store user info in localStorage
          navigate('/dashboard');
        }
      }
      catch(err){
        console.error('Login error:', err)
        if(err.response && err.response.data && err.response.data.message){
          setError(err.response.data.message) // Set error message from server response
        } else {
          setError('An error occurred during login. Please try again.')
        }
      }

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
            Log in
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
