import { useState, useEffect } from 'react'
import { API } from '../../helpers/config/api'

import AdminNav from '../../parts/AdminNav'

import triangle from '../../assets/tri.png'

import { Table, Dropdown } from 'react-bootstrap'

function Transaction() {
    const path = 'http://localhost:5000/uploads/'

    const [transactions, setTransactions] = useState([])

    // -------- Load Transaction --------
    const getTransactions = async () => {
        try {
            const response = await API.get('/subscribes')
            setTransactions(response.data.data.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    // -------- Approve Transaction --------
    const handleApprove = async (id) => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const body = JSON.stringify({ paymentStatus: 'Approved' })

            const response = await API.patch('transaction/' + id, body, config)

        } catch (error) {
            console.log(error)
        }
    }

    // -------- Cancel Transaction --------

    const handleCancel = async (id) => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const body = JSON.stringify({ paymentStatus: 'Cancel' })

            const response = await API.patch('transaction/' + id, body, config)

        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        <AdminNav/>

        <div className='px-5 trans-con'>
            <h2>Incoming Transaction</h2>
            <div>
                <Table>
                    <thead>
                        <tr className='head-trans-table'>
                            <th>No</th>
                            <th>Users</th>
                            <th>Bukti Transfer</th>
                            <th>Remaining Active</th>
                            <th>Status User</th>
                            <th>Status Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((data, idx) => (
                        <tr key={data.id + idx}  className='trans-table'>
                            <td>{idx + 1}</td>
                            <td>{data.user.fullName}</td>
                            <td>
                                <img src={ path + data.transferProof} width={'130px'} height={'100px'} alt="Bukti Bayar" />
                            </td>
                            <td>{data.remainingActive} / hari</td>

                            {data.userStatus === 'Active' ? (
                                <td className='status-user-active'>Active</td>
                            ) : null}
                            {data.userStatus === 'Not Active' ? (
                                <td className='status-user-not'>Not Active</td> 
                            ) : null}

                            {data.paymentStatus === 'Approved' ? (
                                <td className='status-success'>Approved</td>
                            ) : null}
                            {data.paymentStatus === 'Pending' ? (
                                <td className='status-pending'>Pending</td> 
                            ) : null}
                            {data.paymentStatus === 'Cancel' ? (
                                <td className='status-cancel'>Cancel</td>
                            ) : null}

                            <td> 
                                <Dropdown>
                                    <Dropdown.Toggle className='drop-trf'>
                                        <img src={triangle} alt="dropdown" className='ps-2'/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='menus' align={{ sm:'end'}} >
                                        <Dropdown.Item onClick={() => handleApprove(data.id)}
                                            className='fw-bold text' >
                                            Approved
                                        </Dropdown.Item>

                                        <Dropdown.Divider />

                                        <Dropdown.Item onClick={() => handleCancel(data.id)}
                                            className='fw-bold textt'>
                                            Cancel
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    </div>
  )
}

export default Transaction