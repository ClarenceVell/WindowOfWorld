import { useState } from 'react'

import { Modal } from 'react-bootstrap'

import SideProfile from '../parts/SideProfile'

import { API } from '../helpers/config/api'
import swal from 'sweetalert'

function Subscribe() {
    const [popup, setPopup] = useState(false)

    const popupOpen = () => setPopup(true)
    const popupClose = () => setPopup(false)

    const [form, setForm] = useState({
        transferProof: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {

            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("transferProof", form.transferProof[0], form.transferProof[0].name)

            const response = await API.post('/subscribe', formData, config)
            console.log(response)

            popupOpen()
            
        } catch (error) {
            swal({title: 'Please Submit Proof of Payment', text: 'Submit with image file', icon: 'warning'})
        }
    }

  return (
    <> 

    <Modal centered show={popup} onHide={popupClose}>
        <div className='subs-modal'>
            <p>Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you</p>
        </div>
    </Modal>

    <div className='left'>
        <SideProfile page='subscribe' />
        <div className='content'>
            <div className='premium'>
                <h1 >Premium</h1>
                <p>Pay now and access all the latest books from &nbsp; <img src="/images/wow.png" width={'35px'} alt="icon" /> </p>

                <p> <img src="/images/wow.png" alt="icon" width={'40px'} /> &nbsp; : 0981312323 </p>

                <form className='subs-form' onSubmit={handleSubmit}>
                    <input 
                        type="number"  
                        placeholder='Input your account number' 
                        required
                    />
                    <input type="file" name='transferProof' onChange={handleChange} id="file" hidden />
                    <label htmlFor="file" className='payment'>
                        Attache proof of transfer &nbsp;
                        <img src="/images/attache.svg" alt="icon" height={'20px'} />
                    </label>

                    <button className='btn subs' type='submit'>Send</button>
                </form>
            </div>
        </div>
    </div>
    </> 
  )
}

export default Subscribe