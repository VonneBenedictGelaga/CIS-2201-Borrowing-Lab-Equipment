import { useState } from 'react';
import { IoClose } from 'react-icons/bs';
import RequestDetails from './request-details';
import RequestDummyTableRow from './request-dummytablerow';
import './request.css';

const RequestMain = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(16 / itemsPerPage); // Assuming 16 rows in total

  const handleClick = () => {
    setShowCard(!showCard);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the indices for displaying rows on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Generate an array of table rows based on the current page
  const tableRows = [];
  for (let i = startIndex; i < endIndex && i < 15; i++) {
    tableRows.push(<RequestDummyTableRow key={i} click={handleClick} />);
  }

  return (
    <div className="container-fluid request-main">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className='table responsive-card'>
        <table className="table border-dark border-1 table-light text-center">
          <thead className='thead-color'>
            <tr>
              <th scope="col">Borrower Name</th>
              <th scope="col">Equipment</th>
              <th scope="col">Borrow Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      {showCard && <RequestDetails click={handleClick} />}

    </div>
  );
};

export default RequestMain;
