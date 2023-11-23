import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

//table starts
import { Table, Pagination, Dropdown } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
//table ends

const ContractsList = ({ contractsData, setTobeDeleted }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    //table starts

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

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

    /**
     * @description  Sort the given filtered data and then paginate them
     * @returns {object}
     */

    const getData = () => {
        if (sortColumn && sortType) {
            return filteredData
                .sort((a, b) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];
                    if (typeof x === 'string') {
                        /**
                         * This confition checks if the given string is a date
                         * e.g. 01-01-2023 length = 10, when you split using - it's length is 3 hence a date
                         * Then sort using the date
                         */
                        if (x.length === 10 && x.split('-').length === 3) {
                            const dateA = new Date(x);
                            const dateB = new Date(y);
                            return sortType === 'asc'
                                ? dateA - dateB
                                : dateB - dateA;
                        }
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                })
                .filter((v, i) => {
                    const start = limit * (page - 1);
                    const end = start + limit;
                    return i >= start && i < end;
                });
        }
        return filteredData.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
    };

    const AuthButton = ({ rowData, dataKey, ...props }) => (
        <Cell
            {...props}
            style={{
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <button
                className={`btn ${
                    rowData[dataKey]
                        ? 'btn-outline-primary p-2 px-4 m-2'
                        : 'btn-outline-warning p-2 px-4 m-2'
                }`}
                // style={{ padding: '0.3rem 1rem', marginTop: '0' }}
            >
                {rowData[dataKey] ? 'Authorized' : 'Unauthorized'}
            </button>
        </Cell>
    );

    const ActionCell = ({ rowData, dataKey, text, link, type, ...props }) => (
        <Cell
            {...props}
            style={{
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Link
                className={`btn btn-${type || 'primary p-2 px-4 m-2'}`}
                to={`/${link}/${rowData[dataKey]}`}
            >
                {text}
            </Link>
        </Cell>
    );

    return (
        <div className='container-fluid take-screen p-3 pb-3'>
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
                            onChange={(e) => setStartDate(e.target.value)}
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
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <Table
                cellBordered
                height={520}
                data={getData()}
                autoHeight={true}
                className='bg-white p-1 pb-3'
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            >
                <Column flexGrow={1} align='center' fixed>
                    <HeaderCell>ID</HeaderCell>
                    <Cell dataKey='id' />
                </Column>

                <Column flexGrow={3} sortable resizable>
                    <HeaderCell>Registered Date</HeaderCell>
                    <Cell dataKey='contractRegisteredDate' />
                </Column>
                <Column flexGrow={3} sortable>
                    <HeaderCell>Start Date</HeaderCell>
                    <Cell dataKey='contractStartDate' />
                </Column>

                <Column flexGrow={3} sortable>
                    <HeaderCell>End Date</HeaderCell>
                    <Cell dataKey='contractEndDate' />
                </Column>
                <Column flexGrow={3} resizable>
                    <HeaderCell>Advance Payment</HeaderCell>
                    <Cell dataKey='advancePayment' />
                </Column>
                <Column flexGrow={3} sortable>
                    <HeaderCell>Contract Type</HeaderCell>
                    <Cell dataKey='contractType' defaultValue={0} />
                </Column>
                <Column flexGrow={3}>
                    <HeaderCell>Lease Incentive</HeaderCell>
                    <Cell dataKey='leaseIncentive' defaultValue={0} />
                </Column>

                <Column flexGrow={3} resizable>
                    <HeaderCell>Total Payment</HeaderCell>
                    <Cell dataKey='totalPayment' />
                </Column>
                <Column flexGrow={3} sortable>
                    <HeaderCell>Authorization</HeaderCell>
                    <AuthButton dataKey='authorization' />
                </Column>
                <Column flexGrow={2}>
                    <HeaderCell>Report</HeaderCell>
                    <ActionCell dataKey='id' link='report' text='Report' />
                </Column>
                <Column flexGrow={2}>
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell
                        dataKey='id'
                        link='leases'
                        text='Details'
                        type='warning'
                    />
                </Column>
            </Table>
            <div className='container-fluid pt-4 px-4'>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size='lg'
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={filteredData.length}
                    limitOptions={[5, 10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
};

ContractsList.propTypes = {
    contractsData: PropTypes.array,
    setTobeDeleted: PropTypes.func,
};

export default ContractsList;
