import React, { useState, useEffect } from 'react';
import '../../styles/temp.css';
import { db } from '../../config/firebase'; // Import the db object
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'; // Import collection, getDocs, deleteDoc, doc, and onSnapshot
import USClogo from '../../images/University_of_San_Carlos_logo.png';
import { Login } from '../login/login';
import { sendEmail } from '../email/verification';

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchQueryItems();
    subscribeToQueryItems();
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

  const subscribeToQueryItems = () => {
    const queryRef = collection(db, 'Query');
    onSnapshot(queryRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQueryItems(items);
    });
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!validate_field(borrowersName)) {
      validationErrors.borrowersName = "Borrower's name is required.";
    }

    if (!validate_field(borrowersEmail)) {
      validationErrors.borrowersEmail = "Borrower's email is required.";
    } else if (!validate_email(borrowersEmail)) {
      validationErrors.borrowersEmail = 'Invalid email format.';
    }

    if (!validate_field(dateBorrow)) {
      validationErrors.dateBorrow = 'Date of borrowing is required.';
    } else if (!validate_date(dateBorrow)) {
      validationErrors.dateBorrow = 'Invalid date format or not a future date.';
    }

    if (!validate_field(dateReturn)) {
      validationErrors.dateReturn = 'Date of returning is required.';
    } else if (!validate_date(dateReturn)) {
      validationErrors.dateReturn = 'Invalid date format or not a future date.';
    } else if (!validate_date_range(dateBorrow, dateReturn)) {
      validationErrors.dateReturn = 'Return date must be later than borrow date.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const deleteQueryItems = async () => {
        try {
          const queryRef = collection(db, 'Query');
          const querySnapshot = await getDocs(queryRef);

          if (!querySnapshot.empty) {
            const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            console.log('Query items deleted successfully!');
          } else {
            console.log('No query items found.');
          }
        } catch (error) {
          console.log('Error deleting query items:', error);
        }
      };

      // Delete all documents in the "Query" collection
      await deleteQueryItems();

      // Submit the request
      const requestRef = collection(db, 'Request');
      const docRef = await addDoc(requestRef, {
        borrowerName: borrowersName,
        borrowerType: borrowerType,
        borrowerEmail: borrowersEmail,
        dateBorrowed: dateBorrow,
        dateReturned: dateReturn,
        reasonBorrowed: reason,
        equipment: queryItems.map((item) => ({ equipmentId: item.equipmentId, quantity: item.quantity })),
        status: 'unverified',
      });

      const requestId = docRef.id; // Retrieve the generated request ID

      // Clear the form fields
      setBorrowersName('');
      setBorrowerType('student');
      setBorrowersEmail('');
      setReason('');
      setDateBorrow('');
      setDateReturn('');
      setSelectedEquipment(null);

      // Call the sendEmail function
      sendEmail(borrowersEmail, requestId);
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

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      const queryDocRef = doc(db, 'Query', equipmentId);
      await deleteDoc(queryDocRef);
      console.log('Equipment deleted successfully!');
    } catch (error) {
      console.log('Error deleting equipment:', error);
    }
  };

  const validate_email = (email) => {
    const expression = /^\w{8}@usc\.edu\.ph$/;
    return expression.test(email);
  };

  const validate_date = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    return date >= currentDate;
  };

  const validate_date_range = (start, end) => {
    return start < end;
  };

  const validate_field = (field) => {
    if (field == null) {
      return false;
    } else if (field.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const borrowerTypeOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Faculty', value: 'Faculty' },
    { label: 'Cisco', value: 'Cisco' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Alumni', value: 'Alumni' },
    { label: 'Others', value: 'Others' },
  ];

  return (
    <div className='reqBorrBG'>
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
                  {errors.borrowersName && <p>{errors.borrowersName}</p>}
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
                  {errors.borrowersEmail && <p>{errors.borrowersEmail}</p>}
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
                      {errors.dateBorrow && <p>{errors.dateBorrow}</p>}
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
                      {errors.dateReturn && <p>{errors.dateReturn}</p>}
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
    </div>
  );
};

export default RequestBorrower;
