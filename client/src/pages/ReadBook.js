import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { API } from '../helpers/config/api'

import { ReactReader, ReactReaderStyle } from "react-reader"

function ReadBook() {
  
  const { id } = useParams()
  const navigate = useNavigate()

  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi)
  }

  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: 'rgba(205, 205, 205, 0.7)'
    }
  }

  const [ detail, setDetail ] = useState({})

  // -------- Load Book --------
  const detailBook = async () => {
    try {
      const response = await API.get(`/book/${id}`)
      setDetail(response.data.data.detail)
      console.log(detail)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    detailBook()
  }, [])


  return (
    <div >
      <div className='read-con'>
        <img onClick={() => navigate('/')} src="/images/Icon.png" alt="Logo" width={'85px'} height={'75px'} />
      </div>

      <div style={{ height: '100vh', position:'relative'}}>
        <ReactReader
          styles={ownStyles}
          title={detail.title}
          location={location}
          locationChanged={locationChanged}
          url={detail?.bookFile}
        />
      </div>
    </div>
  )
}

export default ReadBook