import React from 'react';
import { Link } from 'react-router-dom';

const ContractsList = ({ contractsData, setTobeDeleted }) => {
    return (
        <div className='container-fluid pt-4 px-4'>
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
                                        <th scope='col'>Branch Name</th>
                                        <th scope='col'>Contract Number</th>
                                        <th scope='col'>Contract Start Date</th>
                                        <th scope='col'>Contract End Date</th>
                                        <th scope='col'>Advance Payment</th>
                                        <th scope='col'>
                                            Initial Directive Cost
                                        </th>
                                        <th scope='col'>Lease Incentive</th>
                                        <th scope='col'>Total Payament</th>
                                        <th scope='col'>Authorization</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contractsData.map((contract, index) => (
                                        <tr key={contract.id}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{contract.branchName}</td>
                                            <td>{contract?.contractNumber}</td>
                                            <td>
                                                {contract?.contractStartDate}
                                            </td>
                                            <td>{contract?.contractEndDate}</td>
                                            <td>{contract?.advancePayment}</td>
                                            <td>
                                                {contract?.initalDirectCost ||
                                                    '0.00'}
                                            </td>
                                            <td>
                                                {contract?.leaseIncentive ||
                                                    '0.00'}
                                            </td>
                                            <td>{contract?.totalPayment}</td>
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
                                                            <Link
                                                                to={`/leases/${contract?.id}`}
                                                                className='dropdown-item'
                                                            >
                                                                <i className='fa fa-info-circle me-2'></i>
                                                                View Details
                                                            </Link>
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractsList;
