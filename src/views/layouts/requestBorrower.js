import React, { useState, useEffect } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import auth from '../../config/firebase';

const RequestBorrower = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidEmail2, setIsInvalidEmail2] = useState(false);

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const enteredEmail = email.trim();

    if (enteredEmail.endsWith('usc.edu.ph')) {
      try {
        // Send email verification
        await sendEmailVerification(auth.currentUser);

        setIsInvalidEmail(false);
        setIsInvalidEmail2(true);
      } catch (error) {
        console.log('An error occurred during verification:', error);
        setIsInvalidEmail(true);
        setIsInvalidEmail2(false);
      }
    } else {
      setIsInvalidEmail(true);
      setIsInvalidEmail2(false);
    }
  };

  const checkEmailVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      setIsVerified(true);
      setIsInvalidEmail(false);
      setIsInvalidEmail2(false);
    } else {
      setIsVerified(false);
      setIsInvalidEmail(false);
      setIsInvalidEmail2(false);
    }
  };

  const storeUserInformation = async (email) => {
    try {
      const db = getFirestore();
      const usersRef = collection(db, 'Users');
      const newUser = { email: email };
  
      await addDoc(usersRef, newUser);
      console.log('User information stored successfully!');
    } catch (error) {
      console.log('An error occurred while storing user information:', error);
    }
  };  

  useEffect(() => {
    if (isVerified) {
      // Call the function to store user information after verification
      storeUserInformation(email);
    }
  }, [isVerified]);

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
        {isInvalidEmail2 && (
          <>
            <p>Please log in with your USC email to proceed:</p>
            <div className="alert alert-success" role="alert">
              A verification link has been sent to your email.
            </div>
          </>
        )}
        {isVerified ? (
          <form className="d-flex flex-column" method="POST">
            {/* Form details */}
          </form>
        ) : (
          <div>
            {!isInvalidEmail && (
              <p>Please log in with your USC email to proceed:</p>
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
  );
};

export default RequestBorrower;
