import React, { useState } from 'react';

const InstallmentData = ({ installmentData, setInstallmentData }) => {
  function handleAddInstallmentData() {
    setInstallmentData((prev) => [...prev, { installmentDate: '', amount: 0 }]);
  }

  function removeInstallmentData(index) {
    setInstallmentData((prev) => prev.filter((data, i) => i !== index));
  }
  function handleInstallmentDateChange(installmentIndex, date) {
    setInstallmentData((prev) =>
      prev.map((data, index) =>
        index === installmentIndex ? { ...data, installmentDate: date } : data
      )
    );
  }

  function handleInstallmentAmountChange(installmentIndex, amount) {
    setInstallmentData((prev) =>
      prev.map((data, index) =>
        index === installmentIndex ? { ...data, amount: amount } : data
      )
    );
  }

  return (
    <div className='col-sm-12 col-xl-6'>
      <div className='bg-white rounded h-100 p-4'>
        <h6 className='mb-4 h4'>
          Installment Data{' '}
          <button
            className='btn btn-primary mx-3'
            type='button'
            onClick={handleAddInstallmentData}
          >
            +
          </button>
        </h6>
        <div>
          {installmentData?.map((data, index) => (
            <div className='row mb-2' key={index}>
              <div className='mb-3 col-6'>
                <label
                  htmlFor={`installmentDate${index}`}
                  className='form-label'
                >
                  Installment Date
                  <span className='text-danger'>*</span>
                </label>
                <input
                  required
                  type='date'
                  className='form-control'
                  id={`installmentDate${index}`}
                  min={0.0}
                  value={installmentData[index]?.installmentDate}
                  onChange={(e) =>
                    handleInstallmentDateChange(index, e.target.value)
                  }
                />
              </div>
              <div className='mb-3 col-4'>
                <label
                  htmlFor={`installmentAmount${index}`}
                  className='form-label'
                >
                  Amount
                  <span className='text-danger'>*</span>
                </label>
                <input
                  type='number'
                  step={0.00005}
                  className='form-control'
                  id={`installmentAmount${index}`}
                  min={0.0}
                  value={installmentData[index]?.amount}
                  onChange={(e) =>
                    handleInstallmentAmountChange(index, e.target.value)
                  }
                />
              </div>
              <div className='mb-3 col-2 d-flex justify-content-center align-items-center mt-4'>
                <button
                  className='btn btn-danger'
                  type='button'
                  onClick={() => removeInstallmentData(index)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstallmentData;
