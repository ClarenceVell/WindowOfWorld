import React from 'react'

import AdminNav from '../parts/AdminNav'
import { transaction } from '../fakeData/transaction'

import triangle from '../assets/tri.png'

import { Table, Dropdown } from 'react-bootstrap'

function Transaction() {
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
                        {transaction.map((data, idx) => (
                        <tr key={data.id + idx}  className='trans-table'>
                            <td>{idx + 1}</td>
                            <td>{data.Users}</td>
                            <td>{data.Bukti}</td>
                            <td>{data.Sisa}</td>

                            {data.StatusUser === 'Active' ? (
                                <td className='status-user-active'>Active</td>
                            ) : null}
                            {data.StatusUser === 'Not Active' ? (
                                <td className='status-user-not'>Not Active</td> 
                            ) : null}

                            {data.status === 'Approve' ? (
                                <td className='status-success'>Approve</td>
                            ) : null}
                            {data.status === 'Pending' ? (
                                <td className='status-pending'>Pending</td> 
                            ) : null}
                            {data.status === 'Cancel' ? (
                                <td className='status-cancel'>Cancel</td>
                            ) : null}

                            <td> 
                                <Dropdown>
                                    <Dropdown.Toggle className='drop-trf'>
                                        <img src={triangle} alt="dropdown" className='ps-4'/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='menus' align={{ sm:'end'}} >
                                        <Dropdown.Item 
                                            className='fw-bold text' >
                                            Approved
                                        </Dropdown.Item>

                                        <Dropdown.Divider />

                                        <Dropdown.Item 
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