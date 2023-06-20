import React from 'react';
import FormatDate from '../../../utils/formatDate';

const Journal = ({ contracts }) => {
    console.log(contracts);

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
                            ROU..............................1,753,729.48
                        </p>
                        <p className='mx-4 fst-italic'>
                            Cash ........................... 1,111,453.20
                        </p>
                        <p className='mx-5 fst-italic'>
                            Lease Liability...........................
                            642,276.28
                        </p>
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
                                        {report.deprecationExp}
                                    </p>
                                    <p className='mx-5 fst-italic'>
                                        Acc.
                                        Dep...........................314,230
                                    </p>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Journal;
