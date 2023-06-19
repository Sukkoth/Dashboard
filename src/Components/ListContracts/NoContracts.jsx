import React from 'react';

const NoContracts = ({ message }) => {
    return (
        <div className='container-fluid pt-4 px-4'>
            <div
                className='row bg-light rounded d-felx mx-0 text-center align-items-center'
                style={{ minHeight: '600px' }}
            >
                <h3 className='justify-self-center'>
                    {message || 'No Contracts data found'}
                </h3>
            </div>
        </div>
    );
};

export default NoContracts;
