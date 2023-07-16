import React from 'react';
import './release-form-popup.css';
import USClogo from '../../images/University_of_San_Carlos_logo.png';

const ReleaseFormPopup = ({ onClose }) => {
  return (
    <div className="modal overlay2" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Release Form</h5>
            <button className="btn btn-close" data-dismiss="modal" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <div className="row justify-content-center">
              <div className="col-6 d-flex justify-content-center align-items-center">
                <img src={USClogo} width={150} height={150} alt="USC Logo" />
              </div>
              <div className="col-6">
                <div className="row">
                  <strong>Borrow Date</strong>
                  <p className="border bg-light">14/07/2023</p>
                </div>
                <div className="row">
                  <strong>Return Date</strong>
                  <p className="border bg-light">15/07/2023</p>
                </div>
              </div>
            </div>

            <div className="row">
              <strong>Equipment List:</strong>
              <div className="border bg-light">
                <ul>
                  <li>Vaporeon</li>
                  <li>Lube</li>
                  <li>Dildo</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <strong>Purpose of Release:</strong>
              <p className="border bg-light">Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans?</p>
            </div>
            
            <strong>Approved by:</strong>
            <div className='row text-center'>
              
              <div className='col'>
                <p className="border bg-light">Quandale</p>
              </div>
              <div className='col'>
                <p className="border bg-light">Dingle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseFormPopup;
