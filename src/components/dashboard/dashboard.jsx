import React, { useEffect, useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { db } from '../../config/firebase';
import getEquipmentInfo from './dashboard_equipment.js'; // Correct the import statement
import getRequestStatistics from './dashboard_requests.js';

export const Dashboard = () => {

  const [period, setPeriod] = useState('all');
  const [statistics, setStatistics] = useState(null);
  const [userId, setUserId] = useState("");
  const [equipmentType, setEquipmentType] = useState('all');
  const [equipmentInfo, setEquipmentInfo] = useState({
    total_quantity: 0,
    total_borrowed: 0,
    available_equipment: 0,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Retrieve the user ID from local storage

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  
  const getRole = (userId) => {
    if (userId === 'MOaqu8jBfGMh4QpdWQ48ETYWGuO2') {
      return 'Lab Head';
    } else if (userId === 'LNudqBX1odcAbVKBqoh6VGpgjj43') {
      return 'Department Chair';
    } else if (userId === 'OUaIDJiaTAT9cOpvCG8L3rVhNm32') {
      return 'Lab Tech';
    } 
  };

  useEffect(() => {
    // Fetch equipment information when the component mounts or when equipmentType changes
    async function fetchEquipmentInfo() {
      const data = await getEquipmentInfo(equipmentType);
      setEquipmentInfo(data);
    }

    fetchEquipmentInfo();
  }, [equipmentType]);

  const handleEquipmentTypeChange = (event) => {
    setEquipmentType(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const requestStatistics = await getRequestStatistics(period);
        setStatistics(requestStatistics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [period]);

    return (
    <div className='dashboard-cover'>
      <div className='dashboard container'>
        <div className='firstDiv'>
          <h1>Good Day {getRole(userId)}!</h1>
        </div>
        <div className='containerStat'>
          <div className='row'>
            <div className='col-md-3 grid-cell'>
              <h1 className='Heading'>Requests</h1>
              <h2 className='subHeading'>Total: {statistics?.totalRequests || 0}</h2>
            </div>

            <div className='col-md-2 grid-cell'>
              <h2 className='subHeading'>Verified:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.verified || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-3 grid-cell'>
              <h2 className='subHeading'>Fully Approved:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.fully_approved || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-2 grid-cell'>
              <h2 className='subHeading'>Returned:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.returned || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-2 grid-cell'>
              <select
                className='form-control'
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value='all'>All</option>
                <option value='upcoming'>Upcoming</option>
              </select>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-3 grid-cell'>
              <h1 className='numberHead'>{statistics?.totalRequests || 0}</h1>
            </div>
            <div className='col-md-2 grid-cell'>
              <h2 className='subHeading'>Init.App.:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.initial_approval || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-3 grid-cell'>
              <h2 className='subHeading'>Released:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.released || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-2 grid-cell'>
              <h2 className='subHeading'>Rejected:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.rejected || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
            <div className='col-md-2 grid-cell'>
              <h2 className='subHeading'>Missing:</h2>
              <h2 className='subHeading'>{statistics?.statusCounts?.missing || 0}/ {statistics?.totalRequests || 0}</h2>
            </div>
          </div>
        </div>


          {/* EQUIPMENTS */}
    <div className='containerStat2'>
      <div className='row'>
        <div className='col-md-3 grid-cell'>
          <h1 className='Heading'>Equipment</h1>
          <h2 className='subHeading'>EquipmentTypes:</h2>
        </div>
        <div className='col-md-3 grid-cell'>
          <h2 className='subHeading'>Total:</h2>
          <h2 className='subHeading'>{equipmentInfo.total_quantity}</h2>
        </div>
        <div className='col-md-3 grid-cell'>
          <h2 className='subHeading'>Borrowed</h2>
          <h2 className='subHeading'>{equipmentInfo.total_borrowed}</h2>
        </div>
        <div className='col-md-2 grid-cell'>
          {/* Dropdown for Equipment */}
          <select
            className='form-control'
            style={{ width: '150px' }}
            value={equipmentType}
            onChange={handleEquipmentTypeChange}
          >
            <option value='all'>All</option>
            <option value='computers'>Computer</option>
            <option value='servers'>Server</option>
            <option value='networking-equipment'>Networking Equipment</option>
            <option value='peripherals'>Peripherals</option>
            <option value='power-equipment'>Power Tools</option>
            <option value='others'>Others</option>
          </select>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-3 grid-cell'>
          <h1 className='numberHead'>{equipmentInfo.total_quantity}</h1>
        </div>

        <div className='col-md-3 grid-cell'>
          <h2 className='subHeading'>Available</h2>
          <h2 className='subHeading'>{equipmentInfo.available_equipment}</h2>
        </div>
        <div className='col-md-3 grid-cell'>{/* ... */}</div>
        <div className='col-md-3 grid-cell'>{/* ... */}</div>
      </div>
    </div>
    </div>
  </div>

    );
  }; 

  export default Dashboard;

  