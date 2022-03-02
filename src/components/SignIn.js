import { useState, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import { Modal, Button, Overlay, Tooltip } from 'react-bootstrap'


function SignIn() {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showTool, setShowTool] = useState(false);
  const target = useRef(null);

    const handleSubmit = (() => {
        navigate('/')
    })

  return (
    <div>
        <button
            onClick={handleShow}
            className='btn signin'
        >
            Sign In
        </button>

        <Button ref={target} onClick={() => setShowTool(!showTool)}>
            Click me!
        </Button>
        <Overlay target={target.current} show={showTool} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            My Tooltip
          </Tooltip>
        )}
      </Overlay>

        <Modal centered show={show} onHide={handleClose}>
            <Modal.Body >
                <div className='modal'>
                    <div className='mymodal'>
                        <h2 className='title-signin'>Sign In</h2>

                        <form className='form-signin' onSubmit={handleSubmit}>
                            <input type="email" name='email' placeholder='Email' required />
                            <input type="password" name="password" placeholder='Password' required />

                            <button type='submit' className='btn'>Sign In</button>
                        </form>

                        <p>Don't have an account ? Klik{' '}
                            <b onClick={handleClose} style={{cursor:'pointer'}} >Here</b>
                        </p>
                    </div>  
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default SignIn