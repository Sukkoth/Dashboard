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
                        <h6 className='mb-4'>Report for Contract</h6>
                        <div className='table-responsive mb-5'>
                            <table className='table table-bordered text-center'>
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
                                    {/* SPACER */}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td colSpan='3'></td>
                                    </tr>
                                    {/* SPACER END */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowContract;
