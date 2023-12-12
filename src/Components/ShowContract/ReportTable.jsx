import FormatDate from '../../utils/FormatDate';
import numeral from 'numeral';
import PropTypes from 'prop-types';

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
                            <th scope='col' colSpan='2'>
                                Contract Months
                            </th>
                            <th scope='col'>
                                {contracts.length &&
                                    contracts[0]?.detail[0]?.contractMonth}{' '}
                                Months
                            </th>
                        </tr>
                        <tr>
                            <th scope='col' colSpan='2'>
                                DEPRECIATION PER MONTH
                            </th>
                            <th scope='col'>
                                {' '}
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
                            <th>Month</th>
                            <th>Deprecitation Expense</th>
                            <th>Summation</th>
                        </tr>
                        {contracts?.map((contract) => {
                            let sum = 0;
                            return contract.report.map((report, index) => {
                                sum += report?.deprecationExp;
                                return (
                                    <tr key={index}>
                                        <td scope='row'>
                                            {FormatDate(report?.year)}
                                        </td>
                                        <td>
                                            {report?.deprecationExp === 0
                                                ? '-'
                                                : numeral(
                                                      report?.deprecationExp
                                                  ).format('0,0.00')}
                                        </td>

                                        <td>{numeral(sum).format('0,0.00')}</td>
                                    </tr>
                                );
                            });
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

ReportTable.propTypes = {
    contracts: PropTypes.array.isRequired,
};

export default ReportTable;
