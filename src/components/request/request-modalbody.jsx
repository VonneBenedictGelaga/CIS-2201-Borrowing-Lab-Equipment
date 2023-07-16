import React from 'react'

const ModalBody = () => {
  return (
    <>
            <div className="row">
                <strong>Borrower ID:</strong>
                <p className="border bg-light">058725</p>
              </div>
              <div className="row">
                <strong>Borrower Name:</strong>
                <p className="border bg-light">John Doe</p>
              </div>
              <div className="row">
                <strong>Borrower Email:</strong>
                <p className="border bg-light">John_Doe@gmail.com</p>
              </div>
              <div className="row">
                <div className="col">
                  <strong>Borrow Date:</strong>
                  <p className="border bg-light">14/07/2023</p>
                </div>
                <div className="col">
                  <strong>Return Date:</strong>
                  <p className="border bg-light">15/07/2023</p>
                </div>
              </div>
              <div className="row">
                <strong>Purpose of Release: </strong>
                <p className="border bg-light">Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans?</p>
              </div>
              <div className="row">
                <strong>Equipment List:</strong>
                <div className="border bg-light">
                  <ul>
                    <li>Vaporeon</li>
                    <li>Lube</li>
                    <li>Dildo</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <strong>Status:</strong>
                <p className="border bg-light text-warning">Pending</p>
              </div>
    </>
  )
}

export default ModalBody;