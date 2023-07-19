import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown } from 'react-bootstrap';
import '../../styles/layout.css';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

const EquipmentList = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedEquipType, setSelectedEquipType] = useState('default');

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const db = getFirestore();
        const equipmentRef = collection(db, 'Equipments');
        let queryRef;

        if (selectedEquipType === 'default') {
          queryRef = equipmentRef;
        } else {
          queryRef = query(equipmentRef, where('equipType', '==', selectedEquipType));
        }

        const equipmentSnapshot = await getDocs(queryRef);
        const equipmentList = equipmentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEquipmentData(equipmentList);
      } catch (error) {
        console.log('Error retrieving equipment data:', error);
      }
    };

    fetchEquipmentData();
  }, [selectedEquipType]);

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
      brand: event.target.elements.brand.value,
      equipType: event.target.elements.equipmentType.value,
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

  const handleDeleteClick = async (equipment) => {
    try {
      const db = getFirestore();
      const equipmentRef = doc(db, 'Equipments', equipment.id);
      await deleteDoc(equipmentRef);

      // Remove the equipment from the state
      const updatedData = equipmentData.filter((item) => item.id !== equipment.id);
      setEquipmentData(updatedData);
    } catch (error) {
      console.log('Error deleting equipment data:', error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEquipmentData = equipmentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(equipmentData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEquipTypeSelect = (equipType) => {
    setSelectedEquipType(equipType);
  };

  const equipmentTypeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Computers', value: 'computers' },
    { label: 'Peripherals', value: 'peripherals' },
    { label: 'Servers', value: 'servers' },
    { label: 'Power Equipment', value: 'power-equipment' },
    { label: 'Networking Equipment', value: 'networking-equipment' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <div className="container displayAdmin">
      {/* DROPDOWN */}
      <div className="d-flex justify-content-start dropdown">
        <Dropdown onSelect={handleEquipTypeSelect}>
          <Dropdown.Toggle variant="secondary" id="dropdown-equipType">
            {selectedEquipType === 'default' ? 'Default' : selectedEquipType}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {equipmentTypeOptions.map((option) => (
              <Dropdown.Item key={option.value} eventKey={option.value}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* DROPDOWN */}
      
      {/* TABLE */}
      <Table className="table table-light custom-table" striped bordered>
        <thead>
          <tr>
            <th>Equipment Name</th>
            <th>Brand</th>
            <th>Equipment Type</th>
            <th>Asset Code</th>
            <th>Serial Number</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentEquipmentData.map((equipment, index) => (
            <tr key={index}>
              <td>{equipment.equipName}</td>
              <td>{equipment.brand}</td>
              <td>{equipment.equipType}</td>
              <td>{equipment.assetCode}</td>
              <td>{equipment.serialNum}</td>
              <td>{equipment.equipQuantity}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleUpdateClick(equipment)}>
                  Update
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(equipment)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* PAGINATION */}
      <div className="d-flex justify-content-end pagination">
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (currentPage > 1) {
                paginate(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => {
              if (currentPage < totalPages) {
                paginate(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      {/* PAGINATION */}
      
      {/* POPUP */}
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
                  <div className="row">
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
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        defaultValue={selectedEquipment.equipQuantity}
                        placeholder="Enter new quantity"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="brand">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        defaultValue={selectedEquipment.brand}
                        placeholder="Enter new brand"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="equipmentType">Equipment Type</label>
                      <select
                        className="form-control"
                        id="equipmentType"
                        defaultValue={selectedEquipment.equipType}
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
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* POPUP */}
    </div>
  );
};

export default EquipmentList;
