import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { API } from '../helpers/config/api'

import Default from '../assets/transparant.png'

function UpdateProfile() {
    const [preview, setPreview] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    const [form, setForm] = useState({
        email: '',
        gender: '',
        phone: '',
        address: '',
        avatar:''
    })

    // -------- Get Profile --------
    const getProfile = async () => {
        try {
            const response = await API.get(`/user/${id}`)
            setPreview(response.data.data.user.avatar)

            setForm({
                email: response.data.data.user.email,
                gender: response.data.data.user.gender,
                phone: response.data.data.user.phone,
                address: response.data.data.user.address,
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

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

        const config = {
            headers: {
                "Content-type" : "multipart/form-data"
            }
        }

        const formData = new FormData()
        formData.set("email", form.email)
        formData.set("gender", form.gender)
        formData.set("phone", form.phone)
        formData.set("address", form.address)
        if (form.avatar) {
            formData.set("avatar", form?.avatar[0], form?.avatar[0]?.name);
        }

        const data = await API.patch(`/user/${id}`, formData, config)

        navigate(`/profile/${id}`)
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
                    type="text" 
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