import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../../Pagination/Pagination';
import LargeAlert from '../../ListContracts/Alerts/LargeAlert';

const ListBranches = ({ branchData, fetchData }) => {
    if (branchData?.branch?.length === 0) {
        return (
            <LargeAlert isLoading={false} message={'No branchs data found'} />
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
                            <h6 className='h3 fw-bold mb-4'>Branches List</h6>
                            <div className='table-responsive mb-3'>
                                <table className='table list-table table-bordered '>
                                    <thead>
                                        <tr>
                                            <th scope='col'>ID</th>
                                            <th scope='col'>Branch Name</th>
                                            <th scope='col'>Company Code</th>
                                            <th scope='col'>Cost Center</th>
                                            <th scope='col'>Location</th>
                                            <th scope='col'>Claim Account</th>
                                            <th scope='col'>District Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branchData?.branches?.map(
                                            (branch, index) => (
                                                <tr key={branch.branchId}>
                                                    <th>{index + 1}</th>
                                                    <td>{branch.branchName}</td>

                                                    <td>
                                                        {branch?.branchCode}
                                                    </td>
                                                    <td>
                                                        {branch?.costCenter}
                                                    </td>
                                                    <td>{branch?.location}</td>
                                                    <td>
                                                        {branch?.claimAccount}
                                                    </td>
                                                    <td>
                                                        {
                                                            branch?.district
                                                                .districtName
                                                        }
                                                    </td>

                                                    {/* <td>
                                                        <button
                                                            className={`btn mx-auto ${
                                                                branch.
                                                                    ? 'btn-outline-primary mx-auto'
                                                                    : 'btn-outline-warning'
                                                            }`}
                                                        >
                                                            {contract.authorization
                                                                ? 'Authorized'
                                                                : 'Unauthorized'}
                                                        </button>
                                                    </td> */}
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
                                                                        to={`/hierarchy/branches/${branch?.branchId}`}
                                                                        className='dropdown-item'
                                                                    >
                                                                        <i className='fa fa-edit me-2'></i>
                                                                        Update
                                                                    </Link>
                                                                </li>
                                                                {/* <li>
                                                                    <Link
                                                                        to={`/hierarchy/branches/${branch?.branchId}/delete`}
                                                                        className='dropdown-item'
                                                                    >
                                                                        <i className='fa fa-info-circle me-2'></i>
                                                                        Delete
                                                                    </Link>
                                                                </li> */}

                                                                {/* <li>
                                                                    <hr className='dropdown-divider' />
                                                                </li> */}
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
                                pagination={branchData?.pagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
};

ListBranches.propTypes = {
    branchData: PropTypes.object,
    setTobeDeleted: PropTypes.func,
    fetchData: PropTypes.func,
};

export default ListBranches;
