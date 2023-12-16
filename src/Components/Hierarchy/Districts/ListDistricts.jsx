import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../../Pagination/Pagination';
import LargeAlert from '../../ListContracts/Alerts/LargeAlert';

const ListDistricts = ({ districtData, fetchData }) => {
    if (districtData?.districts?.length === 0) {
        return (
            <LargeAlert isLoading={false} message={'No Districts data found'} />
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
                            <h6 className='h3 fw-bold mb-4'>Districts List</h6>
                            <div className='table-responsive mb-3'>
                                <table className='table list-table table-bordered '>
                                    <thead>
                                        <tr>
                                            <th scope='col'>ID</th>
                                            <th scope='col'>District Name</th>
                                            <th scope='col'>Region Name</th>
                                            <th scope='col'>
                                                Lease Liability Account
                                            </th>
                                            <th scope='col'>ROU Account</th>
                                            <th scope='col'>Branches</th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {districtData?.districts?.map(
                                            (district, index) => (
                                                <tr key={district.districtId}>
                                                    <th>{index + 1}</th>
                                                    <td>
                                                        {district.districtName}
                                                    </td>
                                                    <td>
                                                        {
                                                            district?.region
                                                                ?.regionName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            district?.leaseLiabilityAccount
                                                        }
                                                    </td>
                                                    <td>
                                                        {district?.rouAccount}
                                                    </td>
                                                    <td>
                                                        {district?.branchCount}
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
                                                                        to={`/hierarchy/districts/${district?.districtId}`}
                                                                        className='dropdown-item'
                                                                    >
                                                                        <i className='fa fa fa-edit me-2 me-2'></i>
                                                                        Update
                                                                    </Link>
                                                                </li>
                                                                {/* <li>
                                                                    <Link
                                                                        to={`/hierarchy/districts/${district?.districtId}/delete`}
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
                                pagination={districtData?.pagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
};

ListDistricts.propTypes = {
    districtData: PropTypes.object,
    setTobeDeleted: PropTypes.func,
    fetchData: PropTypes.func,
};

export default ListDistricts;
