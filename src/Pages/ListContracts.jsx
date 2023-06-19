import React, { useState } from 'react';
import useApiFetch from '../API/useApiFetch';
import FullLoader from '../Components/Loaders/FullLoader';
import LargeAlert from '../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../Components/ListContracts/Alerts/ContractsList';
import ConfirmationModal from '../Components/ListContracts/ConfirmationModal';
import NoContracts from '../Components/ListContracts/NoContracts';

//! Try reloading the page if there is no error in deleteError Object,
//!you are having difficulty wih blocking and non blocking concept,
//!the error object gets populated after you check for it

//*Fixed the above in a very odd way

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
                    <NoContracts />
                ))}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default ListContracts;
