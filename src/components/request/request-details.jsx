import React from 'react'

const RequestSidebar = () => {
  return (
    <div className='container-fluid'>
        <div className='row border'>REQUEST ID</div>
        <div className='row border'>BORROWER ID NUM</div>
        <div className='row border'>BORROWER FULL NAME</div>
        <div className='row border'>
            <div className='col-8 border'>
                IMAGE
            </div>
            <div className='col-4 border'>
                <p className='border'>BORROW DATE</p>
                <p className='border'>RETURN DATE</p>
            </div>
        </div>
    </div>
  )
}

export default RequestSidebar;