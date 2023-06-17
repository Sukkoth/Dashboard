import useApiFetch from '../API/useApiFetch';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useParams } from 'react-router-dom';

const ShowContract = () => {
    const { contractId } = useParams();
    const {
        data: contracts,
        isLoading,
        error,
    } = useApiFetch({
        url: `/leases/report/yearly/${contractId}`,
        method: 'get',
    });

    if (contracts) {
        console.log(contracts);
    }

    return (
        <>
            {/* Loader */}
            {isLoading && (
                <div className='container-fluid pt-4 px-4'>
                    <div
                        className='row bg-light rounded align-items-center justify-content-center mx-0'
                        style={{ minHeight: '600px' }}
                    >
                        <div className='col-md-6 text-center'>
                            <ScaleLoader size={250} color='#d30fa9' />
                        </div>
                    </div>
                </div>
            )}

            {/* Display if contracts */}

            {!isLoading && contracts.length > 0 ? (
                <div className='container-fluid pt-4 px-4'>
                    <div className='row g-4' style={{ minHeight: '500px' }}>
                        <div className='col-12'>
                            <div className='bg-light rounded h-100 p-4'>
                                <h6 className='mb-4'>
                                    Report Table
                                    <span
                                        className='d-flex space-between'
                                        style={{ float: 'right' }}
                                    >
                                        <a href='#ammortization'>
                                            Ammortization
                                        </a>
                                        <a href='#journal'>Journal</a>
                                    </span>
                                </h6>
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
                                                <th
                                                    colSpan='4'
                                                    className='bg-secondary'
                                                ></th>
                                            </tr>
                                            <tr>
                                                <th>Year</th>
                                                <th>Balance</th>
                                                <th>Deprecitation Exp</th>
                                                <th>Months</th>
                                            </tr>
                                            {contracts.map((contract) =>
                                                contract.report.map(
                                                    (report, index) => (
                                                        <tr key={index}>
                                                            <th scope='row'>
                                                                {report?.year}
                                                            </th>
                                                            <td>
                                                                {
                                                                    report?.balance
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    report?.deprecationExp
                                                                }
                                                            </td>
                                                            <td>
                                                                {report?.months ||
                                                                    '-'}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <h6 className='mb-4'>Ammortization Table</h6>
                                <div
                                    className='table-responsive mb-5'
                                    id='ammortization'
                                >
                                    <table className='table table-hover table-bordered'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Period</th>
                                                <th scope='col'>Year</th>
                                                <th scope='col'>Payments</th>
                                                <th scope='col'>Interest</th>
                                                <th scope='col'>Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contracts.map((contract) =>
                                                contract?.ammortization.map(
                                                    (ammortization, index) => (
                                                        <tr key={index}>
                                                            <th scope='row'>
                                                                {index + 1}
                                                            </th>
                                                            <td>
                                                                {
                                                                    ammortization?.year
                                                                }
                                                            </td>
                                                            <td>
                                                                {ammortization?.payment ||
                                                                    '-'}
                                                            </td>
                                                            <td>
                                                                {
                                                                    ammortization?.interest
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    ammortization?.balance
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // No contracts found message
                <div className='container-fluid pt-4 px-4'>
                    <div
                        className='row bg-light rounded d-felx mx-0 text-center align-items-center'
                        style={{ minHeight: '600px' }}
                    >
                        <h3 className='justify-self-center'>
                            No report contracts found
                        </h3>
                    </div>
                </div>
            )}

            <div className='container-fluid pt-4 px-4'>
                <div
                    className='row bg-light rounded align-items-center justify-content-center mx-0'
                    id='journal'
                    style={{ minHeight: '600px' }}
                ></div>
            </div>
        </>
    );
};

export default ShowContract;
