import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import ReportTable from '../Components/ShowContract/ReportTable';
import YearlyReportTable from '../Components/ShowContract/YearlyReportTable';
import Journal from '../Components/ShowContract/Journals/Journal';
import FullLoader from '../Components/Loaders/FullLoader';

const SingleContractReport = () => {
    const { contractId } = useParams();
    const [reportTerm, setReportTerm] = useState('monthly');
    const [type, setType] = useState('single');

    const {
        data: report,
        isLoading: reportLoading,
        error: reportError,
    } = useFetchData(`/leases/report`, reportTerm, type, contractId);

    return (
        <>
            <div className='container-fluid pt-4 px-4'>
                <div className='row bg-light rounded mx-0 py-4 px-5'>
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
                <div className='container-fluid pt-4 px-4'>
                    <div
                        className='row bg-light rounded mx-0 d-flex justify-content-center align-items-center'
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
                                        <div className='bg-light rounded h-100 p-4'>
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
        </>
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
