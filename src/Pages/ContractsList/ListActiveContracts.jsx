import { useEffect, useMemo, useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';
import ConfirmationModal from '../../Components/ListContracts/ConfirmationModal';
import { useSearchParams } from 'react-router-dom';

const ListActiveContracts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tobeDeleted, setTobeDeleted] = useState(false);

  const {
    data: contractsData,
    isLoading,
    errors,
    fetchData,
  } = useApiFetch({
    url: '/leases/activeContracts',
    method: 'get',
    params: {
      sortBy: searchParams.get('sortBy') || 'contractRegisteredDate',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      size: 25,
      page: searchParams.get('page') || 1,
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
          <LargeAlert isLoading={false} message={'No Contracts data found'} />
        ))}
      <LargeAlert isLoading={isLoading} message={errors?.message} />
    </>
  );
};

export default ListActiveContracts;
