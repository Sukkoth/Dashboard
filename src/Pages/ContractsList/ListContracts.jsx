import { useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ConfirmationModal from '../../Components/ListContracts/ConfirmationModal';
import ContractsList from '../../Components/ListContracts/ContractsList';

const ListContracts = () => {
    const [tobeDeleted, setTobeDeleted] = useState(false);
    const {
        data: contractsData,
        isLoading,
        errors,
        fetchData,
    } = useApiFetch({
        url: '/leases',
        method: 'get',
        params: {
            page: 1,
            size: 3,
        },
    });

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading &&
                !errors?.message &&
                (contractsData?.leases?.length > 0 ? (
                    <>
                        <ConfirmationModal tobeDeleted={tobeDeleted} />
                        <ContractsList
                            contractsData={contractsData}
                            setTobeDeleted={setTobeDeleted}
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

export default ListContracts;
