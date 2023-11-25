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
    } = useApiFetch({
        url: '/leases',
        method: 'get',
    });

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading &&
                !errors?.message &&
                (contractsData.length > 0 ? (
                    <>
                        <ConfirmationModal tobeDeleted={tobeDeleted} />
                        <ContractsList
                            contractsData={contractsData}
                            setTobeDeleted={setTobeDeleted}
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
