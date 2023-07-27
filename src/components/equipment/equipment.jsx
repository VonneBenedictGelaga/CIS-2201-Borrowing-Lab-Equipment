import React, { useState, useEffect } from 'react';
import '../../styles/temp.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Equipment = () => {
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    description: '',
    assetCode: '',
    serialNumber: '',
    quantity: '',
    brand: '',
    equipmentType: 'others',
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

    if (name === 'equipmentType' && value !== 'others') {
      setEquipmentData((prevData) => ({
        ...prevData,
        equipmentType: value,
      }));
    } else {
      setEquipmentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'description', 'assetCode', 'serialNumber', 'quantity', 'brand'];
    const isEmpty = requiredFields.some((field) => !equipmentData[field]);

    if (isEmpty) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (equipmentData.quantity <= 0) {
      setFormError('Quantity must be greater than zero.');
      return;
    }

    try {
      const equipmentRef = collection(db, 'Equipments');

      await addDoc(equipmentRef, {
        assetCode: equipmentData.assetCode,
        description: equipmentData.description,
        equipName: equipmentData.name,
        serialNum: equipmentData.serialNumber,
        total_quantity: equipmentData.quantity,
        brand: equipmentData.brand,
        equipType: equipmentData.equipmentType,
        status: 'available',
        total_borrowed: 0
      });

      console.log('Form data saved to Firestore');
      // Reset the form data
      setEquipmentData({
        name: '',
        description: '',
        assetCode: '',
        serialNumber: '',
        quantity: '',
        brand: '',
      });

      // Show success alert and clear form error
      setFormError('');
      setShowSuccessAlert(true); // Set showSuccessAlert to true

      setTimeout(() => {
        setShowSuccessAlert(false); // Reset showSuccessAlert after a certain duration
      }, 5000);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const equipmentTypeOptions = [
    { label: 'Others', value: 'others' },
    { label: 'Computers', value: 'computers' },
    { label: 'Peripherals', value: 'peripherals' },
    { label: 'Servers', value: 'servers' },
    { label: 'Power Equipment', value: 'power-equipment' },
    { label: 'Networking Equipment', value: 'networking-equipment' },
  ];

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
              rows={2}
              style={{ resize: 'none' }} // Set the resize property to "none"
              required
            ></textarea>
          </div>
          <div className="row">
            <div className="col-6">
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
            <div className="col-6">
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
          <div className="row">
            <div className="col-3">
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
            <div className="col-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={equipmentData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-5">
              <label htmlFor="equipmentType">Equipment Type</label>
              <select
                className="form-control"
                id="equipmentType"
                name="equipmentType"
                value={equipmentData.equipmentType}
                onChange={handleInputChange}
                required
              >
                {equipmentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Equipment;
