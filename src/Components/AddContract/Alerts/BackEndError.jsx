import React from 'react';

const BackEndError = ({ message }) => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='alert alert-warning w-25 text-center' role='alert'>
                <i className='fa fa-danger'></i>
                {message}
            </div>
        </div>
    );
};

export default BackEndError;
