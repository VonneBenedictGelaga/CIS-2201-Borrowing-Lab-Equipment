import React, { useEffect, useState } from 'react';
import '../styles/layout.css';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Pagination } from 'react-bootstrap';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentAvailability, setEquipmentAvailability] = useState({});
  const [equipmentData, setEquipmentData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  useEffect(() => {
    const fetchEquipmentAvailability = async () => {
      try {
        const db = getFirestore();
        const equipmentRef = collection(db, 'Equipments');
        const equipmentSnapshot = await getDocs(equipmentRef);
        const equipmentAvailabilityData = {};
        const equipmentData = {};
        equipmentSnapshot.forEach((doc) => {
          const equipmentId = doc.id;
          equipmentAvailabilityData[equipmentId] = true;
          equipmentData[equipmentId] = { equipName: doc.data().equipName, brand: doc.data().brand };
        });
        setEquipmentAvailability(equipmentAvailabilityData);
        setEquipmentData(equipmentData);
      } catch (error) {
        console.log('Error retrieving equipment availability:', error);
      }
    };

    fetchEquipmentAvailability();
  }, []);

  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleAcceptRequest = (equipment) => {
    // Implement the logic to accept the request
    console.log('Accepting request:', equipment);
  };

  const handleRejectRequest = (equipment) => {
    // Implement the logic to reject the request
    console.log('Rejecting request:', equipment);
  };

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((request, index) => (
            <tr key={index}>
              <td>{request.borrowerEmail}</td>
              <td>{request.borrowerName}</td>
              <td>{request.dateBorrowed}</td>
              <td>{request.dateReturned}</td>
              <td>{request.status3}</td>
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

      <Pagination>
        <Pagination.Prev
          onClick={() => {
            if (currentPage > 1) {
              paginate(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => {
            if (currentPage < totalPages) {
              paginate(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
        />
      </Pagination>

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
                      <th>Equipment Name</th>
                      <th>Brand</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEquipment.equipment.map((equipment, index) => {
                      return (
                        <tr key={index}>
                          <td>{equipmentData[equipment.equipmentId]?.equipName}</td>
                          <td>{equipmentData[equipment.equipmentId]?.brand}</td>
                          <td>{equipment.quantity}</td>
                        </tr>
                      );
                    })}
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
                <div className="form-group">
                  <label htmlFor="borrowerType">Borrower Type:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="borrowerType"
                    value={selectedEquipment.borrowerType}
                    readOnly
                  />
                </div>
                <p>Status 1: {selectedEquipment.status1}</p>
                <p>Status 2: {selectedEquipment.status2}</p>
                <p>Status 3: {selectedEquipment.status3}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={() => handleAcceptRequest(selectedEquipment)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRejectRequest(selectedEquipment)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestList;
