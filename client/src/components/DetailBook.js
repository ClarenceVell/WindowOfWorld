import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { addBook } from '../../../server/src/controllers/book' 

import addIcon from '../assets/add.png'
import nextIcon from '../assets/V.png'


import { API } from '../helpers/config/api'

function DetailBook() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [ detail, setDetail ] = useState({})

  // -------- Load Book --------
  const detailBook = async () => {
    try {
      const response = await API.get(`/book/${id}`)
      setDetail(response.data.data.detail)
      console.log(detail)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    detailBook()
  }, [])

  return (
    <>
      <div className='detail-book'>
        <div>
          <img src={detail.cover} alt="" />
        </div>
        <div>
          <h1>{detail.title}</h1>
          <p>{detail.author}</p>
          <p>Publication date</p>
          <p>{detail.publicationDate}</p>
          <p>Pages</p>
          <p>{detail.pages}</p>
          <p>ISBN</p>
          <p>{detail.isbn}</p>
        </div>
      </div>

      <div className='content-book'>
        <h2>About This Book</h2>
        {detail.about}
      </div>

      <div className='button-detail-group'>

        {/* { id != Mylist[id -1].id ? 
          <button onClick={() => navigate('/profile')} className='btn'>Add to My List &nbsp; <img src={addIcon} alt="icon" /> </button>
        : null} */}

        <button onClick={() => navigate('/profile')} className='btn'>Add to My List &nbsp; <img src={addIcon} alt="icon" /> </button>
        <button onClick={() => navigate(`/read/${id}`)} className='btn'>Read Book &nbsp; <img src={nextIcon} alt="icon" /></button>
      </div>
    </>
  )
}

export default DetailBook