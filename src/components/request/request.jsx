import React, { useEffect, useState } from 'react';
import '../../styles/temp.css';
import { getFirestore, collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Pagination } from 'react-bootstrap';
import { notifyRequestRejection, notifyRequestApproval } from '../email/notify';
import { updateEquipmentQuantity, updateReturnedEquipmentQuantity } from '../request/requestmath.js';

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
    if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2") {
      // User ID is "MOaqu8jBfGMh4QpdWQ48ETYWGuO2" (Verify)
      await updateStatus(equipment.id, "initial_approval");
      updateRequestStatus(equipment.id, "initial_approval");
    } else if (userId === "LNudqBX1odcAbVKBqoh6VGpgjj43") {
      // User ID is "LNudqBX1odcAbVKBqoh6VGpgjj43" (Verify)
      await updateStatus(equipment.id, "full_approval");
      updateRequestStatus(equipment.id, "full_approval");

      notifyRequestApproval(equipment.borrowerEmail);
    }
  };
  
  const handleRejectRequest = async (equipment) => {
    // Implement the logic to update the status to "Rejected"
    await updateStatus(equipment.id, 'rejected');
    updateRequestStatus(equipment.id, 'rejected');

    // Call notifyRequestRejection function to send rejection email
    notifyRequestRejection(equipment.borrowerEmail);
  };

  const handleReleaseForm = async (equipment) => {
    // Implement the logic to update the status to "Released"
    await updateStatus(equipment.id, "released");
    updateRequestStatus(equipment.id, "released");
  
    // Call notifyRequestApproval function to send the approval email
    notifyRequestApproval(equipment.borrowerEmail);
  };
  
  const handleEquipAction = async (selectedEquipment) => {
    if (selectedEquipment.status === 'full_approval') {
      // Release the equipment
      await handleReleaseEquip(selectedEquipment);
    } else if (selectedEquipment.status === 'released') {
      // Return the equipment
      await handleReturnEquip(selectedEquipment);
    }
  };
  
  const handleReleaseEquip = async (equipment) => {
    try {
      const releasedEquipment = equipment.equipment;
      const db = getFirestore();
  
      // Update the equipment quantity in the Equipments collection
      await updateEquipmentQuantity(releasedEquipment);
  
      // Update the request status to "Released"
      await updateStatus(equipment.id, "released");
      updateRequestStatus(equipment.id, "released");
  
      // Update the selected equipment status to "Released"
      setSelectedEquipment((prevEquipment) => ({
        ...prevEquipment,
        status: "released"
      }));
    } catch (error) {
      console.log('Error releasing equipment:', error);
    }
  };
  
  const handleReturnEquip = async (equipment) => {
    try {
      // Update the equipment quantity in the Equipments collection
      await updateReturnedEquipmentQuantity(equipment.equipment);
  
      // Implement the logic to update the status to "Returned"
      await updateStatus(equipment.id, "returned");
      updateRequestStatus(equipment.id, "returned");
  
      // Update the selected equipment status to "Returned"
      setSelectedEquipment((prevEquipment) => ({
        ...prevEquipment,
        status: "returned"
      }));
    } catch (error) {
      console.log('Error returning equipment:', error);
    }
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
                      // LAB HEAD
              if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2" && request.status === "verified") {
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
                );      //DEPT CHAIR
              } else if (userId === "LNudqBX1odcAbVKBqoh6VGpgjj43" && request.status === "initial_approval") {
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
                );       //LAB TECH
              } else if (userId === "OUaIDJiaTAT9cOpvCG8L3rVhNm32" && (request.status === "full_approval" || request.status === "released" || request.status === "returned")) {
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
                <p>Status: {selectedEquipment.status}</p>
                <div className="d-flex justify-content-between">
                {userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2" && (
                    <>
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
                    </>
                )}
                {userId === "LNudqBX1odcAbVKBqoh6VGpgjj43" && (
                    <>
                    <button className="btn btn-primary" onClick={() => handleReleaseForm(selectedEquipment)}>
                      Release Form
                    </button>
                    <button className="btn btn-danger" onClick={() => handleRejectRequest(selectedEquipment)}>
                        Reject
                    </button>
                  </>
                )}
                {userId === "OUaIDJiaTAT9cOpvCG8L3rVhNm32" && (
                    <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEquipAction(selectedEquipment)}
                    >
                      {selectedEquipment.status === 'full_approval' ? 'Release' : 'Return'}
                    </button>
                  </>
                )}
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
