import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

function Pagination({ fetchData, pagination }) {
    let [searchParams, setSearchParams] = useSearchParams();
    const path = window.location.pathname.split('/');

    function handlePageChange(page) {
        fetchData({
            params: {
                page: page,
                size: pagination.pageSize,
                startYear: searchParams.get('startYear'),
                endYear: searchParams.get('endYear'),
            },
        });
    }

    function handleSizeChange(pageSize) {
        fetchData({
            params: {
                page: 1,
                size: pageSize,
                startYear: searchParams.get('startYear'),
                endYear: searchParams.get('endYear'),
            },
        });
    }

    if (path[path.length - 1] === 'search') return; //you won't need this on search results

    return (
        <div className='d-flex flex-row justify-content-between mx-5 align-items-center'>
            <div>
                <p className='fw-bold'>
                    Total Contracts: {pagination?.totalResults}
                </p>
            </div>
            <div className='d-flex align-items-center' style={{ gap: '2rem' }}>
                <select
                    className='form-select my-2'
                    style={{ width: '8rem' }}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    value={pagination?.pageSize}
                >
                    <option value='10'>10/page</option>
                    <option value='25'>25/page</option>
                    <option value='50'>50/page</option>
                    <option value='100'>100/page</option>
                    <option value='1000'>1000/page</option>
                </select>

                {/* FIRST PAGE */}
                <button
                    className={`btn btn-outline-${
                        pagination?.currentPage === 1 ? 'danger' : 'primary'
                    } pagination-btn`}
                    title='First Page'
                    onClick={() => handlePageChange(1)}
                    disabled={pagination?.currentPage === 1}
                >
                    <i className='fa fa-chevron-left'></i>{' '}
                    <i className='fa fa-chevron-left'></i>
                </button>
                {/* FIRST PAGE */}

                {/* PREVIOUS PAGE */}
                {pagination?.currentPage > 1 && (
                    <button
                        className='btn btn-outline-primary pagination-btn'
                        onClick={() =>
                            handlePageChange(pagination?.currentPage - 1)
                        }
                    >
                        {pagination?.previousPage}
                    </button>
                )}
                {/* PREVIOUS PAGE */}

                {/* CURRENT PAGE */}
                <button className='btn btn-primary pagination-btn'>
                    {pagination?.currentPage}
                </button>
                {/* CURRENT PAGE */}

                {/*  NEXT PAGE */}
                {pagination?.currentPage < pagination?.lastPage && (
                    <button
                        title={`Page ${pagination?.nextPage}`}
                        className='btn btn-outline-primary pagination-btn'
                        onClick={() => handlePageChange(pagination.nextPage)}
                    >
                        {pagination?.nextPage}
                    </button>
                )}
                {/* NEXT PAGE */}

                {/* LAST PAGE */}
                <button
                    className={`btn btn-outline-${
                        pagination?.lastPage === pagination?.currentPage
                            ? 'danger'
                            : 'primary'
                    }  pagination-btn`}
                    disabled={pagination?.lastPage === pagination?.currentPage}
                    title='Last Page'
                    onClick={() => handlePageChange(pagination.lastPage)}
                >
                    <i className='fa fa-chevron-right'></i>{' '}
                    <i className='fa fa-chevron-right'></i>
                </button>
                {/* LAST PAGE */}
            </div>
        </div>
    );
}

Pagination.propTypes = {
    fetchData: PropTypes.func,
    pagination: PropTypes.object,
};
export default Pagination;
