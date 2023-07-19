import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../dashboard/dashboard.css';
export const Dashboard = () => {
    return (
      <div className='container'>
        <div className='container1'>

          <div className ='firstDiv'>
                <h1>Good Day! Lab Technician Erwin!</h1>
          </div>

          <div className='containerStat'>
        
              <div className='row'>
                <div className='col-md-3 grid-cell'>
                <h1 className='Heading'>Requests</h1>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Computer</a>
                    <a class="dropdown-item" href="#">Server</a>
                    <a class="dropdown-item" href="#">Computer Equipment</a>
                  </div>
                </div>

                </div>
                <div className='col-md-3 grid-cell'>
                  <h2 className='subHeading'>Verified:</h2>
                  <h2 className='subHeading'>20/100</h2>
                </div>
                <div className='col-md-3 grid-cell'>
                  <h2 className='subHeading'>Full App.:</h2>
                  <h2 className='subHeading'>220/100</h2>
                </div>
                <div className='col-md-3 grid-cell'>
                  <h2 className='subHeading'>Returned:</h2>
                  <h2 className='subHeading'>20/100</h2>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Total:</h2>
                <h1 className='numberHead'>100</h1>
                </div>
                <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Init.App.:</h2>
                <h2 className='subHeading'>20/100</h2>
                </div>
                <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Released:</h2>
                  <h2 className='subHeading'>20/100</h2>
                </div>
                <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Rejected:</h2>
                  <h2 className='subHeading'>10/100</h2>
                </div>
              </div>
              
          </div>

          <div className='containerStat'>
        
            <div className='row'>
              <div className='col-md-3 grid-cell'>
              <h1 className='Heading'>Equipment</h1>
              <h2 className='subHeading'>EquipmentTypes:</h2>
              </div>
              <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Total:</h2>
                <h2 className='subHeading'>100</h2>
              </div>
              <div className='col-md-3 grid-cell'>
                <h2 className='subHeading'>Borrowed</h2>
                <h2 className='subHeading'>100</h2>
              </div>
              <div className='col-md-3 grid-cell'>
                <button>Period:dropdown</button>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 grid-cell'>
              <h1 className='numberHead'>40</h1>
              </div>
              
              <div className='col-md-3 grid-cell'>
              <h2 className='subHeading'>Available</h2>
              <h2 className='subHeading'>100</h2>
              </div>
              <div className='col-md-3 grid-cell'>
              </div>
              <div className='col-md-3 grid-cell'>
              </div>
            </div>
        
          </div>

      </div>
    </div>


    );
  }; 



  
