import { useState } from 'react'

import { Modal } from 'react-bootstrap'

import { API } from '../helpers/config/api'


function SignUp({show, handleClose, handleShow, toggle}) {

    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
      email: '',
      fullName: '',
      password: '',
    });
  
    const {  email, fullName, password } = form
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify(form);
        
        const response = await API.post("/register", body, config);
        console.log(response);
  
        if (response.data.status === "Success") {
          setMessage("Email successfully registered");
        } else {
          setMessage(response.data.message);
        }
  
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div>
        <button
            onClick={handleShow}
            className='btn signup'
        >
            Sign Up
        </button>

        <Modal centered show={show} onHide={handleClose} dialogClassName='custom-modal'>
          <Modal.Body>
              <div className='mymodal'>
                  <h2 className='title-signin'>Sign Up</h2>

                  {message && (
                    <div className="alert alert-info py-1">
                      <small>{message}</small>
                    </div>
                  )}

                  <form className='form-signin' onSubmit={handleSubmit}>
                      <input 
                        type="email" 
                        name='email' 
                        value={email}
                        onChange={handleChange}
                        placeholder='Email' 
                        required 
                      />

                      <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={handleChange}
                        placeholder='Password' 
                        required 
                      />

                      <input 
                        type="text" 
                        name="fullName" 
                        value={fullName}
                        onChange={handleChange}
                        placeholder='Full Name' 
                        required 
                      />

                      <button type='submit' className='btn in-btn'>Sign Up</button>
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

export default SignUp