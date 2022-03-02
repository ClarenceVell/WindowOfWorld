import React from 'react'
import { Link } from 'react-router-dom'

const list = [
    {
        url: '/images/book.png',
        title: 'Serangkai',
        author: 'Valerie Patkar'
    },
    {
        url: '/images/book2.png',
        title: 'Z1 - Sd/Mi Buku Siswa Tematik T...',
        author: 'Afi Yustiyanar'
    },
    {
        url: '/images/book3.png',
        title: 'Kabar Rahasia Dari Alam Kubu ...',
        author: 'DR. Kamil Yusuf Al-Atum'
    },
    {
        url: '/images/book4.png',
        title: 'Tess on the Road',
        author: 'Rachel Hartman'
    },
]

function ListBook() {
  return (
    <div className='listBook'>
        <h1>List Book</h1>

        <div className='list'>
            {list.map((body) =>{
                return(
                    
                    <Link className='list-link' to={'/'}>
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