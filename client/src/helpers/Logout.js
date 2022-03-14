import { useContext } from 'react'
import { UserContext } from './context/userContext'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    return [dispatch({
        type: 'logout'
    }), navigate('/auth')]
}

export default Logout