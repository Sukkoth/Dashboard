import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';

const EndedContracts = () => {
    const {
        data: contractsData,
        isLoading,
        errors,
    } = useApiFetch(
        {
            url: '/leases/expiredLeases',
            method: 'get',
        },
        true
    );

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading &&
                !errors?.message &&
                (contractsData.length > 0 ? (
                    <>
                        <ContractsList contractsData={contractsData} />
                    </>
                ) : (
                    <LargeAlert
                        isLoading={false}
                        message={'No Contracts data found'}
                    />
                ))}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default EndedContracts;
