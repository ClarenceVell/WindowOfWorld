import {useState} from 'react'

import logo from '../assets/logo.png'

function Landing() { 

  return (
    <>

    <div className='landingBackground'>
        <div className='landing'>
          <div>
            <img src={logo} alt="Logo" />
            <p>Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
          </div>
        </div>

        <div className='landingg'>
          <button>Sign Up</button>
          <button>Sign In</button>
        </div>
    </div>
   
    </>
  )
}

export default Landing