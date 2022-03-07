import {useState} from 'react'

import logo from '../assets/logo.png'

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

function Landing() { 

  const [ showSignup, setShowSignup] = useState(false)
  const [ showSignin, setShowSignin] = useState(false)

  const handleShowSignup = () => setShowSignup(true)
  const handleShowSignin = () => setShowSignin(true)

  const handleCloseSignup = () => setShowSignup(false)
  const handleCloseSignin = () => setShowSignin(false)

  const toggleToSignin = (() => {
    setShowSignup(false)
    setShowSignin(true)
  })

  const toggleToSignup = (() => {
    setShowSignin(false)
    setShowSignup(true)
  })

  return (
    <>
    <div className='landingBackground'>
        <div className='landing'>
          <div>
            <img src={logo} alt="Logo" />
            <p className='mt-3'>Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
          </div>
        </div>

        <div className='landingg'>
          <SignUp show={showSignup} handleShow={handleShowSignup} handleClose={handleCloseSignup} toggle={toggleToSignin} />
          <SignIn show={showSignin} handleShow={handleShowSignin} handleClose={handleCloseSignin} toggle={toggleToSignup} />
        </div>
    </div>
   
    </>
  )
}

export default Landing