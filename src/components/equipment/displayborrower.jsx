import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown, Modal, Button } from 'react-bootstrap';
import './displayborrower.css';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
  addDoc,
  setDoc,
} from 'firebase/firestore';

const DisplayBorrower = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedEquipType, setSelectedEquipType] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleSelectEquipment = (equipmentId) => {
    const selectedEquipment = equipmentData.find((equipment) => equipment.id === equipmentId);
    setSelectedEquipment(selectedEquipment);
    setSelectedQuantity(1);
    setShowModal(true);
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEquipmentData = equipmentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(equipmentData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= selectedEquipment.equipQuantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleQuantityIncrease = () => {
    if (selectedQuantity < selectedEquipment.equipQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const storeEquipmentInFirebase = async (equipmentId, quantity) => {
    try {
      const db = getFirestore();
      const queryRef = collection(db, 'Query');
      await addDoc(queryRef, { equipmentId, quantity });
      console.log('Equipment stored in Firebase successfully!');
    } catch (error) {
      console.log('Error storing equipment in Firebase:', error);
    }
  };

  const handleSelectEquipmentConfirm = async () => {
    const selectedEquipmentInfo = {
      id: selectedEquipment.id,
      name: selectedEquipment.equipName,
      brand: selectedEquipment.brand,
      quantity: selectedQuantity,
    };

    try {
      const db = getFirestore();
      const queryRef = collection(db, 'Query');

      // Check if the selected equipment already exists in the 'Query' collection
      const existingEquipmentQuery = query(queryRef, where('equipmentId', '==', selectedEquipment.id));
      const existingEquipmentSnapshot = await getDocs(existingEquipmentQuery);

      if (existingEquipmentSnapshot.empty) {
        // If the selected equipment doesn't exist, add it to the 'Query' collection
        await addDoc(queryRef, {
          equipmentId: selectedEquipment.id,
          equipName: selectedEquipment.equipName,
          brand: selectedEquipment.brand,
          quantity: selectedQuantity,
        });
      } else {
        // If the selected equipment already exists, update the existing document
        const existingEquipmentDoc = existingEquipmentSnapshot.docs[0];
        await setDoc(existingEquipmentDoc.ref, {
          equipmentId: selectedEquipment.id,
          equipName: selectedEquipment.equipName,
          brand: selectedEquipment.brand,
          quantity: selectedQuantity,
        });
      }

      console.log('Equipment stored in Firebase successfully!');
    } catch (error) {
      console.log('Error storing equipment in Firebase:', error);
    }

    // Reset selected equipment and quantity
    setSelectedEquipment(null);
    setSelectedQuantity(1);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
    setSelectedQuantity(1);
    setShowModal(false);
  };

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

      {/* TABLE */}
      <Table className="table table-light custom-table">
        <thead>
          <tr>
            <th>Equipment Name</th>
            <th>Brand</th>
            <th>Equipment Type</th>
            <th>Asset Code</th>
            <th>Serial Number</th>
            <th>Quantity</th>
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
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSelectEquipment(equipment.id)}
                >
                  Select
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

      {/* MODAL */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>EQUIPMENT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="equipmentName">Equipment Name</label>
            <input
              type="text"
              className="form-control"
              id="equipmentName"
              value={selectedEquipment ? selectedEquipment.equipName : ''}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={selectedEquipment ? selectedEquipment.description : ''}
              readOnly
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
                value={selectedEquipment ? selectedEquipment.assetCode : ''}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="serialNumber">Serial Number</label>
              <input
                type="text"
                className="form-control"
                id="serialNumber"
                value={selectedEquipment ? selectedEquipment.serialNum : ''}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="quantity">Quantity</label>
              <div className="input-group">
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={handleQuantityDecrease}
                  >
                    -
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={selectedQuantity}
                  min={1}
                  max={selectedEquipment ? selectedEquipment.equipQuantity : ''}
                  onChange={handleQuantityChange}
                  readOnly
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={handleQuantityIncrease}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                value={selectedEquipment ? selectedEquipment.brand : ''}
                readOnly
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="equipmentType">Equipment Type</label>
              <select
                className="form-control"
                id="equipmentType"
                value={selectedEquipment ? selectedEquipment.equipType : ''}
                disabled
              >
                {equipmentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSelectEquipmentConfirm}>
            Select Equipment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisplayBorrower;
