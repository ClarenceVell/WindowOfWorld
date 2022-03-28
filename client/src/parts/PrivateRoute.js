import { useState, useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'


import { UserContext } from '../helpers/context/userContext'

function PrivateRoute() {

    const [state] = useContext(UserContext)
  return (
    state.login? <Outlet/> : <Navigate to = '/auth' />
  )
}

export default PrivateRoute