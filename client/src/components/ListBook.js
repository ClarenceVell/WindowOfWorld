import { useState, useEffect, useContext } from 'react'

import { API } from '../helpers/config/api'
import { UserContext } from '../helpers/context/userContext'
import { useNavigate } from 'react-router-dom'

import { Modal } from 'react-bootstrap'

function ListBook() {

    const navigate = useNavigate()

    const [book, setBooks] = useState([])

  // -------- Load Book --------
  const getBooks = async () => {
      try {
          const response = await API.get('/books')
          setBooks(response.data.data.books)
      } catch (error) {
          console.log(error)
      }
  }

  const [ state ] = useContext(UserContext)
  const [transaction, setTrans] = useState([])

  // -------- Get Profile --------
  const getProfile = async () => {
      try {
          const response = await API.get(`/user/${state.user.id}`)
          setTrans(response.data.data.user.transaction)

      } catch (error) {
          console.log(error)
      }
  }

  let status = transaction.filter((item)=> {
      return item.userStatus == "Active"
  })

    const [popup, setPopup] = useState(false)

    const popupOpen = () => setPopup(true)
    const popupClose = () => setPopup(false)
    // const todetail= () => navigate(`/detail/${id}`)


  useEffect(() => {
      getBooks()
      getProfile()
  }, [])


  return (
    <>

    <Modal centered show={popup} onHide={popupClose}>
        <div className='home-modal'>
            <p> Please make a payment to read the lastest book</p>
        </div>
    </Modal>

    <div className='listBook'>
        <h1>List Book</h1>

        <div className='list'>
            {book.map((body, index) =>{
                return(
                    <>
                    <div className='list-link' onClick={status.length == 0? popupOpen: () => navigate(`/detail/${body.id}`)}>
                        <img className='book-img' src={body.cover} alt="Book Cover" />
                        <h5 className='mt-3'>{body.title}</h5>
                        <p>{body.author}</p>
                    </div>
                    </>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default ListBook