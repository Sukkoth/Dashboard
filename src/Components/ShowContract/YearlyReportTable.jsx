import FormatDate from '../../utils/FormatDate';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const YearlyReportTable = ({ contracts }) => {
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
                                Contract Year
                            </th>
                            <th scope='col'>
                                {contracts.length &&
                                    contracts[0]?.detail[0]?.contractYear}{' '}
                                Years
                            </th>
                        </tr>
                        <tr>
                            <th scope='col' colSpan='3'>
                                DEPRECIATION PER YEAR
                            </th>
                            <th scope='col'>
                                {numeral(
                                    contracts[0]?.detail[0]
                                        ?.depreciationPerMonth
                                ).format('0,0.00')}
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
                            <th>Remaining Months</th>
                        </tr>
                        {contracts?.map((contract) =>
                            contract.report.map((report, index) => (
                                <tr key={index}>
                                    <td scope='row'>
                                        {FormatDate(report?.year)}
                                    </td>
                                    <td>
                                        {report?.balance === 0
                                            ? ' - '
                                            : numeral(report?.balance).format(
                                                  '0,0.00'
                                              )}
                                    </td>
                                    <td>
                                        {report?.deprecationExp === 0
                                            ? '-'
                                            : numeral(
                                                  report?.deprecationExp
                                              ).format('0,0.00')}
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

YearlyReportTable.propTypes = {
    contracts: PropTypes.array.isRequired,
};

export default YearlyReportTable;
