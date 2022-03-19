import { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { UserContext } from '../helpers/context/userContext'
import { API } from '../helpers/config/api'

import user from '../assets/user.png'
import userRed from '../assets/userRed.png'

import subcribe from '../assets/bill.png'
import subcribeRed from '../assets/billRed.png'

import logout from '../assets/logout.png'
import photo from '../assets/noname.png'

function SideProfile({page}) {

    const [ state ] = useContext(UserContext)
    const [profile, setProfile] = useState({})

    // -------- Get Profile --------
    const getProfile = async () => {
        try {
            const response = await API.get(`/user/${state.user.id}`)
            setProfile(response.data.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

  return (
    <div className='profile-container'>
        <Link to={'/'}>
            <img src="/images/Icon.png" alt="" />
        </Link>
        <div className='circle'>
            <img src={!profile.phone ? photo : profile.avatar} alt="profile" />
        </div>
        <p>{profile.fullName}</p>

        {page === 'detail' ? (
            <p className='green'>Subscribed</p>
        ) : (
            <p className='red'>Not Subscribed Yet</p>
        )}
        <hr />

        <div className='sidebar'>
            <Link to={`/profile/${state?.user?.id}`} className='link-bar' >
                <img className='icon-bar' 
                    src={ page === 'profile'? userRed: user } 
                    alt="User Icon" 
                />
                <span className={ page === 'profile'? 'span-bar-red':'span-bar' }>Profile</span>
            </Link>

            <Link to={'/subscribe'} className='link-bar' >
                <img className='icon-bar' 
                    src={ page === 'subscribe'? subcribeRed : subcribe } 
                    alt="User Icon" 
                />
                <span className={ page === 'subscribe'? 'span-bar-red':'span-bar' }>Subscribe</span>
            </Link>
            <hr />

            <Link to={'/logout'} className='link-bar' >
                <img className='icon-bar' src={logout} alt="User Icon" />
                <span className='span-bar'>Logout</span>
            </Link>
        </div>
    </div>
  )
}

export default SideProfile