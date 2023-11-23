import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const FullLoader = ({ isLoading }) => {
    return (
        isLoading && (
            <div className='container-fluid pt-4 px-4 take-screen'>
                <div
                    className='row bg-white rounded align-items-center justify-content-center mx-0'
                    style={{ minHeight: '80vh' }}
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
