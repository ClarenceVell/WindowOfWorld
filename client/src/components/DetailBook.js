import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom' 
import { Modal, Button } from 'react-bootstrap'

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
      // console.log(detail)
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
      console.log(response)
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

  // ---------- MODAL ----------
    const [show, setShow] = useState(false)

    const closeModal = () => setShow(false)
    const openModal = () => setShow(true)

  // ---------- Handle Delete Book ----------
  const deleteBook = async () => {
    try {
      const response = await API.delete(`/book/${id}`)
      navigate('/admin')
    } catch (error) {
      console.log(error)
    }
  }

  // ---------- Handle Delete List ----------
  const deleteList = async () => {
    try {
      const fact = await API.delete(`/myList/${id}`)
      getList()
    } catch (error) {
      console.log(error)
    }
  }

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

      getList()
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
    <Modal centered show={show} onHide={closeModal} dialogClassName='modal-detail' >
      <Modal.Body>
        <h4 className='text-center'>Are you sure to delete {detail.title} ?</h4> 
        <div className='d-flex justify-content-center mt-3'>
          <Button onClick={closeModal} className='btn btn-delete me-3'>No</Button>
          <Button onClick={deleteBook} className='btn btn-delete'>Yes</Button>
        </div>
      </Modal.Body>
    </Modal>

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
                <button onClick={deleteList} className='btn'>Delete from My List &nbsp; <img src={addIcon} alt="icon" /> </button>
                  : 
                <button onClick={handleSubmit} className='btn'>Add to My List &nbsp; <img src={addIcon} alt="icon" /> </button>
                :
                (
                  <>
                  <button className='btn' onClick={openModal}> Delete Book &nbsp; <img src={addIcon} alt="icon" /> </button>
                  <button className='btn' onClick={() => navigate(`/edit-book/${id}`)}> Update Book &nbsp; <img src={addIcon} alt="icon" /> </button>
                  </>
                )
            }

        <button onClick={() => navigate(`/read/${id}`)} className='btn'>Read Book &nbsp; <img src={nextIcon} alt="icon" /></button>
      </div>
    </>
  )
}

export default DetailBook