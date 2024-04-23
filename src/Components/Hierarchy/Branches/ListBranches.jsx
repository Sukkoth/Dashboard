import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../../Pagination/Pagination';
import LargeAlert from '../../ListContracts/Alerts/LargeAlert';
import Menu from '../../TableMenu';

const ListBranches = ({ branchData, fetchData, setTobeDeleted }) => {
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

    fetchData({
      params: {
        ...Object.fromEntries(searchParams.entries()),
        page: 1,
      },
    });
  }

  if (branchData?.branch?.length === 0) {
    return <LargeAlert isLoading={false} message={'No branchs data found'} />;
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
                      <Menu name='branchName' handleChange={handleChangeSortBy}>
                        Branch Name
                      </Menu>
                      <Menu name='branchCode' handleChange={handleChangeSortBy}>
                        Company Code
                      </Menu>
                      <Menu name='costCenter' handleChange={handleChangeSortBy}>
                        Cost Center
                      </Menu>
                      <Menu name='location' handleChange={handleChangeSortBy}>
                        Location
                      </Menu>
                      <Menu
                        name='claimAccount'
                        handleChange={handleChangeSortBy}
                      >
                        Claim Account
                      </Menu>
                      <Menu
                        name='district.districtName'
                        handleChange={handleChangeSortBy}
                      >
                        District Name
                      </Menu>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchData?.branches?.map((branch, index) => (
                      <tr key={branch.branchId}>
                        <th>{index + 1}</th>
                        <td>{branch.branchName}</td>

                        <td>{branch?.branchCode}</td>
                        <td>{branch?.costCenter}</td>
                        <td>{branch?.location}</td>
                        <td>{branch?.claimAccount}</td>
                        <td>{branch?.district.districtName}</td>

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
                              <li>
                                <a
                                  className='dropdown-item'
                                  href='#'
                                  data-bs-toggle='modal'
                                  data-bs-target='#modal'
                                  onClick={() => {
                                    setTobeDeleted(branch.branchId);
                                  }}
                                >
                                  <i className='fa fa-trash me-2'></i> Delete
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
