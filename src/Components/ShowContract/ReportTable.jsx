import FormatDate from '../../utils/FormatDate';
import numeral from 'numeral';

const ReportTable = ({ contracts }) => {
    return (
        <>
            <h6 className='mb-4'>Report Table</h6>

            <div className='table-responsive mb-5'>
                <table
                    className='table table-hover table-bordered text-center'
                    id='reportTable'
                >
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
                            <th scope='col'>
                                {numeral(23947382).format('0,0.00')}
                            </th>
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
                                    <td scope='row'>
                                        {FormatDate(report?.year)}
                                    </td>
                                    <td>
                                        {numeral(report?.balance).format(
                                            '0,0.00'
                                        )}
                                    </td>
                                    <td>
                                        {numeral(report?.deprecationExp).format(
                                            '0,0'
                                        )}
                                    </td>
                                    <td>
                                        {numeral(report?.months).format(
                                            '0,0.00'
                                        )}
                                    </td>
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
