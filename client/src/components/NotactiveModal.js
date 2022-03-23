import React from 'react'

import { Modal } from 'react-bootstrap'

function NotactiveModal({popup, popupClose}) {
  return (
    <Modal centered show={popup} onHide={popupClose}>
        <div className='home-modal'>
            <p> Please make a payment to read the lastest book</p>
        </div>
    </Modal>
  )
}

export default NotactiveModal