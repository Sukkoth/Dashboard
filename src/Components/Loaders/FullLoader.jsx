import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const FullLoader = ({ isLoading }) => {
    return (
        isLoading && (
            <div className='container-fluid pt-4 px-4'>
                <div
                    className='row bg-light rounded align-items-center justify-content-center mx-0'
                    style={{ minHeight: '600px' }}
                >
                    <div className='col-md-6 text-center'>
                        <ScaleLoader size={250} color='#d30fa9' />
                    </div>
                </div>
            </div>
        )
    );
};

export default FullLoader;
