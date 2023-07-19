import React, { useEffect, useState } from 'react';
import '../../styles/temp.css';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Pagination } from 'react-bootstrap';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentAvailability, setEquipmentAvailability] = useState({});
  const [equipmentData, setEquipmentData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [documentValue, setDocumentValue] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Retrieve the user ID from local storage

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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

  const handleDocumentId = (documentId) => {
    // Use the document ID as needed in the parent component
    console.log("Received Document ID:", documentId);
    // Perform additional actions with the document ID
    // Set the document ID value to a state variable
    setDocumentValue(documentId);
  }
  
  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleAcceptRequest = async (equipment) => {
    // Implement the logic to update the status based on the user ID
    if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2") {
      // User ID is "MOaqu8jBfGMh4QpdWQ48ETYWGuO2" (Verify)
      await updateStatus(equipment.id, "Initially Approved");
      updateRequestStatus(equipment.id, "Initially Approved");
    } else if (userId === "LNudqBX1odcAbVKBqoh6VGpgjj43") {
      // User ID is "LNudqBX1odcAbVKBqoh6VGpgjj43" (Verify)
      await updateStatus(equipment.id, "Fully Approved");
      updateRequestStatus(equipment.id, "Fully Approved");
    }
  };
  
  const handleRejectRequest = async (equipment) => {
    // Implement the logic to update the status to "Rejected"
    await updateStatus(equipment.id, "Rejected");
    updateRequestStatus(equipment.id, "Rejected");
  };
  
  const updateStatus = async (equipmentId, newStatus) => {
    try {
      const db = getFirestore();
      const requestRef = doc(db, 'Request', equipmentId);
      await updateDoc(requestRef, { status: newStatus });
      console.log(`Updated status for equipment ID ${equipmentId} to ${newStatus}`);
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };
  
  const updateRequestStatus = (equipmentId, newStatus) => {
    setRequestData((prevData) =>
      prevData.map((request) => {
        if (request.id === equipmentId) {
          return { ...request, status: newStatus };
        }
        return request;
      })
    );
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
        {currentItems.map((request, index) => {
              // Check the user ID and request status to determine if the table row should be displayed
              if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2" && request.status === "Verified") {
                return (
                  <tr key={index}>
                    <td>{request.borrowerEmail}</td>
                    <td>{request.borrowerName}</td>
                    <td>{request.dateBorrowed}</td>
                    <td>{request.dateReturned}</td>
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
                );
              } else if (userId === "LNudqBX1odcAbVKBqoh6VGpgjj43" && (request.status === "Initially Approved" || request.status === "Released" || request.status === "Returned")) {
                return (
                  <tr key={index}>
                    <td>{request.borrowerEmail}</td>
                    <td>{request.borrowerName}</td>
                    <td>{request.dateBorrowed}</td>
                    <td>{request.dateReturned}</td>
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
                );
              } else if (userId === "OUaIDJiaTAT9cOpvCG8L3rVhNm32" && request.status === "Fully Approved") {
                return (
                  <tr key={index}>
                    <td>{request.borrowerEmail}</td>
                    <td>{request.borrowerName}</td>
                    <td>{request.dateBorrowed}</td>
                    <td>{request.dateReturned}</td>
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
                );
              }
              return null;
            })}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="d-flex justify-content-end pagination">
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
      </div>
      {/* PAGINATION */}
      
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
                <p>Status: {selectedEquipment.status}</p>
                <div className="d-flex justify-content-end custom-requestbtn">
                  <button
                    className="btn btn-success"
                    onClick={() => handleAcceptRequest(selectedEquipment)}
                  >
                    Verify
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

      {/* <h1>User ID: {userId}</h1> */}
