import numeral from 'numeral';
import FormatDate from '../../../utils/FormatDate.js';
import PropTypes from 'prop-types';

const Journal = ({ contracts }) => {
    const sum = contracts[0].report.reduce((sum, report) => {
        return sum + report.deprecationExp;
    }, 0);

    return (
        <div className='container-fluid pt-4 px-4'>
            <div
                className='row bg-light rounded justify-content-center mx-0'
                id='journal'
                style={{ minHeight: '600px' }}
            >
                <div className='mt-5 text-start px-5 text-dark'>
                    <h2>Journal Entry</h2>

                    {/*  FIRST PART */}
                    <div className='intro'>
                        <p>
                            Initially at the commencement date, as of
                            07-AUG-2021
                        </p>
                        <p className='mx-3 fw-bold'>
                            ROU..............................{' '}
                            {numeral(contracts[0].detail[0].rightOfUse).format(
                                '0,0.00'
                            )}
                        </p>
                        <p className='mx-4 fst-italic'>
                            Cash ...........................{' '}
                            {numeral(
                                contracts[0].detail[0].rightOfUse -
                                    contracts[0]?.detail[0]?.leaseLiability
                            ).format('0,0.00')}
                        </p>
                        {contracts[0]?.detail[0]?.leaseLiability > 0 && (
                            <p className='mx-5 fst-italic'>
                                Lease Liability...........................
                                {numeral(
                                    contracts[0]?.detail[0]?.leaseLiability
                                ).format('0,0.00')}
                            </p>
                        )}
                    </div>

                    <p>
                        At the end of June 30 through out the contract period,
                        the entry will be as follows
                    </p>

                    {/* SECOND PART */}

                    {contracts[0].report.map((report, index) => {
                        //! You are jumpig over the first index, take a loot at this later
                        return (
                            index != 0 && (
                                <div className='periodEntry' key={index}>
                                    <p className='mx-3 fw-bold'>
                                        As of {FormatDate(report?.year)}
                                    </p>
                                    <p className='mx-4 fst-italic'>
                                        Depreciation
                                        Expense...........................
                                        {numeral(report.deprecationExp).format(
                                            '0,0.00'
                                        )}
                                        {}
                                    </p>
                                </div>
                            )
                        );
                    })}

                    <table className='table-success text-center'>
                        <thead>
                            <tr>
                                <th colSpan='2' style={rouTitle}>
                                    ROU
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts[0].report.map(
                                (report, index) =>
                                    index != 0 && (
                                        <tr
                                            key={index}
                                            style={
                                                index ==
                                                contracts[0].report.length - 1
                                                    ? tableBottom
                                                    : {}
                                            }
                                        >
                                            <td style={rouLeftStyle}>
                                                {numeral(
                                                    report?.deprecationExp
                                                ).format('0,0.00')}
                                            </td>
                                            {index == 1 && (
                                                <td style={rouRightStyle}>
                                                    {numeral(
                                                        contracts[0].detail[0]
                                                            .rightOfUse
                                                    ).format('0,0.00')}
                                                </td>
                                            )}
                                        </tr>
                                    )
                            )}

                            <tr>
                                <td>{numeral(sum).format('0,0.00')}</td>
                                <td> {contracts[0].detail[0].rightOfUse}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* {contracts[0]?.detail[0].advancePayment !==
                    contracts[0]?.detail[0].totalPayment && (
                    <div className='mt-5 text-start px-5 text-dark'>
                        <h2>The Finance charge.</h2>

                        {contracts[0].ammortization.map((report, index) => {
                            //! You are jumpig over the first index, take a loot at this later
                            return (
                                index != 0 && (
                                    <div className='periodEntry' key={index}>
                                        <p className='mx-3 fw-bold'>
                                            As of {FormatDate(report?.year)}
                                        </p>
                                        <p className='mx-4 fst-italic'>
                                            Finance Lease Charge
                                            ...........................
                                            {report?.interest}
                                        </p>
                                        <p>
                                            Lease
                                            Liability...........................
                                            {report?.interest}
                                        </p>
                                    </div>
                                )
                            );
                        })}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Journal;

const rouLeftStyle = {
    borderRight: 'solid 1px',
    padding: '5px 30px 10px 10px',
};

const rouRightStyle = {
    padding: '5px 30px 10px 10px',
};

const rouTitle = {
    borderBottom: 'solid 1px',
    padding: '15px 0 5px 0',
};

const tableBottom = {
    borderBottom: 'solid 1px',
};

Journal.propTypes = {
    contracts: PropTypes.array.isRequired,
};
