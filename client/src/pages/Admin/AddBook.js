import { useState } from 'react'
import { API } from '../../helpers/config/api'

import { useNavigate } from 'react-router-dom'

import AdminNav from '../../parts/AdminNav'

function AddBook() {

    const navigate= useNavigate()

    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        title: '',
        publicationDate: '',
        pages: '',
        author: '',
        isbn: '',
        about: '',
        cover: '',
        bookFile: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.name === "cover") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
              "Content-type": "multipart/form-data"
            }
          }

          const formData = new FormData()
          formData.set('title', form.title)
          formData.set('publicationDate', form.publicationDate)
          formData.set('pages', form.pages)
          formData.set('author', form.author)
          formData.set('isbn', form.isbn)
          formData.set('about', form.about)
          formData.set('cover', form.cover[0], form.cover[0].name)
          formData.set('bookFile', form.bookFile[0], form.bookFile[0].name)

          const response = await API.post('/book', formData, config)
          console.log(response)

          navigate('/admin')

    }

  return (
    <div>
        <AdminNav/>
        <div className='add'>
            <h3>Add Book</h3>
            <form className='add-form' onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder='Title' onChange={handleChange} required />
                <input type="text" name="publicationDate" placeholder='Publication Date' onChange={handleChange} required/>
                <input type="number" name="pages" placeholder='Pages' onChange={handleChange} required/>
                <input type="text" name="author" placeholder='Author' onChange={handleChange} required />
                <input type="number" name="isbn" placeholder='ISBN' onChange={handleChange} required/>
                <textarea name="about"  cols="30" rows="10" placeholder='About This Book' onChange={handleChange}></textarea>

                {preview ? 
                    <img src={preview} alt="preview" className='preview-add' /> 
                    : null
                }

                <div className='file-div'>
                    <input type="file" name='cover' id="inputFile" onChange={handleChange} hidden />
                    <label htmlFor="inputFile" className=' me-3 book-file'>
                        Attache Cover &nbsp;
                        <img src="/images/attach.png" alt="icon" height={'20px'}/>
                    </label>

                    <input type="file" name='bookFile' id="bookInput" onChange={handleChange} hidden />
                    <label htmlFor="bookInput" className=' book-file' >
                        Attache Book File &nbsp;
                        <img src="/images/attach.png" alt="icon" height={'20px'}/>
                    </label>

                </div>

                <div className='button-add'>
                    <button className='btn add-button' type='submit'>
                        Add Book &nbsp;
                        <img src="/images/Add.png" alt="icon" />
                    </button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddBook