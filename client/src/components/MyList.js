import { useEffect, useState } from 'react'
import { API } from '../helpers/config/api'

import { Link } from 'react-router-dom'
// import { Mylist } from '../fakeData/listBook'

function MyList() {
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

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className='listBook'>
        <h1>My List Book</h1>

        <div className='list'>
            {list.map((body, index) =>(
                <Link className='list-link' to={`/detail/${body.id}`} key={index + body.id} >
                    <img className='book-img' src={body.cover} alt="Book Cover" />
                    <h5 className='mt-3'>{body.title}</h5>
                    <p>{body.author}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default MyList