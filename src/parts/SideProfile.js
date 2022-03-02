import React from 'react'

import profile from '../assets/zaynn.jpg'

import { Link } from 'react-router-dom'

import user from '../assets/user.png'

function SideProfile() {
  return (
    <div className='profile-container'>
        <div>
            <img src="/images/Icon.png" alt="" />
        </div>
        <div className='circle'>
            <img src={profile} alt="" />
        </div>
        <p>Egi Ganteng</p>
        <p>Not Subscribed Yet </p>
        <hr />

        <div>
            <Link to={'/'}>
                <img src={user} alt="User Icon" />
                <span>Profile</span>
            </Link>
        </div>
    </div>
  )
}

export default SideProfile