import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../Pagination/Pagination';
import numeral from 'numeral';
import LargeAlert from './Alerts/LargeAlert';

const ContractsList = ({ contractsData, fetchData }) => {
    if (contractsData?.leases?.length === 0) {
        return (
            <LargeAlert isLoading={false} message={'No Contracts data found'} />
        );
    } else
        return (
            <div className='container-fluid take-screen p-3 pb-3'>
                <div className='row g-4 ' style={{ minHeight: '500px' }}>
                    <div className='col-12'>
                        <div
                            className='bg-white rounded h-100 p-4'
                            style={{ minHeight: '80vh' }}
                        >
                            <h6 className='h3 fw-bold mb-4'>Contracts List</h6>
                            <div className='table-responsive mb-3'>
                                <table className='table list-table table-bordered '>
                                    <thead>
                                        <tr>
                                            <th scope='col'>ID</th>
                                            <th scope='col'>Branch Name</th>
                                            <th scope='col'>Registered Date</th>
                                            <th scope='col'>Start Date</th>
                                            <th scope='col'>End Date</th>
                                            <th scope='col'>Advance Payment</th>
                                            <th scope='col'>
                                                Initial Directive Cost
                                            </th>
                                            <th scope='col'>Lease Incentive</th>
                                            <th scope='col'>Lease Liability</th>
                                            <th scope='col'>Total Payament</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contractsData?.leases?.map(
                                            (contract, index) => (
                                                <tr key={contract.id}>
                                                    <th>{index + 1}</th>
                                                    <td>
                                                        {contract.branchName}
                                                    </td>
                                                    <td>
                                                        {
                                                            contract?.contractRegisteredDate
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
                                                        {numeral(
                                                            contract?.advancePayment
                                                        ).format('0,0.00')}
                                                    </td>
                                                    <td>
                                                        {numeral(
                                                            contract?.initalDirectCost
                                                        ).format('0,0.00')}
                                                    </td>
                                                    <td>
                                                        {numeral(
                                                            contract?.leaseIncentive
                                                        ).format('0,0.00')}
                                                    </td>
                                                    <td>
                                                        {numeral(
                                                            contract?.leaseLiability
                                                        ).format('0,0.00')}
                                                    </td>
                                                    <td>
                                                        {numeral(
                                                            contract?.totalPayment
                                                        ).format('0,0.00')}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className={`btn mx-auto ${
                                                                contract.authorization
                                                                    ? 'btn-outline-primary mx-auto'
                                                                    : 'btn-outline-warning'
                                                            }`}
                                                        >
                                                            {contract.authorization
                                                                ? 'Authorized'
                                                                : 'Unauthorized'}
                                                        </button>
                                                    </td>
                                                    <td className='d-flex align-items-center justify-content-center'>
                                                        <div className='dropdown dropstart'>
                                                            <button
                                                                className='btn btn-primary dropdown-toggle'
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
                                                                        View
                                                                        Details
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        to={`/report/${contract?.id}`}
                                                                        className='dropdown-item'
                                                                    >
                                                                        <i className='fa fa-scroll me-2'></i>
                                                                        View
                                                                        Report
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
                                                                {/* <li>
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
                                                            </li> */}
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                fetchData={fetchData}
                                pagination={contractsData?.pagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
};

ContractsList.propTypes = {
    contractsData: PropTypes.object,
    setTobeDeleted: PropTypes.func,
    fetchData: PropTypes.func,
};

export default ContractsList;
