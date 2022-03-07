import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactReader, ReactReaderStyle } from "react-reader"

function ReadBook() {

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

  return (
    <div >
      <div className='read-con'>
        <img onClick={() => navigate('/')} src="/images/Icon.png" alt="Logo" width={'85px'} height={'75px'} />
      </div>

      <div style={{ height: '100vh', position:'relative'}}>
        <ReactReader
          styles={ownStyles}
          title='Alice In Wonderland'
          location={location}
          locationChanged={locationChanged}
          url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
        />
      </div>
    </div>
  )
}

export default ReadBook