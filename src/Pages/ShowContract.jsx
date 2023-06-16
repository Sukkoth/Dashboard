import useApiFetch from '../API/useApiFetch';

const ShowContract = () => {
    const { data, isLoading, error } = useApiFetch({
        url: '/leases/report/yearly/26',
        method: 'get',
    });

    if (data) {
        console.log(data);
    }

    return (
        <div className='container-fluid pt-4 px-4'>
            <div className='row g-4' style={{ minHeight: '500px' }}>
                <div className='col-12'>
                    <div className='bg-light rounded h-100 p-4'>
                        <h6 className='mb-4'>Contracts List</h6>
                        {/* <div className='table-responsive mb-5'>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <td colSpan='3'>Contract Months</td>
                                        <td colSpan='3'>60 Month</td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            Depreciation Per Month
                                        </td>
                                        <td colSpan='3'>29,228.82</td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td colSpan='3'></td>
                                    </tr>

                                    <tr>
                                        <th>Year</th>
                                        <th>Balance</th>
                                        <th>Depreciation Exp</th>
                                        <th colSpan='3'>Months</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td colSpan='3'></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td colSpan='3'></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td colSpan='3'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}

                        <div class='col-sm-12 col-xl-6'>
                            <div class='bg-light rounded h-100 p-4'>
                                <h6 class='mb-4'>Ammortization Table</h6>
                                <table class='table table-hover table-bordered text-center'>
                                    <thead>
                                        <tr>
                                            <th scope='col' colSpan='3'>
                                                Contract Months
                                            </th>
                                            <th scope='col' colSpan='1'>
                                                60 Months
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope='col' colSpan='3'>
                                                DEPRECIATION PER MONTH
                                            </th>
                                            <th scope='col' colSpan='1'>
                                                23947382
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Year</td>
                                            <td>Balance</td>
                                            <td>Deprecitation Exp</td>
                                            <td>jhon@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>2</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>mark@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class='col-sm-12 col-xl-6'>
                            <div class='bg-light rounded h-100 p-4'>
                                <h6 class='mb-4'>Ammortization Table</h6>
                                <table class='table table-hover table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Period</th>
                                            <th scope='col'>Year</th>
                                            <th scope='col'>Payments</th>
                                            <th scope='col'>Interest</th>
                                            <th scope='col'>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope='row'>1</th>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>jhon@email.com</td>
                                            <td>jhon@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>2</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>mark@email.com</td>
                                            <td>mark@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>jacob@email.com</td>
                                            <td>jacob@email.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowContract;
