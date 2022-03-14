import { useState, useEffect } from 'react'

import { API } from '../helpers/config/api'
import { Link } from 'react-router-dom'

function ListBook() {
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

  useEffect(() => {
      getBooks()
  }, [])


  return (
    <div className='listBook'>
        <h1>List Book</h1>

        <div className='list'>
            {book.map((body, index) =>{
                return(

                    <Link className='list-link' to={`/detail/${body.id}`} key={index + body.id}>
                        <img className='book-img' src={body.cover} alt="Book Cover" />
                        <h5 className='mt-3'>{body.title}</h5>
                        <p>{body.author}</p>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default ListBook