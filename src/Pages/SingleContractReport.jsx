import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportTable from '../Components/ShowContract/ReportTable';
import YearlyReportTable from '../Components/ShowContract/YearlyReportTable';
import Journal from '../Components/ShowContract/Journals/Journal';
import FullLoader from '../Components/Loaders/FullLoader';
import useApiFetch from '../API/useApiFetch';

const SingleContractReport = () => {
    const { contractId } = useParams();
    const [reportTerm, setReportTerm] = useState('monthly');

    const {
        data: report,
        isLoading: reportLoading,
        error: reportError,
        fetchData,
    } = useApiFetch({
        url: '/leases/report',
        method: 'POST',
        data: {
            type: 'single',
            term: reportTerm,
            ids: [contractId],
        },
    });

    //refetches the data when term is changed
    useEffect(() => {
        fetchData({
            data: {
                type: 'single',
                term: reportTerm,
                ids: [contractId],
            },
        });
    }, [reportTerm, fetchData, contractId]);

    return (
        <div className='take-screen p-3'>
            <div className='container-fluid pt-4 px-4 bg-white'>
                <div className='row rounded mx-0 py-4 px-5'>
                    <div className='d-flexjustify-content-around'>
                        <div id='selectType'>
                            <p className='h5 px-2'>Report Type</p>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='monthly'
                                    id='monthly'
                                    checked={reportTerm === 'monthly'}
                                    onChange={() => setReportTerm('monthly')}
                                />
                                <label
                                    className='form-check-label'
                                    htmlFor='monthly'
                                >
                                    Monthly
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='yearly'
                                    id='yearly'
                                    checked={reportTerm === 'yearly'}
                                    onChange={() => setReportTerm('yearly')}
                                />
                                <label
                                    className='form-check-label'
                                    htmlFor='yearly'
                                >
                                    Yearly
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {<FullLoader isLoading={reportLoading} />}
            {!reportLoading && (
                <div className='bg-white pt-4 px-4 mt-3'>
                    <div
                        className='row  rounded mx-0 d-flex justify-content-center align-items-center'
                        style={{ minHeight: '100vh', textAlign: 'center' }}
                    >
                        {reportError && (
                            <p className='h1'>
                                {reportError?.message ||
                                    'Error fetching report'}
                            </p>
                        )}
                        {report?.length > 0 && (
                            <div className='container-fluid pt-4 px-4'>
                                <div
                                    className='row g-4'
                                    style={{ minHeight: '500px' }}
                                >
                                    <div className='col-12'>
                                        <div
                                            className='bg-white rounded h-100 p-4'
                                            style={{ boxShadow: 'none' }}
                                        >
                                            {reportTerm === 'monthly' ? (
                                                <>
                                                    <ReportTable
                                                        contracts={report}
                                                    />
                                                    <Journal
                                                        contracts={report}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <YearlyReportTable
                                                        contracts={report}
                                                    />
                                                    <Journal
                                                        contracts={report}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleContractReport;

/**
 * 
 *  <ReportTable contracts={report} />

                                        {report[0]?.detail[0].advancePayment !==
                                        report[0]?.detail[0].totalPayment && (
                                        <AmmortizationTable
                                            contracts={report}
                                        />
                                    )} 
                                    <Journal contracts={report} />
 * 
 */
