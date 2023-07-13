import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Add the missing import

const Equipment = () => {
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    description: '',
    assetCode: '',
    serialNumber: '',
    quantity: '',
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
    setEquipmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEquipmentData((prevData) => ({ ...prevData, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'description', 'assetCode', 'serialNumber', 'quantity'];
    const isEmpty = requiredFields.some((field) => !equipmentData[field]);

    if (isEmpty) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      const db = getFirestore();
      const equipmentRef = collection(db, 'Equipments');

      await addDoc(equipmentRef, {
        assetCode: equipmentData.assetCode,
        description: equipmentData.description,
        equipPhotoPath: equipmentData.file.name,
        equipName: equipmentData.name,
        serialNum: equipmentData.serialNumber,
        equipQuantity: equipmentData.quantity,
      });

      console.log('Form data saved to Firestore');
      // Reset the form data
      setEquipmentData({
        name: '',
        description: '',
        assetCode: '',
        serialNumber: '',
        quantity: '',
        file: null,
      });

      // Show success alert and clear form error
      setShowSuccessAlert(true);
      setFormError('');
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <div className="card col-4 insertEquipment">
      <div className="card-header">
        <h5 className="card-title">INSERT EQUIPMENT</h5>
      </div>
      <div className="card-body">
        {showSuccessAlert && (
          <div className="alert alert-success" role="alert">
            Form data saved successfully!
          </div>
        )}
        {formError && (
          <div className="alert alert-danger" role="alert">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">Insert Equipment Photo</label>
            <br></br>
            <input
              type="file"
              className="form-control-file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Equipment Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={equipmentData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={equipmentData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
                <div className="form-group">
                <label htmlFor="assetCode">Asset Code</label>
                <input
                    type="number"
                    className="form-control"
                    id="assetCode"
                    name="assetCode"
                    value={equipmentData.assetCode}
                    onChange={handleInputChange}
                    required
                />
                </div>
            </div>
            <div className="col">
                <div className="form-group">
                <label htmlFor="serialNumber">Serial Number</label>
                <input
                    type="number"
                    className="form-control"
                    id="serialNumber"
                    name="serialNumber"
                    value={equipmentData.serialNumber}
                    onChange={handleInputChange}
                    required
                />
                </div>
            </div>
            </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={equipmentData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Equipment;
