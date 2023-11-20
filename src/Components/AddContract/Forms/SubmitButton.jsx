import React from 'react';

const SubmitButton = ({ isLoading }) => {
    return (
        <div className='col-12  d-flex justify-content-center'>
            <button className='btn btn-primary w-25 mb-5' type='submit'>
                {(isLoading && 'Loading . . .') || 'Add Contract'}
            </button>
        </div>
    );
};

export default SubmitButton;
