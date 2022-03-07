import React from 'react'

import SideProfile from '../parts/SideProfile'
import ListBook from '../components/ListBook'

import banner from '../assets/banner.png'

function Home() {
  return (
    <div className='left'>
        <SideProfile />
        <div className='content'>
            <img src={banner} alt="" />
            <ListBook/>
        </div>
    </div>
  )
}

export default Home