import React, { useEffect, useState } from 'react';
import '../styles/layout.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const db = getFirestore();
        const requestRef = collection(db, 'Request');
        const requestSnapshot = await getDocs(requestRef);
        const requestList = requestSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRequestData(requestList);
      } catch (error) {
        console.log('Error retrieving request data:', error);
      }
    };

    fetchRequestData();
  }, []);

  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <div className="container displayAdmin">
      <table className="table table-bordered table-striped custom-table">
        <thead className="thead-dark">
          <tr>
            <th>Borrower Email</th>
            <th>Borrower Name</th>
            <th>Date Borrowed</th>
            <th>Date Returned</th>
            <th>Reason Borrowed</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((request, index) => (
            <tr key={index}>
              <td>{request.borrowerEmail}</td>
              <td>{request.borrowerName}</td>
              <td>{request.dateBorrowed}</td>
              <td>{request.dateReturned}</td>
              <td>{request.reasonBorrowed}</td>
              <td>{request.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewDetails(request)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEquipment && (
        <div className="overlay">
          <div className="expanded-card">
            <div className="card col-4 insertEquipment">
              <div className="card-header">
                <div className="row">
                  <div className="col-11">
                    <h5 className="card-title">EQUIPMENT DETAILS</h5>
                  </div>
                  <div className="col-1 text-right">
                    <button
                      className="btn btn-close"
                      onClick={() => setSelectedEquipment(null)}
                    ></button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Equipment ID</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEquipment.equipment.map((equipment, index) => (
                      <tr key={index}>
                        <td>{equipment.equipmentId}</td>
                        <td>{equipment.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="form-group">
                  <label htmlFor="reasonBorrowed">Reason Borrowed:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="reasonBorrowed"
                      value={selectedEquipment.reasonBorrowed}
                      readOnly
                    />
                </div>
                <p>Status 1: {selectedEquipment.status1}</p>
                <p>Status 2: {selectedEquipment.status2}</p>
                <p>Status 3: {selectedEquipment.status3}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestList;
