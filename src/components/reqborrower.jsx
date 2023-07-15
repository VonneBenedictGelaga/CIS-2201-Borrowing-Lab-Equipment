import React, { useState, useEffect } from 'react';
import '../styles/temp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';

//images
import USClogo from '../images/University_of_San_Carlos_logo.png'; 
import USChome from '../images/USChome.jpg';

const RequestBorrower = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsVerified(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const enteredEmail = email.trim();

    if (enteredEmail.endsWith('usc.edu.ph')) {
      try {
        // Send email verification
        await sendEmailVerification(auth.currentUser);
        setIsInvalidEmail(false);
        setIsEmailSent(true);
      } catch (error) {
        console.log('An error occurred during verification:', error);
        setIsInvalidEmail(true);
        setIsEmailSent(false);
      }
    } else {
      setIsInvalidEmail(true);
      setIsEmailSent(false);
    }
  };

return (
  <div className='container' style={{ backgroundImage: `url(${USChome})` }}>
    <div className='row'>
      <div className='col-md-5'>
        <div className='usc-logo'>
          <img src={USClogo} alt="USC Logo" className="usc-logo" /> 
        </div>
        <div className='title'>
          LAB EQUIPMENT BORROWING MODULE
          <div className='titlechild'>
            USC staff? Sign in here.
          </div>
        </div>
      </div>
      <div className='col-md-7 mt-4'>
        <div className="card bg-white mb-3 reqBor_container">
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
          {isEmailSent && (
            <>
              <p>Please log in with your USC email to proceed:</p>
              <div className="alert alert-success" role="alert">
                A verification link has been sent to your email.
              </div>
            </>
          )}
          {isVerified ? (
            <form className="d-flex flex-column" method="POST">
              <label htmlFor="edit2_borrowers_name">Borrower's Name</label>
              <input className="form-control mb-2" name="edit2_borrowers_name" type="text" placeholder="e.g. Ivanne Dave L. Bayer" required />
  
              <label htmlFor="edit2_reason">Reason for Borrowing</label>
              <textarea className="form-control mb-2" name="edit2_reason" rows="2" required></textarea>
  
              <label htmlFor="edit2_equipment">Equipment to Borrow</label>
              <select className="form-select mb-2" name="edit2_equipment" aria-label="Equipment to Borrow" required>
                <option value="Laptop">Laptop</option>
                <option value="Camera">Camera</option>
                <option value="Projector">Projector</option>
              </select>
              <label htmlFor="edit2_date_borrow">Date of Borrowing Equipment</label>
              <input className="form-control mb-2" name="edit2_date_borrow" type="date" required />
              <label htmlFor="edit2_date_return">Date of Returning Equipment</label>
              <input className="form-control mb-2" name="edit2_date_return" type="date" required />
              <button className="btn btn-primary" name="edit2" type="submit">
                Create Request
              </button>
            </form>
          ) : (
            <div>
              {!isInvalidEmail && !isEmailSent && (
                <>
                  <p>Please log in with your USC email to proceed:</p>
                </>
              )}
              <form className="d-flex flex-column" method="POST">
                <label htmlFor="edit2_borrowers_email">USC Email Address</label>
                <input
                  className="form-control mb-2"
                  name="edit2_borrowers_email"
                  type="email"
                  placeholder="e.g. example@usc.edu.ph"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSignIn}>
                  Verify Email
                </button>
              </form>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default RequestBorrower;