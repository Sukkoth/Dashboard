const ReportTable = ({ contracts }) => {
    return (
        <>
            <h6 className='mb-4'>Report Table</h6>
            <div className='table-responsive mb-5'>
                <table className='table table-hover table-bordered text-center'>
                    <thead>
                        <tr>
                            <th scope='col' colSpan='3'>
                                Contract Months
                            </th>
                            <th scope='col'>60 Months</th>
                        </tr>
                        <tr>
                            <th scope='col' colSpan='3'>
                                DEPRECIATION PER MONTH
                            </th>
                            <th scope='col'>23947382</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan='4' className='bg-secondary'></th>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <th>Balance</th>
                            <th>Deprecitation Exp</th>
                            <th>Months</th>
                        </tr>
                        {contracts.map((contract) =>
                            contract.report.map((report, index) => (
                                <tr key={index}>
                                    <th scope='row'>{report?.year}</th>
                                    <td>{report?.balance}</td>
                                    <td>{report?.deprecationExp}</td>
                                    <td>{report?.months || '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ReportTable;
