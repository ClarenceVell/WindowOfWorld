import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom' 

import addIcon from '../assets/add.png'
import nextIcon from '../assets/V.png'

import { API } from '../helpers/config/api'
import { UserContext } from '../helpers/context/userContext'

function DetailBook() {

  const navigate = useNavigate()
  const { id } = useParams()
  const [state] = useContext(UserContext)
  
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

  const [list, setList] = useState([])

  // -------- Load Book List --------
  const getList = async () => {
    try {
      const response = await API.get('/myList')
      setList(response.data.myList)
    } catch (error) {
      console.log(error)
    }
  }

  let buttonList = list.filter((item) => {
    return item.id == id
  })

  useEffect(() => {
    detailBook()
    getList()
  }, [])

  // -------- Handle Submit Add List --------
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const body = JSON.stringify({ idBook: id })

      const response = await API.post('/bookList', body, config)

      navigate(`/profile/${state.user.id}`)
      
    } catch (error) {
      console.log(error)
    }
  }

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

            {state.user.role === 0 ? 
                buttonList.length == 1 ? 
                    null
                    : <button onClick={handleSubmit} className='btn'>Add to My List &nbsp; <img src={addIcon} alt="icon" /> </button>
                :
                (
                  <>
                  <button className='btn'> Delete Book &nbsp; <img src={addIcon} alt="icon" /> </button>
                  <button className='btn'> Update Book &nbsp; <img src={addIcon} alt="icon" /> </button>
                  </>
                )
            }

        <button onClick={() => navigate(`/read/${id}`)} className='btn'>Read Book &nbsp; <img src={nextIcon} alt="icon" /></button>
      </div>
    </>
  )
}

export default DetailBook