import numeral from 'numeral';
import FormatDate from '../../utils/FormatDate';
import PropTypes from 'prop-types';

const SummaryTable = ({ contracts }) => {
    if (!contracts?.length) return;

    const mergedData = {};

    contracts[0].summaryArray?.forEach((summary) => {
        if (summary.year === '-') return;
        if (summary?.deprecationExp !== undefined) {
            mergedData[summary.year] = {
                ...mergedData[summary.year],
                report: summary,
            };
        } else if (summary?.interestExpence !== undefined) {
            mergedData[summary.year] = {
                ...mergedData[summary.year],
                ammortization: summary,
            };
        }
    });

    return (
        <>
            <h6 className='mb-4'>Summary Table</h6>

            <div className='table-responsive mb-5'>
                <table
                    className='table table-hover table-bordered text-center'
                    id='reportTable'
                >
                    <tbody>
                        <tr>
                            <th colSpan='6' className='bg-secondary'></th>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <th>ROU</th>
                            <th>Lease Liability</th>
                            <th>Dep Expense</th>
                            <th>Finance Charge</th>
                            <th>Payment</th>
                        </tr>
                        {Object.keys(mergedData).map((year, index) => (
                            <tr key={index}>
                                <td scope='row'>
                                    {year === '-' ? '-' : FormatDate(year)}
                                </td>
                                <td>
                                    {numeral(
                                        mergedData[year]?.report?.balance
                                    ).format('0,0.00')}
                                </td>
                                <td>
                                    {numeral(
                                        mergedData[year]?.ammortization?.balance
                                    ).format('0,0.00')}
                                </td>
                                <td>
                                    {numeral(
                                        mergedData[year]?.report?.deprecationExp
                                    ).format('0,0.00')}
                                </td>
                                <td>
                                    {numeral(
                                        mergedData[year]?.ammortization
                                            ?.interestExpence
                                    ).format('0,0.00')}
                                </td>
                                <td>
                                    {numeral(
                                        mergedData[year]?.ammortization
                                            ?.leasePayment
                                    ).format('0,0.00')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className='table-responsive mb-5'>
                <table
                    className='table table-hover table-bordered text-center'
                    id='reportTable'
                >
                    <tbody>
                        <tr>
                            <th colSpan='6' className='bg-secondary'></th>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <th>ROU</th>
                            <th>Lease Liability</th>
                            <th>Dep Expense</th>
                            <th>Finance Charge</th>
                            <th>Payment</th>
                        </tr>
                        {contracts[0]?.summaryArray?.map((summary, index) => (
                            <tr key={index}>
                                <td scope='row'>
                                    {summary?.year === '-'
                                        ? '-'
                                        : summary?.year}
                                </td>
                                <td>
                                    {summary?.deprecationExp !== undefined &&
                                        summary?.balance}
                                </td>
                                <td>
                                    {summary?.interestExpence !== undefined &&
                                        summary?.balance}
                                </td>
                                <td>
                                    {summary?.deprecationExp !== undefined &&
                                        summary?.deprecationExp}
                                </td>
                                <td>
                                    {' '}
                                    {summary?.interestExpence !== undefined &&
                                        summary?.interestExpence}
                                </td>
                                <td>
                                    {' '}
                                    {summary?.interestExpence !== undefined &&
                                        summary?.leasePayment}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </>
    );
};

SummaryTable.propTypes = {
    contracts: PropTypes.array.isRequired,
};

export default SummaryTable;
