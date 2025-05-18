import React from 'react'
import logo from '../assests/images/logo.png'

function Logo({width="100px"}) {
  return (
    <div className='text-white'>
      <img src={logo} alt="megablog" className='w-12 rounded-full' />
    </div>
  )
}

export default Logo
