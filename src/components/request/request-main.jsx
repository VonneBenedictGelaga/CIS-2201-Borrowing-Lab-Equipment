import { useState } from 'react';
import './request.css';

const RequestMain = () => {
  const [showCard, setShowCard] = useState(false);

  const handleClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className='container-fluid request-main'>
      <h1>Requests</h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Borrower Email</th>
            <th scope="col">Borrower Name</th>
            <th scope="col">Equipment</th>
            <th scope="col">Borrow Date</th>
            <th scope="col">Return Date</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John_Doe@gmail.com</td>
            <td>John Doe</td>
            <td>TV Remote</td>
            <td>14/07/2023</td>
            <td>15/07/2023</td>
            <td className='text-success'>Available</td>
            <td>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showCard && (
        <div className='overlay' onClick={handleClick}>
          <div className="card">
            
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestMain;
