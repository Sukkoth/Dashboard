import useApiFetch from '../API/useApiFetch';
import { useParams } from 'react-router-dom';
import FullLoader from '../Components/Loaders/FullLoader';
import ReportTable from '../Components/ShowContract/ReportTable';
import AmmortizationTable from '../Components/ShowContract/AmmortizationTable';
import NoContracts from '../Components/ListContracts/NoContracts';
import Journal from '../Components/ShowContract/Journals/Journal';

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

    return (
        <>
            <FullLoader isLoading={isLoading} />

            {!isLoading && contracts.length > 0 ? (
                <div className='container-fluid pt-4 px-4'>
                    <div className='row g-4' style={{ minHeight: '500px' }}>
                        <div className='col-12'>
                            <div className='bg-light rounded h-100 p-4'>
                                <ReportTable contracts={contracts} />
                                <AmmortizationTable contracts={contracts} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NoContracts message='No report contracts found' />
            )}

            <Journal contracts={contracts} />
        </>
    );
};

export default ShowContract;
