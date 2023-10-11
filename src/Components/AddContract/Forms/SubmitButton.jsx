import React from 'react';

const SubmitButton = ({ isLoading }) => {
    return (
        <div>
            <button
                className='btn btn-primary w-50 mb-5'
                type='submit'
                style={{ marginInline: 'auto' }}
            >
                {(isLoading && 'Loading . . .') || 'Add Contract'}
            </button>
        </div>
    );
};

export default SubmitButton;
