import React, { useEffect, useState } from 'react';
import useApiFetch from '../API/useApiFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useNavigate } from 'react-router-dom';

//TODO Try reloading the page if there is no error in deleteError Object, you are having difficulty wih blocking and non blocking concept, the error object gets populated after you check for it
//!Fixed the above in a very odd way
const ListContracts = () => {
    const [tobeDeleted, setTobeDeleted] = useState(false);
    const navigate = useNavigate();
    const {
        data: contractsData,
        isLoading,
        errors,
    } = useApiFetch({
        url: '/leases',
        method: 'get',
    });

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

    deleteErrors?.message &&
        console.log('ERROR MESSAGE', deleteErrors?.message);

    const handleDelete = async () => {
        console.log('Strat');
        const finished = await deleteContract({
            url: `/leases/${tobeDeleted}`,
            method: 'delete',
        });
        if (finished) {
            navigate(0);
        }
    };

    return (
        <>
            {isLoading && (
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
            )}
            {!isLoading &&
                !errors?.message &&
                (contractsData.length > 0 ? (
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
                                        <h5 className='modal-title'>
                                            Delete Contract
                                        </h5>
                                    </div>
                                    <div className='modal-body'>
                                        {deleteLoad && (
                                            <div className='col-md-6 text-center'>
                                                <ScaleLoader
                                                    size={250}
                                                    color='#d30fa9'
                                                />
                                            </div>
                                        )}
                                        <p>
                                            {deleteErrors &&
                                                deleteErrors?.message}
                                            {!isLoading &&
                                                !deleteErrors?.message &&
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

                        <div className='row g-4' style={{ minHeight: '500px' }}>
                            <div className='col-12'>
                                <div className='bg-light rounded h-100 p-4'>
                                    <h6 className='mb-4'>Contracts List</h6>
                                    <div className='table-responsive mb-5'>
                                        <table
                                            className='table'
                                            style={
                                                contractsData.length === 1
                                                    ? {
                                                          minHeight: '150px',
                                                      }
                                                    : {}
                                            }
                                        >
                                            <thead>
                                                <tr>
                                                    <th scope='col'>ID</th>
                                                    <th scope='col'>
                                                        Branch Name
                                                    </th>
                                                    <th scope='col'>
                                                        Contract Number
                                                    </th>
                                                    <th scope='col'>
                                                        Contract Start Date
                                                    </th>
                                                    <th scope='col'>
                                                        Contract End Date
                                                    </th>
                                                    <th scope='col'>
                                                        Advance Payment
                                                    </th>
                                                    <th scope='col'>
                                                        Initial Directive Cost
                                                    </th>
                                                    <th scope='col'>
                                                        Lease Incentive
                                                    </th>
                                                    <th scope='col'>
                                                        Total Payament
                                                    </th>
                                                    <th scope='col'>
                                                        Authorization
                                                    </th>
                                                    <th scope='col'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contractsData.map(
                                                    (contract, index) => (
                                                        <tr key={contract.id}>
                                                            <th scope='row'>
                                                                {index + 1}
                                                            </th>
                                                            <td>
                                                                {
                                                                    contract.branchName
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contract?.contractNumber
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contract?.contractStartDate
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contract?.contractEndDate
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contract?.advancePayment
                                                                }
                                                            </td>
                                                            <td>
                                                                {contract?.initalDirectCost ||
                                                                    '0.00'}
                                                            </td>
                                                            <td>
                                                                {contract?.leaseIncentive ||
                                                                    '0.00'}
                                                            </td>
                                                            <td>
                                                                {
                                                                    contract?.totalPayment
                                                                }
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className={`btn ${
                                                                        contract.authorization
                                                                            ? 'btn-outline-primary'
                                                                            : 'btn-outline-warning'
                                                                    }`}
                                                                >
                                                                    {contract.authorization
                                                                        ? 'Authorized'
                                                                        : 'Unauthorized'}
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <div className='dropdown dropstart'>
                                                                    <button
                                                                        className='btn btn-secondary dropdown-toggle'
                                                                        type='button'
                                                                        id='dropdownMenuButton2'
                                                                        data-bs-toggle='dropdown'
                                                                        aria-expanded='false'
                                                                    >
                                                                        Action
                                                                    </button>

                                                                    <ul
                                                                        style={{
                                                                            zIndex: '9',
                                                                        }}
                                                                        className='dropdown-menu dropdown-menu-dark'
                                                                        aria-labelledby='dropdownMenuButton2'
                                                                    >
                                                                        <li>
                                                                            <a
                                                                                className='dropdown-item'
                                                                                href='#'
                                                                            >
                                                                                <i className='fa fa-info-circle me-2'></i>
                                                                                View
                                                                                Details
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className='dropdown-item'
                                                                                href='#'
                                                                            >
                                                                                <i className='fa fa-edit me-2'></i>
                                                                                Update
                                                                            </a>
                                                                        </li>

                                                                        <li>
                                                                            <hr className='dropdown-divider' />
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className='dropdown-item'
                                                                                href='#'
                                                                                data-bs-toggle='modal'
                                                                                data-bs-target='#modal'
                                                                                onClick={() =>
                                                                                    setTobeDeleted(
                                                                                        contract?.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className='fa fa-trash me-2'></i>{' '}
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='container-fluid pt-4 px-4'>
                        <div
                            className='row bg-light rounded d-felx mx-0 text-center align-items-center'
                            style={{ minHeight: '600px' }}
                        >
                            <h3 className='justify-self-center'>
                                No Contracts data found
                            </h3>
                        </div>
                    </div>
                ))}
            {!isLoading && errors?.message && (
                <div className='container-fluid pt-4 px-4'>
                    <div
                        className='row bg-light rounded align-items-center justify-content-center mx-0'
                        style={{ minHeight: '600px' }}
                    >
                        <div className='col-md-6 text-center'>
                            <div
                                className='alert alert-secondary d-flex align-items-center justify-content-center'
                                role='alert'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='currentColor'
                                    className='bi bi-exclamation-triangle-fill flex-shrink-0 me-2'
                                    viewBox='0 0 16 16'
                                    role='img'
                                    aria-label='Warning:'
                                >
                                    <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                                </svg>
                                <div>{errors?.message}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListContracts;
