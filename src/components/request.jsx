import React, { useEffect, useState } from 'react';
import '../styles/layout.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;