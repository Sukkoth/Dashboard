import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../Pagination/Pagination';
import numeral from 'numeral';
import LargeAlert from './Alerts/LargeAlert';

function Menu({ children, name, handleChange }) {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <th
      scope='col'
      onClick={() => handleChange(name)}
      style={{ padding: '0', textAlign: 'center', position: 'relative' }}
    >
      <div className='table-menu'>
        <span>{children}</span>
        <span>
          {searchParams.get('sortBy') === name ? (
            searchParams.get('sortOrder') === 'desc' ? (
              <i className='fas fa-arrow-down'></i>
            ) : (
              <i className='fas fa-arrow-up'></i>
            )
          ) : (
            ''
          )}
        </span>
      </div>
    </th>
  );
}

const ContractsList = ({ contractsData, fetchData }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleChangeSortBy(sortBy) {
    //if same name, change only order
    if (sortBy === searchParams.get('sortBy')) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(
          'sortOrder',
          prevSearchParams.get('sortOrder') === 'asc' ? 'desc' : 'asc'
        );
        return prevSearchParams;
      });
    }
    //else change sortBy and also the order to asc
    else {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set('sortBy', sortBy);
        prevSearchParams.set('sortOrder', 'asc');
        return prevSearchParams;
      });
    }

    if (!searchParams.get('size')) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set('size', 25);
        return prevSearchParams;
      });
    }

    console.log('PARAMS', Object.fromEntries(searchParams.entries()));

    fetchData({
      params: {
        ...Object.fromEntries(searchParams.entries()),
        page: 1,
      },
    });
  }

  if (contractsData?.leases?.length === 0) {
    return <LargeAlert isLoading={false} message={'No Contracts data found'} />;
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
                      <Menu name='branchName' handleChange={handleChangeSortBy}>
                        Branch Name
                      </Menu>
                      <Menu
                        name='contractRegisteredDate'
                        handleChange={handleChangeSortBy}
                      >
                        Registered Date
                      </Menu>
                      <Menu
                        name='contractStartDate'
                        handleChange={handleChangeSortBy}
                      >
                        Start Date
                      </Menu>
                      <Menu
                        name='contractEndDate'
                        handleChange={handleChangeSortBy}
                      >
                        End Date
                      </Menu>
                      <th scope='col'>Advance Payment</th>
                      <th scope='col'>Initial Directive Cost</th>
                      <th scope='col'>Lease Incentive</th>
                      <th scope='col'>Lease Liability</th>
                      <th scope='col'>Total Payament</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractsData?.leases?.map((contract, index) => (
                      <tr key={contract.id}>
                        <th>{index + 1}</th>
                        <td>{contract.branchName}</td>
                        <td>{contract?.contractRegisteredDate}</td>
                        <td>{contract?.contractStartDate}</td>
                        <td>{contract?.contractEndDate}</td>
                        <td>
                          {numeral(contract?.advancePayment).format('0,0.00')}
                        </td>
                        <td>
                          {numeral(contract?.initalDirectCost).format('0,0.00')}
                        </td>
                        <td>
                          {numeral(contract?.leaseIncentive).format('0,0.00')}
                        </td>
                        <td>
                          {numeral(contract?.leaseLiability).format('0,0.00')}
                        </td>
                        <td>
                          {numeral(contract?.totalPayment).format('0,0.00')}
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
                              <li>
                                <hr className='dropdown-divider' />
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
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
  sortOrder: PropTypes.string,
  setSortOrder: PropTypes.func,
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
};

Menu.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  sortOrder: PropTypes.string,
  sortBy: PropTypes.string,
};

export default ContractsList;
