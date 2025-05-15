import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  console.log("this is a login in page");
  
  return (
    <div className='py-8'>
      <LoginComponent />
    </div>
  )
}

export default Login
