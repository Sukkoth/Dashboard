import React from 'react';
import useApiFetch from '../../API/useApiFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({ tobeDeleted, setTobeDeleted }) => {
    const navigate = useNavigate();

    const {
        data: deleteData,
        isLoading: deleteLoad,
        errors: deleteErrors,
        fetchData: deleteContract,
        setErrors: setDeleteErrors,
    } = useApiFetch(
        {
            url: '/leases',
            method: 'get',
        },
        false
    );

    const handleDelete = async () => {
        const finished = await deleteContract({
            url: `/leases/${tobeDeleted}`,
            method: 'delete',
        });
        if (finished) {
            navigate(0);
        }
    };
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
                            {deleteLoad && (
                                <div className='col-md-6 text-center'>
                                    <ScaleLoader size={250} color='#d30fa9' />
                                </div>
                            )}
                            <p>
                                {deleteErrors && deleteErrors?.message}
                                {!deleteErrors?.message &&
                                    'Are you sure you want to delete this contract?'}
                            </p>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                                onClick={() => setDeleteErrors({})}
                            >
                                Close
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={handleDelete}
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

export default ConfirmationModal;
