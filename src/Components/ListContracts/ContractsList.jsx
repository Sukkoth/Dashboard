import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContractsList = ({ contractsData, setTobeDeleted }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    let filteredData = contractsData;

    if (startDate.length === 4) {
        const filterStartDate = new Date(`01/01/${startDate}`);
        filteredData = filteredData.filter((data) => {
            const contractStartDate = new Date(
                data.contractRegisteredDate
            ).getFullYear();
            if (filterStartDate.getFullYear() === contractStartDate)
                return true;
        });
    }

    //filter based on end date
    if (endDate.length === 4) {
        const filterEndDate = new Date(`01/01/${endDate}`);
        filteredData = filteredData.filter((data) => {
            const contractEndDate = new Date(
                data.contractEndDate
            ).getFullYear();
            if (filterEndDate.getFullYear() === contractEndDate) return true;
        });
    }

    return (
        <div
            className='container-fluid pt-4 px-4 take-screen'
            style={{ backgroundColor: '#f2f7ff' }}
        >
            <div className='row g-4' style={{ minHeight: '500px' }}>
                <div className='col-12'>
                    <div className='bg-white rounded h-100 p-4'>
                        <h6 className='mb-4 h4' style={{ fontWeight: 'bold' }}>
                            Contracts List ({filteredData.length || 0})
                        </h6>
                        <form action=''>
                            <div className='row my-3'>
                                <div className='col-2'>
                                    <label htmlFor='regionName mt-2'>
                                        Contract Registration Date
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='col-2'>
                                    <label htmlFor='regionName mt-2'>
                                        Contract End Date
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>
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
                                        <th scope='col'>
                                            Contract Registered Date
                                        </th>
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
                                    {filteredData.map((contract, index) => (
                                        <tr key={contract.id}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{contract.branch_id}</td>
                                            <td>
                                                {
                                                    contract?.contractRegisteredDate
                                                }
                                            </td>
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
                                                            <Link
                                                                to={`/report/${contract?.id}`}
                                                                className='dropdown-item'
                                                            >
                                                                <i className='fa fa-scroll me-2'></i>
                                                                View Report
                                                            </Link>
                                                        </li>

                                                        {/* <li>
                                                            <a
                                                                className='dropdown-item'
                                                                href='#'
                                                            >
                                                                <i className='fa fa-edit me-2'></i>
                                                                Update
                                                            </a>
                                                        </li> */}

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

ContractsList.propTypes = {
    contractsData: PropTypes.array,
    setTobeDeleted: PropTypes.func,
};

export default ContractsList;
