import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Default from '../assets/transparant.png'

function UpdateProfile() {
    const [preview, setPreview] = useState('')

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: 'egi@gmail.com',
        gender: 'Male',
        phone: '081286238911',
        address: 'Perumahan Permata Bintaro Residence C-3',
        avatar:''
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = (async (e) => {
        e.preventDefault()
        navigate('/profile')
    })

  return (
    <div>
      <div className='read-con'>
        <img onClick={() => navigate('/')} src="/images/Icon.png" alt="Logo" width={'85px'} height={'75px'} />
      </div>

      <div className=' d-flex justify-content-center mt-5'>
        <form className='d-flex justify-content-between update-form' onSubmit={handleSubmit}>
            <div className='d-flex flex-column inp-div'>
            <h2>Update Profile</h2>
                <input 
                    type="email" 
                    name='email'
                    placeholder='Email'
                    value={form.email}
                    disabled
                />

                <input 
                    type="text" 
                    name='gender'
                    value={form.gender}
                    onChange={handleOnChange}
                    placeholder='Gender'
                />

                <input 
                    type="number" 
                    name='phone'
                    value={form.phone}
                    onChange={handleOnChange}
                    placeholder='Phone'
                />

                <input 
                    type="text" 
                    name='address'
                    value={form.address}
                    onChange={handleOnChange}
                    placeholder='Address'
                />

                <div>
                    <button className='btn edit-btn'>Update</button>
                </div>
            </div>

            <div className='d-flex flex-column'>
                <img 
                    className='edit-avatar'
                    src={preview? preview : Default}
                    alt="icon" 
                />
                <input 
                    type="file" 
                    name="avatar" 
                    onChange={handleOnChange}
                    id="file-inp" 
                    hidden
                />
                <label className='avatar-label' htmlFor="file-inp">Select Photo</label>
            </div>
        </form>
      </div>

    </div>
  )
}

export default UpdateProfile