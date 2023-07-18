import React, { useState, useEffect } from 'react';
import '../../styles/temp.css';
import { db } from '../../config/firebase'; // Import the db object
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Import collection, getDocs, deleteDoc, and doc
import USClogo from '../../images/University_of_San_Carlos_logo.png';
import { Login } from '../login/login';


const RequestBorrower = () => {
  const [borrowersName, setBorrowersName] = useState('');
  const [borrowerType, setBorrowerType] = useState('student');
  const [borrowersEmail, setBorrowersEmail] = useState('');
  const [reason, setReason] = useState('');
  const [dateBorrow, setDateBorrow] = useState('');
  const [dateReturn, setDateReturn] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showUpdateEquipment, setShowUpdateEquipment] = useState(false);
  const [queryItems, setQueryItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    fetchQueryItems();
  }, []);

  const fetchQueryItems = async () => {
    try {
      const queryRef = collection(db, 'Query');
      const querySnapshot = await getDocs(queryRef);

      if (!querySnapshot.empty) {
        const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setQueryItems(items);
      } else {
        console.log('No query items found.');
      }
    } catch (error) {
      console.log('Error retrieving query items:', error);
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (queryItems.length === 0) {
        console.log('No query items found. Cannot submit request.');
        return;
      }
  
      // Insert form data into the Request table in the database
      const requestRef = collection(db, 'Request');
      await addDoc(requestRef, {
        borrowerName: borrowersName,
        borrowerType: borrowerType,
        borrowerEmail: borrowersEmail,
        dateBorrowed: dateBorrow,
        dateReturned: dateReturn,
        reasonBorrowed: reason,
        equipment: queryItems.map((item) => ({ equipmentId: item.equipmentId, quantity: item.quantity })),
        status1: 'Pending',
        status2: 'Pending',
        status3: 'Pending',
      });
  
      // Clear the form fields
      setBorrowersName('');
      setBorrowerType('student');
      setBorrowersEmail('');
      setReason('');
      setDateBorrow('');
      setDateReturn('');
      setSelectedEquipment(null);
  
      // Delete all documents in the Query collection
      const queryRef = collection(db, 'Query');
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      console.log('Request submitted successfully. Query items deleted.');
  
      // Update the queryItems state to an empty array
      setQueryItems([]);
  
      // Show success alert or perform any other action
    } catch (error) {
      console.log('Error submitting request:', error);
    }
  };  

  const handleShowEquipment = (event) => {
    event.preventDefault();
    setShowUpdateEquipment(true);
  };  

  const handleExitUpdateEquipment = () => {
    setShowUpdateEquipment(false);
  };

// ...

const handleDeleteEquipment = async (equipmentId) => {
  try {
    // Delete the equipment item from the Query collection
    const queryDocRef = doc(db, 'Query', equipmentId);
    await deleteDoc(queryDocRef);
    console.log('Equipment deleted successfully!');

    // Update the queryItems state by removing the deleted item
    setQueryItems((prevItems) => prevItems.filter((item) => item.id !== equipmentId));
  } catch (error) {
    console.log('Error deleting equipment:', error);
  }
};

// ...

  const borrowerTypeOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Faculty', value: 'Faculty' },
    { label: 'Cisco', value: 'Cisco' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Alumni', value: 'Alumni' },
    { label: 'Others', value: 'Others' },
  ];

  return (
    <div className="container reqBorr">
      {showLogin && <Login onClose={handleLoginClose}/>}
      <div className="row">
        <div className="col-md-5">
          <div className="usc-logo">
            <img src={USClogo} alt="USC Logo" className="usc-logo" />
          </div>
          <div className="title">
            LAB EQUIPMENT BORROWING MODULE
            <div className="titlechild" onClick={handleLoginClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>USC staff? Sign in here.</div>
          </div>
        </div>
        <div className="col-md-7 mt-4">
          <div className="card bg-white mb-3 reqBor_container">
            <div className="card-header">Update Form</div>
            <div className="card-body">
              {/* Update form */}
              <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="edit2_borrower_type">Borrower Type</label>
                    <select
                      className="form-control mb-2"
                      name="edit2_borrower_type"
                      required
                      value={borrowerType}
                      onChange={(e) => setBorrowerType(e.target.value)}
                    >
                      {borrowerTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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

                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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

                {!selectedEquipment && (
                  <button className="btn btn-link mt-3" onClick={handleShowEquipment}>
                    Show Chosen Equipment
                  </button>
                )}

                <button className="btn btn-primary mt-3" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showUpdateEquipment && (
        <div className="overlay">
          <div className="expanded-card">
            <div className="card col-6 insertEquipment">
              <div className="card-header">
                <div className="row">
                  <div className="col-11">
                    <h5 className="card-title">UPDATE EQUIPMENT</h5>
                  </div>
                  <div className="col-1 text-right">
                    <button className="btn btn-close" onClick={handleExitUpdateEquipment}></button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Equipment ID</th>
                      <th>Equipment Name</th>
                      <th>Brand</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.equipmentId}</td>
                        <td>{item.equipName}</td>
                        <td>{item.brand}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteEquipment(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBorrower;