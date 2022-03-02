import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <img 
            className='notImg'
            src="./images/404.svg" 
            alt="" 
        />
        <h1 className='notTitle'>Page Not Found!</h1>

        <div  className='notButtonDiv'>
            <Link to={'/'}>
                <button  className='notButton'>Back to Home</button>
            </Link>
        </div>
        
    </div>
  )
}

export default NotFound