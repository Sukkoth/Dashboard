import { useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';
import ConfirmationModal from '../../Components/ListContracts/ConfirmationModal';
import NoContracts from '../../Components/ListContracts/NoContracts';

const ListActiveContracts = () => {
    const [tobeDeleted, setTobeDeleted] = useState(false);
    const {
        data: contractsData,
        isLoading,
        errors,
    } = useApiFetch({
        url: '/leases/activeContracts',
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
                    <NoContracts />
                ))}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default ListActiveContracts;
