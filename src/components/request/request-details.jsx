import React, { useState } from 'react';
import './request.css';
import ModalBody from './request-modalbody';
import ReleaseFormPopup from './request-releaseformpopup';

const RequestDetails = ({ click }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleReleaseFormClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="modal overlay" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Details</h5>
              <button className="btn btn-close" data-dismiss="modal" aria-label="Close" onClick={click} />
            </div>
            <div className="modal-body">
              <ModalBody />
            </div>

            <div className="modal-footer d-flex">
              <button type="button" className="btn btn-secondary me-md-3" onClick={handleReleaseFormClick}>
                Release Form
              </button>
              <div className="ms-auto mf-buttons">
                <button type="button" className="btn btn-success">Approve</button>
                <button type="button" className="btn btn-danger">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <ReleaseFormPopup onClose={handlePopupClose} />}
    </>
  );
};

export default RequestDetails;

