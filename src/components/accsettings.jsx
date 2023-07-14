import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Equipment = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    birthday: '',
    uscId: '',
    email: '',
    file: null,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({ ...prevData, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'gender', 'age', 'birthday', 'uscId', 'email'];
    const isEmpty = requiredFields.some((field) => !userData[field]);

    if (isEmpty) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      const userId = 'USER_ID'; // Replace 'USER_ID' with the actual user ID you want to update
      const userRef = doc(db, 'Users', userId);

      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        age: userData.age,
        birthday: userData.birthday,
        uscId: userData.uscId,
        email: userData.email,
      });

      console.log('User data updated in Firestore');
      // Reset the form data
      setUserData({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        birthday: '',
        uscId: '',
        email: '',
        file: null,
      });

      // Show success alert and clear form error
      setShowSuccessAlert(true);
      setFormError('');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="card col-4 insertEquipment">
      <div className="card-header">
        <h5 className="card-title">UPDATE USER</h5>
      </div>
      <div className="card-body">
        {showSuccessAlert && (
          <div className="alert alert-success" role="alert">
            User data updated successfully!
          </div>
        )}
        {formError && (
          <div className="alert alert-danger" role="alert">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">Insert User Photo</label>
            <br />
            <input
              type="file"
              className="form-control-file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className='row'>
            <div className="col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                required
              />
            </div>
              <div className="col-md-4">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
            <div className="col-md-4">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                value={userData.birthday}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="uscId">USC ID</label>
            <input
              type="text"
              className="form-control"
              id="uscId"
              name="uscId"
              value={userData.uscId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" className="form-control" value="Role Value" readOnly />
          </div><br></br>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Equipment;
