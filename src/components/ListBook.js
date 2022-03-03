import React from 'react'
import { Link } from 'react-router-dom'

import { list } from '../fakeData/listBook'

function ListBook() {
  return (
    <div className='listBook'>
        <h1>List Book</h1>

        <div className='list'>
            {list.map((body) =>{
                return(

                    <Link className='list-link' to={`/detail/${body.id}`}>
                        <img className='book-img' src={body.url} alt="yyyy" />
                        <h3>{body.title}</h3>
                        <p>{body.author}</p>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default ListBook