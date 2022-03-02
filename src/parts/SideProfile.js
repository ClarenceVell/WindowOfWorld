import React from 'react'

import profile from '../assets/zaynn.jpg'

import { Link } from 'react-router-dom'

import user from '../assets/user.png'
import userRed from '../assets/userRed.png'

import subcribe from '../assets/bill.png'
import subcribeRed from '../assets/billRed.png'

import logout from '../assets/logout.png'

function SideProfile({page}) {
  return (
    <div className='profile-container'>
        <Link to={'/'}>
            <img src="/images/Icon.png" alt="" />
        </Link>
        <div className='circle'>
            <img src={profile} alt="" />
        </div>
        <p>Egi Ganteng</p>
        <p>Not Subscribed Yet </p>
        <hr />

        <div className='sidebar'>
            <Link to={'/'} className='link-bar' >
                <img className='icon-bar' 
                    src={ page === 'profile'? userRed: user } 
                    alt="User Icon" 
                />
                <span className={ page === 'profile'? 'span-bar-red':'span-bar' }>Profile</span>
            </Link>

            <Link to={'/'} className='link-bar' >
                <img className='icon-bar' 
                    src={ page === 'subscribe'? subcribeRed : subcribe } 
                    alt="User Icon" 
                />
                <span className={ page === 'subscribe'? 'span-bar-red':'span-bar' }>Subscribe</span>
            </Link>
            <hr />

            <Link to={'/auth'} className='link-bar' >
                <img className='icon-bar' src={logout} alt="User Icon" />
                <span className='span-bar'>Logout</span>
            </Link>
        </div>
    </div>
  )
}

export default SideProfile