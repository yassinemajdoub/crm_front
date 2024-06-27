import React from 'react'
import Loginleft from './_componenets/login-left'
import Loginform from './_componenets/Loginform'

const Login = () => {

  return (
    <div className='grid grid-cols-3 h-[900px]'>
        <Loginleft />
        <Loginform />
      
    </div>

  )
}

export default Login