import React, { useState } from 'react';
import '../styles/temp.css';
import { db } from '../config/firebase'; // Import the db object
import { collection, addDoc } from 'firebase/firestore'; // Import collection and addDoc

import USClogo from '../images/University_of_San_Carlos_logo.png';

const RequestBorrower = () => {
  const [borrowersName, setBorrowersName] = useState('');
  const [borrowersEmail, setBorrowersEmail] = useState('');
  const [reason, setReason] = useState('');
  const [dateBorrow, setDateBorrow] = useState('');
  const [dateReturn, setDateReturn] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [equipmentName, setEquipmentName] = useState('');
  const [description, setDescription] = useState('');
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (showEquipmentForm) {
        // Insert form data into the Request table in the database
        const requestRef = collection(db, 'Request');
        await addDoc(requestRef, {
          borrowerName: borrowersName,
          borrowerEmail: borrowersEmail,
          dateBorrowed: dateBorrow,
          dateReturned: dateReturn,
          reasonBorrowed: reason,
          equipment: {
            equipmentName,
            description,
          },
          status1: 'pending',
          status2: 'pending',
          status3: 'pending',
        });

        // Clear the form fields
        setBorrowersName('');
        setBorrowersEmail('');
        setReason('');
        setDateBorrow('');
        setDateReturn('');
        setEquipmentName('');
        setDescription('');

        // Show success alert
        setShowSuccessAlert(true);
      } else {
        // Show equipment form
        setShowEquipmentForm(true);
      }
    } catch (error) {
      console.log('Error submitting request:', error);
    }
  };

  return (
    <div className="container reqBorr">
      <div className="row">
        <div className="col-md-5">
          <div className="usc-logo">
            <img src={USClogo} alt="USC Logo" className="usc-logo" />
          </div>
          <div className="title">
            LAB EQUIPMENT BORROWING MODULE
            <div className="titlechild">USC staff? Sign in here.</div>
          </div>
        </div>
        <div className="col-md-7 mt-4">
          {showEquipmentForm ? (
            <div className="card bg-white mb-3 reqBor_container">
              <div className="card-header">Equipment Details</div>
              <div className="card-body">
                {/* Equipment form */}
                <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
                  <label htmlFor="edit2_equipment_name">Equipment Name</label>
                  <input
                    className="form-control mb-2"
                    name="edit2_equipment_name"
                    type="text"
                    placeholder="e.g. Microscope"
                    required
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                  />

                  <label htmlFor="edit2_description">Description</label>
                  <textarea
                    className="form-control mb-2"
                    name="edit2_description"
                    rows="2"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  <button className="btn btn-primary mt-3" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="card bg-white mb-3 reqBor_container">
              <div className="card-header">Update Form</div>
              <div className="card-body">
                {showSuccessAlert && (
                  <div className="alert alert-success" role="alert">
                    Form data saved successfully!
                  </div>
                )}
                {/* Update form */}
                <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
                  <label htmlFor="edit2_borrowers_name">Borrower's Name</label>
                  <input
                    className="form-control mb-2"
                    name="edit2_borrowers_name"
                    type="text"
                    placeholder="e.g. Ivanne Dave L. Bayer"
                    required
                    value={borrowersName}
                    onChange={(e) => setBorrowersName(e.target.value)}
                  />

                  <label htmlFor="edit2_borrowers_email">Borrower's Email</label>
                  <input
                    className="form-control mb-2"
                    name="edit2_borrowers_email"
                    type="email"
                    placeholder="e.g. 21300687@usc.edu.ph"
                    required
                    value={borrowersEmail}
                    onChange={(e) => setBorrowersEmail(e.target.value)}
                  />

                  <label htmlFor="edit2_reason">Reason for Borrowing</label>
                  <textarea
                    className="form-control mb-2"
                    name="edit2_reason"
                    rows="2"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>

                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor="edit2_date_borrow">Date of Borrowing Equipment</label>
                      <input
                        className="form-control mb-2"
                        name="edit2_date_borrow"
                        type="date"
                        required
                        value={dateBorrow}
                        onChange={(e) => setDateBorrow(e.target.value)}
                      />
                    </div>
                    <div className='col-md-6'>                
                      <label htmlFor="edit2_date_return">Date of Returning Equipment</label>
                      <input
                        className="form-control mb-2"
                        name="edit2_date_return"
                        type="date"
                        required
                        value={dateReturn}
                        onChange={(e) => setDateReturn(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary mt-3" type="submit">
                    Next
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestBorrower;
