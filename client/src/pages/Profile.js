import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../helpers/config/api'

import SideProfile from '../parts/SideProfile'

import noImage from '../assets/noImg.jpg'

import MyList from '../components/MyList'

function Profile() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [profile, setProfile] = useState({})

  // -------- Load Book --------
  const getProfile = async (req,res) => {
    try {
      const response = await API.get(`/user/${id}`)
      setProfile(response.data.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
    <div className='left'>
        <SideProfile page='profile' />
        <div className='content'>
            <h1>Profile</h1>
            <div className='profile-group'>
              <div className='info-user'>

                <div className='email-info'>
                  <img src="/images/Email.svg" alt="icon" />
                  <div>
                    <p>{profile.email}</p>
                    <p>Email</p>
                  </div>
                </div>

                <div className='gender-info'>
                  <img src="/images/Gender.svg" alt="icon" />
                  <div>
                    <p>{[profile.gender == null? '-' : profile.gender ]}</p>
                    <p>Gender</p>
                  </div>
                </div>

                <div className='phone-info'>
                  <img src="/images/phone.svg" alt="icon" />
                  <div>
                    <p>{[profile.phone == null? '-' : profile.phone ]}</p>
                    <p>Mobile phone</p>
                  </div>
                </div>

                <div className='address-info'>
                  <img src="/images/address.svg" alt="icon" />
                  <div>
                    <p>{[profile.address == null? '-' : profile.address ]}</p>
                    <p>Address</p>
                  </div>
                </div>

              </div>

              <div className='photo-div'>
                {profile.phone == null ? <img src={noImage} alt="profile" /> : <img src={profile.avatar} alt="profile" /> }
                {/* <img src={[profile.avatar === null ? noImage : profile.avatar]} alt="profile" /> */}
                <button onClick={() => navigate('/edit-profile')} className='btn'>Edit Profile</button>
              </div>
            </div>
            
          <MyList/>
        </div>
    </div>
  </>
  )
}

export default Profile