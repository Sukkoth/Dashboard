import useApiFetch from '../API/useApiFetch';
import { useParams } from 'react-router-dom';
import FullLoader from '../Components/Loaders/FullLoader';
import getContractStatus from '../utils/getContractStatus';

const ShowContract = () => {
    console.log('SU');
    const { contractId } = useParams();
    const {
        data: contracts,
        isLoading,
        error,
    } = useApiFetch({
        url: `/leases/${contractId}`,
        method: 'get',
    });

    return (
        <>
            <FullLoader isLoading={isLoading} />

            <div className='container-fluid pt-4 px-4'>
                <div
                    className='row bg-light rounded mx-0 py-4 px-5'
                    // style={{ fontSize: '18px' }}
                >
                    <h4>Contract Information</h4>
                    <p>
                        <strong>Contract Number</strong>:
                        {contracts?.contractNumber}
                    </p>
                    <p>
                        <strong>Branch Name</strong>:{contracts?.branchName}
                    </p>
                    <p>
                        <strong>Region</strong>:{contracts?.region}
                    </p>
                    <p>
                        <strong>District</strong>:{contracts?.district}
                    </p>
                    <p>
                        <strong>Contract Start Date</strong>:
                        {contracts?.contractStartDate}
                    </p>
                    <p>
                        <strong>Contract End Date</strong>:
                        {contracts?.contractEndDate}{' '}
                        <span style={{ color: 'red' }}>
                            {getContractStatus(contracts?.contractEndDate)}
                        </span>
                    </p>
                    <p>
                        <strong>Total Payment</strong>:{contracts?.totalPayment}
                    </p>
                    <p>
                        <strong>Advance Payment</strong>:
                        {contracts?.advancePayment}
                    </p>
                    <p>
                        <strong>Discount Rate</strong>:{contracts?.discountRate}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ShowContract;
