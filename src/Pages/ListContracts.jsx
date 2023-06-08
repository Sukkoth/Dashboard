import React, { useEffect } from 'react';
import useApiFetch from '../API/useApiFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';

const ListContracts = () => {
    const {
        data: contractsData,
        isLoading,
        errors,
    } = useApiFetch({
        url: '/leases',
        method: 'get',
    });

    return (
        <>
            {isLoading && (
                <div className='container-fluid pt-4 px-4'>
                    <div
                        className='row bg-light rounded align-items-center justify-content-center mx-0'
                        style={{ minHeight: '600px' }}
                    >
                        <div className='col-md-6 text-center'>
                            <ScaleLoader size={250} color='#d30fa9' />;
                        </div>
                    </div>
                </div>
            )}
            {!isLoading && !errors?.message && (
                <div className='container-fluid pt-4 px-4'>
                    <div className='row g-4'>
                        <div className='col-12'>
                            <div className='bg-light rounded h-100 p-4'>
                                <h6 className='mb-4'>Contracts List</h6>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>ID</th>
                                                <th scope='col'>Branch Name</th>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contractsData.map((contract) => (
                                                <tr key={contract.id}>
                                                    <th scope='row'>
                                                        {contract.id}
                                                    </th>
                                                    <td>
                                                        {contract.branchName}
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
                                                        {contract?.totalPayment}
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
