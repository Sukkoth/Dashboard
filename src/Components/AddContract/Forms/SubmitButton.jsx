import React from 'react';

const SubmitButton = ({ isLoading }) => {
    return (
        <button className='btn btn-primary w-25 mx-auto mb-5' type='submit'>
            {(isLoading && 'Loading . . .') || 'Add Contract'}
        </button>
    );
};

export default SubmitButton;
