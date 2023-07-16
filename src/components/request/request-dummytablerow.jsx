import React from 'react'

const RequestDummyRow = ({click}) => {
  return (
    <tr>
        <td>John Doe</td>
        <td>TV Remote</td>
        <td>14/07/2023</td>
        <td>15/07/2023</td>
        <td className='text-success'>Available</td>
        <td>
            <button type="button" className="btn btn-secondary" onClick={click}>
            Details
            </button>
        </td>
    </tr>
  )
}

export default RequestDummyRow;