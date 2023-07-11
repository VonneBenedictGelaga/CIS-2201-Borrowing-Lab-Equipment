import React, { useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithGoogle } from "../../config/reqBorrowerConf";

const RequestBorrower = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const handleSignIn = async () => {
    try {
      const isUserVerified = await signInWithGoogle(); 
      setIsVerified(isUserVerified);
      setIsInvalidEmail(!isUserVerified);
    } catch (error) {
      console.log('An error occurred during sign-in:', error);
      setIsInvalidEmail(true);
    }
  };

return (
    <div className="card bg-white mb-3 reqBor_container" style={{ width: '32rem', float: 'right' }}>
      <div className="card-header">
        {isVerified ? 'Update Form' : 'User Login'}
      </div>
      <div className="card-body">
        {isInvalidEmail && (
          <>
            <p>Please log in with your USC email to proceed:</p>
            <div className="alert alert-danger" role="alert">
              Only USC email addresses are allowed.
            </div>
          </>
        )}
{isVerified ? (
          <form className="d-flex flex-column" method="POST">
            <label htmlFor="edit2_borrowers_name">Borrower's Name</label>
            <input className="form-control mb-2" name="edit2_borrowers_name" type="text" placeholder="e.g. Ivanne Dave L. Bayer" required/>

            <label htmlFor="edit2_reason">Reason for Borrowing</label>
            <textarea className="form-control mb-2" name="edit2_reason" rows="2" required></textarea>

            <label htmlFor="edit2_equipment">Equipment to Borrow</label>
            <select className="form-select mb-2" name="edit2_equipment" aria-label="Equipment to Borrow" required>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Projector">Projector</option>
            </select>
            <label htmlFor="edit2_date_borrow">Date of Borrowing Equipment</label>
            <input className="form-control mb-2" name="edit2_date_borrow" type="date" required/>
            <label htmlFor="edit2_date_return">Date of Returning Equipment</label>
            <input className="form-control mb-2" name="edit2_date_return" type="date" required/>
            <button className="btn btn-primary" name="edit2" type="submit">
              Create Request
            </button>
          </form>
        ) : (
          <div>
            {!isInvalidEmail && (
              <p>Please log in with your USC email to proceed:</p>
            )}
            <button className="btn btn-primary" onClick={handleSignIn}>
              Log in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestBorrower;