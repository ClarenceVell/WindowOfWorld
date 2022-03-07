import React from 'react'
import { Link } from 'react-router-dom'

import { list } from '../fakeData/listBook'

function ListBook() {
  return (
    <div className='listBook'>
        <h1>List Book</h1>

        <div className='list'>
            {list.map((body, index) =>{
                return(

                    <Link className='list-link' to={`/detail/${body.id}`} key={index + body.id}>
                        <img className='book-img' src={body.url} alt="Book Cover" />
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