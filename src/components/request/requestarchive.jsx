import React, { useEffect, useState } from 'react';
import '../../styles/temp.css';
import '../release/release-form-popup.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Pagination } from 'react-bootstrap';
import USClogo from '../../images/University_of_San_Carlos_logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReleaseFormPopup = () => {
  const [requestData, setRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [equipmentData, setEquipmentData] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Default");
  const [selectedDate, setSelectedDate] = useState(null);

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
    const fetchEquipmentData = async () => {
      try {
        const db = getFirestore();
        const equipmentRef = collection(db, 'Equipments');
        const equipmentSnapshot = await getDocs(equipmentRef);
        const equipmentData = {};
        equipmentSnapshot.forEach((doc) => {
          const equipmentId = doc.id;
          equipmentData[equipmentId] = {
            equipName: doc.data().equipName,
            brand: doc.data().brand,
          };
        });
        setEquipmentData(equipmentData);
      } catch (error) {
        console.log('Error retrieving equipment data:', error);
      }
    };

    fetchEquipmentData();
  }, []);

  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleFilterByDate = async (date) => {
    setSelectedDate(date);
    if (!date) {
      // Reset the table to show all data when the date is cleared
      setCurrentPage(1); // Reset pagination to the first page
      try {
        const db = getFirestore();
        const requestRef = collection(db, 'Request');
        const requestSnapshot = await getDocs(requestRef);
        const requestList = requestSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRequestData(requestList);
      } catch (error) {
        console.log('Error retrieving request data:', error);
      }
    } else {
      try {
        const db = getFirestore();
        const requestRef = collection(db, 'Request');
        const requestSnapshot = await getDocs(requestRef);
        const requestList = requestSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        // Filter the original data based on the selected date
        const filteredItems = requestList.filter(
          (item) => new Date(item.dateBorrowed).toDateString() === date.toDateString()
        );
        // Update the current page to the first page to avoid pagination issues
        setCurrentPage(1);
        // Update the currentItems with the filtered data
        setRequestData(filteredItems);
      } catch (error) {
        console.log('Error retrieving request data:', error);
      }
    }
  };

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter the items based on the selected status
  const filteredItems = selectedStatus === "Default"
    ? currentItems
    : currentItems.filter((item) => item.status === selectedStatus);

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
          {filteredItems.map((request, index) => (
            <tr key={index}>
              <td>{request.borrowerEmail}</td>
              <td>{request.borrowerName}</td>
              <td>{request.dateBorrowed}</td>
              <td>{request.dateReturned}</td>
              <td>{request.status}</td>
              <td>
                {['full_approval', 'released', 'returned'].includes(request.status) && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewDetails(request)}
                  >
                    Release Form
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='row'>
        <div className='col-md-4'>
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
        <div className='col-md-2'>
          <div className="form-group">
            <select
              className="form-control"
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Default">Default</option>
              <option value="verified">Verified</option>
              <option value="initial_approval">Initial Approval</option>
              <option value="full_approval">Full Approval</option>
              <option value="rejected">Rejected</option>
              <option value="released">Released</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="form-group">
            <DatePicker
              selected={selectedDate}
              onChange={handleFilterByDate}
              className="form-control"
              dateFormat="MM/dd/yyyy"
              isClearable
            />
          </div>
        </div>
      </div>

      {selectedEquipment && (
        <div className="modal overlay2" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Release Form</h5>
                <button
                  className="btn btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedEquipment(null)}
                />
              </div>
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={USClogo} width={150} height={150} alt="USC Logo" />
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <strong>Borrow Date</strong>
                      <p className="border bg-light">{selectedEquipment.dateBorrowed}</p>
                    </div>
                    <div className="row">
                      <strong>Return Date</strong>
                      <p className="border bg-light">{selectedEquipment.dateReturned}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <strong>Equipment List:</strong>
                  <div className="border bg-light">
                    <ul>
                      {selectedEquipment.equipment.map((equipment, index) => (
                        <li key={index}>{equipmentData[equipment.equipmentId]?.equipName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <strong>Purpose of Release:</strong>
                  <p className="border bg-light">{selectedEquipment.reasonBorrowed}</p>
                </div>

                <strong>Approved by:</strong>
                <div className="row text-center">
                  <div className="col">
                    <p className="border bg-light">Lab Head</p>
                  </div>
                  <div className="col">
                    <p className="border bg-light">Dept Chair</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseFormPopup;
