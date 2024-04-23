import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Alert from './Hierarchy/Alert';

const Modal = ({
  displayQuestion,
  onConfrim,
  onClose,
  redirectTo,
  isLoading = false,
  message,
}) => {
  return (
    <div className='container-fluid pt-4 px-4'>
      <div
        className='modal'
        tabIndex='-1'
        id='modal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Delete Contract</h5>
            </div>
            <div className='modal-body'>
              {isLoading && (
                <div className='col-md-6 text-center'>
                  <ScaleLoader size={250} color='#d30fa9' />
                </div>
              )}
              {message ? (
                <div
                  className={`mb-4 alert alert-danger fade show d-flex justify-content-between`}
                  role='alert'
                >
                  {message}
                </div>
              ) : (
                <p>{displayQuestion}</p>
              )}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={onClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={onConfrim}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
