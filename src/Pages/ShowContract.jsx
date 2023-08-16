import useApiFetch from '../API/useApiFetch';
import { useParams } from 'react-router-dom';
import FullLoader from '../Components/Loaders/FullLoader';
import { useEffect } from 'react';

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

    /**
     * @param {string} start
     * @param {string} end
     * @returns {string}
     */
    function getContractStatus(contractEndDate) {
        const currentDate = new Date();
        const endDate = new Date(contractEndDate);

        if (currentDate > endDate) {
            return 'Contract has already expired.';
        } else {
            const timeDifference = endDate.getTime() - currentDate.getTime();
            const millisecondsInOneDay = 1000 * 60 * 60 * 24;
            const daysDifference = Math.ceil(
                timeDifference / millisecondsInOneDay
            );

            return `Contract expires in ${daysDifference} days.`;
        }
    }

    return (
        <>
            <FullLoader isLoading={isLoading} />

            <div className='container-fluid pt-4 px-4'>
                <div
                    className='row bg-light rounded mx-0 py-4 px-5'
                    style={{ fontSize: '18px' }}
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
