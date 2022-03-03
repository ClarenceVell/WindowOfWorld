import React from 'react'

import SideProfile from '../parts/SideProfile'

import photo from '../assets/photo.png'

import MyList from '../components/MyList'

function Profile() {
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
                    <p>egigans@gmail.com</p>
                    <p>Email</p>
                  </div>
                </div>

                <div className='gender-info'>
                  <img src="/images/Gender.svg" alt="icon" />
                  <div>
                    <p>Male</p>
                    <p>Gender</p>
                  </div>
                </div>

                <div className='phone-info'>
                  <img src="/images/phone.svg" alt="icon" />
                  <div>
                    <p>0812-8623-8911</p>
                    <p>Mobile phone</p>
                  </div>
                </div>

                <div className='address-info'>
                  <img src="/images/address.svg" alt="icon" />
                  <div>
                    <p>Perumahan Permata Bintaro Residence C-3</p>
                    <p>Address</p>
                  </div>
                </div>

              </div>

              <div>
                <img src={photo} alt="" />
                <button className='btn'>Edit Profile</button>
              </div>
            </div>
            
          <MyList/>
        </div>
    </div>
  </>
  )
}

export default Profile