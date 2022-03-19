import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import AdminNav from '../../parts/AdminNav'
import { API } from '../../helpers/config/api'

function AdminHome() {

    const [book, setBook] = useState([])

    // -------- Load Book --------
    const getBook = async () => {
        try {
            const response = await API.get('/books')
            setBook(response.data.data.books)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBook()
    }, [])

  return (
    <div className='px-5'>
        <AdminNav/>

        <div className='px-5 mt-4'>
            <h2>Book List</h2>
            <div className='mt-3 books'>
                {book.map((item, idx) => (
                    <Link className='list-link' to={`/detail-admin/${item.id}`} key={idx + item.id}>
                        <img className='book-img' src={item.cover} alt="Book Cover" />
                        <h5 className='mt-3'>{item.title}</h5>
                        <p>{item.author}</p>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminHome