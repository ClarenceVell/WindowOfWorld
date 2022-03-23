import { useEffect, useState, useContext } from 'react'

import { API } from '../helpers/config/api'
import { UserContext } from '../helpers/context/userContext'
import { useNavigate } from 'react-router-dom'
import ShowMoreText from "react-show-more-text";

import NotactiveModal from './NotactiveModal'


function MyList() {
  const navigate = useNavigate()

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

  const [ state ] = useContext(UserContext)
  const [transaction, setTrans] = useState([])
  // -------- Get Profile --------
  const getProfile = async () => {
    try {
        const response = await API.get(`/user/${state.user.id}`)
        setTrans(response.data.data.user.transaction)

    } catch (error) {
        console.log(error)
    }
}

let status = transaction.filter((item)=> {
    return item.userStatus == "Active"
})

  const [popup, setPopup] = useState(false)

  const popupOpen = () => setPopup(true)
  const popupClose = () => setPopup(false)

  useEffect(() => {
    getList()
    getProfile()
  }, [])

  return (
    <>
    <NotactiveModal popup={popup} popupClose={popupClose}/>

    <div className='listBook'>
        <h1>My List Book</h1>

        <div className='list'>
            {list.map((body, index) =>{
                return(
                    <>
                    <div key={index} className='list-link' onClick={status.length == 0? popupOpen: () => navigate(`/detail/${body.id}`)}>
                        <img className='book-img' src={body.cover} alt="Book Cover" />
                        <ShowMoreText
                          lines={1}
                          more=""
                          className='mt-3 fs-5'
                          width={250}
                          truncatedEndingComponent={"... "}
                        >
                          <h5>{body.title}</h5>
                        </ShowMoreText>
                        <p>{body.author}</p>
                    </div>
                    </>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default MyList