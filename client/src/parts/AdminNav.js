import {useContext, useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../helpers/context/userContext'
import { API } from '../helpers/config/api'

import { Container, Navbar, Dropdown} from 'react-bootstrap'

import admin from '../assets/noname.png'
import logout from '../assets/logout.svg'
import add from '../assets/add.svg'

function AdminNav() {
  const navigate = useNavigate()
  const [state]= useContext(UserContext)

  const toHome = () => navigate('/admin')
  const toLogout = () => navigate('/logout')
  const toAdd = () => navigate('/add')

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
    <Navbar bg="light">
      <Container className='d-flex justify-content-between'>
        <div className='nav-adm'>
          <Navbar.Brand onClick={toHome}><img src="/images/Icon.png" alt="Logo" width={'80px'} height={'67px'} /></Navbar.Brand>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle className='dropdown'>
              <img className='drop-img' src={profile.phone ? profile.avatar : admin} alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu className='dropdown-menu' align={{ sm:'end'}} >
            <Dropdown.Item 
                className='fw-bold txt'
                onClick={() => navigate('/transaction')} >
                  <img src={add} alt="icon" height={'22px'} /> &nbsp; 
                  Transactions
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item 
                className='fw-bold txt'
                onClick={toAdd} >
                  <img src={add} alt="icon" height={'22px'} /> &nbsp; 
                  Add Book
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item 
                className='fw-bold txt'
                onClick={toLogout}>
                  <img src={logout} alt="icon" height={'22px'} /> &nbsp; 
                  Logout
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
  </Navbar>
  )
}

export default AdminNav