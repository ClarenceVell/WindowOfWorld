import React from 'react'

import { Link } from 'react-router-dom'
import { Mylist } from '../fakeData/listBook'

function MyList() {
  return (
    <div className='listBook'>
        <h1>My List Book</h1>

        <div className='list'>
            {Mylist.map((body, index) =>(
                <Link className='list-link' to={`/detail/${body.id}`} key={index + body.id} >
                    <img className='book-img' src={body.url} alt="Book Cover" />
                    <h3>{body.title}</h3>
                    <p>{body.author}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default MyList