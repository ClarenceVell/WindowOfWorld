import { useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { Modal } from 'react-bootstrap'

import { API, setAuthToken } from '../helpers/config/api'
import { UserContext } from '../helpers/context/userContext'


function SignIn({show, handleClose, handleShow, toggle}) {
    const navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);

      setMessage(response.data.message);
      setAuthToken(response.data.data.user.token);

      if (response.data.data.user.role === 0) {

        return [ dispatch(
          {
            type: "login",
            payload: response.data.data.user,
          }
        ), navigate('/')]

      } else {

        return [ dispatch(
          {
            type: "admin",
            payload: response.data.data.user,
          }
        ), navigate('/transaction')]

      }


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <button
            onClick={handleShow}
            className='btn signin'
        >
            Sign In
        </button>

        <Modal centered show={show} onHide={handleClose} dialogClassName='custom-modal' >
          <Modal.Body>
              <div className='mymodal'>
                  <h2 className='title-signin'>Sign In</h2>

                  {message && (
                    <div className="alert alert-danger py-1">
                      <small>{message}</small>
                    </div>
                  )}

                  <form className='form-signin' onSubmit={handleSubmit}>
                      <input 
                        type="email" 
                        name='email' 
                        placeholder='Email' 
                        onChange={handleChange}
                        required 
                      />

                      <input 
                        type="password" 
                        name="password" 
                        placeholder='Password' 
                        onChange={handleChange}
                        required 
                      />

                      <button type='submit' className='btn in-btn'>Sign In</button>
                  </form>

                  <p>Don't have an account ? Klik{' '}
                      <b onClick={toggle} style={{cursor:'pointer'}} >Here</b>
                  </p>
              </div>  
          </Modal.Body>
        </Modal>

    </div>
  )
}

export default SignIn