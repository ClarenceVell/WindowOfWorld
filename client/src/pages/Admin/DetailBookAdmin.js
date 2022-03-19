import React from 'react'

import AdminNav from '../../parts/AdminNav'
import DetailBook from '../../components/DetailBook'

function DetailBookAdmin() {

  return (
    <div>
        <AdminNav />
        <div className=' mx-5 px-5 content'>
            <DetailBook/>
        </div>
    </div>
  )
}

export default DetailBookAdmin