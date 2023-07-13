import React, { useEffect, useState } from 'react';
import '../styles/layout.css';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const EquipmentList = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const db = getFirestore();
        const equipmentRef = collection(db, 'Equipments');
        const equipmentSnapshot = await getDocs(equipmentRef);
        const equipmentList = equipmentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEquipmentData(equipmentList);
      } catch (error) {
        console.log('Error retrieving equipment data:', error);
      }
    };

    fetchEquipmentData();
  }, []);

  const handleUpdateClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleCloseCard = () => {
    setSelectedEquipment(null);
    setUpdateSuccess(false);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const updatedEquipment = {
      equipName: event.target.elements.equipmentName.value,
      description: event.target.elements.description.value,
      assetCode: event.target.elements.assetCode.value,
      serialNum: event.target.elements.serialNumber.value,
      equipQuantity: event.target.elements.quantity.value,
    };

    try {
      const db = getFirestore();
      const equipmentRef = doc(db, 'Equipments', selectedEquipment.id);
      await updateDoc(equipmentRef, updatedEquipment);
      setUpdateSuccess(true);

      // Update the equipment data in the state
      const updatedData = equipmentData.map((equipment) => {
        if (equipment.id === selectedEquipment.id) {
          return { ...equipment, ...updatedEquipment };
        }
        return equipment;
      });
      setEquipmentData(updatedData);
    } catch (error) {
      console.log('Error updating equipment data:', error);
    }
  };

  return (
    <div className="container displayAdmin">
      <table className="table table-bordered table-striped custom-table">
        <thead className="thead-dark">
          <tr>
            <th>Equipment Name</th>
            <th>Description</th>
            <th>Asset Code</th>
            <th>Serial Number</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.map((equipment, index) => (
            <tr key={index}>
              <td>{equipment.equipName}</td>
              <td>{equipment.description}</td>
              <td>{equipment.assetCode}</td>
              <td>{equipment.serialNum}</td>
              <td>{equipment.equipQuantity}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleUpdateClick(equipment)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEquipment && (
        <div className="overlay">
          <div className="expanded-card">
            <div className="card col-4 insertEquipment">
              <div className="card-header">
                <div className="row">
                  <div className="col-11">
                    <h5 className="card-title">UPDATE EQUIPMENT</h5>
                  </div>
                  <div className="col-1 text-right">
                    <button className="btn btn-close" onClick={handleCloseCard}></button>
                  </div>
                </div>
              </div>
              <div className="card-body">
              {updateSuccess && (
                  <div className="alert alert-success" role="alert">
                    Form data saved successfully!
                  </div>
                )}
                <form onSubmit={handleUpdateSubmit}>
                  <div className="form-group">
                    <label htmlFor="equipmentName">Equipment Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="equipmentName"
                      defaultValue={selectedEquipment.equipName}
                      placeholder="Enter new equipment name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      defaultValue={selectedEquipment.description}
                      placeholder="Enter new description"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="assetCode">Asset Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="assetCode"
                        defaultValue={selectedEquipment.assetCode}
                        placeholder="Enter new asset code"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="serialNumber">Serial Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="serialNumber"
                        defaultValue={selectedEquipment.serialNum}
                        placeholder="Enter new serial number"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantity"
                      defaultValue={selectedEquipment.equipQuantity}
                      placeholder="Enter new quantity"
                    />
                  </div><br></br>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;
