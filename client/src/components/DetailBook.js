import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import addIcon from '../assets/add.png'
import nextIcon from '../assets/V.png'

import { detail } from '../fakeData/detailBook'

function DetailBook() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { url, title, author, date, pages, isbn } = detail[id-1]
  return (
    <>
      <div className='detail-book'>
        <div>
          <img src={url} alt="" />
        </div>
        <div>
          <h1>{title}</h1>
          <p>{author}</p>
          <p>Publication date</p>
          <p>{date}</p>
          <p>Pages</p>
          <p>{pages}</p>
          <p>ISBN</p>
          <p>{isbn}</p>
        </div>
      </div>

      <div className='content-book'>
        <h2>About This Book</h2>
        <p>In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.</p>

        <p>Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.</p>

        <p>Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy.</p>
      </div>

      <div className='button-detail-group'>
        <button onClick={() => navigate('/profile')} className='btn'>Add to My List &nbsp; <img src={addIcon} alt="icon" /> </button>
        <button onClick={() => navigate('/read')} className='btn'>Read Book &nbsp; <img src={nextIcon} alt="icon" /></button>
      </div>
    </>
  )
}

export default DetailBook