import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';

const EndedContracts = () => {
    const {
        data: contractsData,
        isLoading,
        errors,
        fetchData,
    } = useApiFetch(
        {
            url: '/leases/expiredLeases',
            method: 'get',
            params: {
                page: 1,
                size: 3,
            },
        },
        true
    );

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading &&
                !errors?.message &&
                (contractsData?.leases?.length > 0 ? (
                    <>
                        <ContractsList
                            contractsData={contractsData}
                            fetchData={fetchData}
                        />
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
