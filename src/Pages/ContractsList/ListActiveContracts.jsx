import { useEffect, useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';
import ConfirmationModal from '../../Components/ListContracts/ConfirmationModal';
import { useSearchParams } from 'react-router-dom';

const ListActiveContracts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tobeDeleted, setTobeDeleted] = useState(false);
  const [startDate, setStartDate] = useState(
    searchParams.get('startYear') || ''
  );
  const [endDate, setEndDate] = useState(searchParams.get('endYear') || '');

  const {
    data: contractsData,
    isLoading,
    errors,
    fetchData,
  } = useApiFetch(
    {
      url: '/leases/activeContracts',
      method: 'get',
      params: {
        sortBy: searchParams.get('sortBy') || 'contractRegisteredDate',
        sortOrder: searchParams.get('sortOrder') || 'desc',
        size: 25,
        page: searchParams.get('page') || 1,
      },
    },
    false
  );

  useEffect(() => {
    if (
      (startDate.length === 4 &&
        (endDate.length === 4 || endDate.length === 0)) ||
      (endDate.length === 4 &&
        (startDate.length === 4 || startDate.length === 0)) ||
      (startDate.length === 0 && endDate.length === 0)
    ) {
      //set params used to fetch data

      let params = {
        sortBy: searchParams.get('sortBy') || 'contractRegisteredDate',
        sortOrder: searchParams.get('sortOrder') || 'desc',
        size: searchParams.get('size') || 25,
        page: searchParams.get('page') || 1,
        startYear: startDate.length === 4 ? startDate : null,
        endYear: endDate.length === 4 ? endDate : null,
      };

      //filter null valued params
      params = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null)
      );

      setSearchParams(params);
      fetchData({ params });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <>
      <FullLoader isLoading={isLoading} />
      {!isLoading &&
        !errors?.message &&
        (contractsData?.leases?.length > 0 ? (
          <div className='container-fluid take-screen p-3 pb-3'>
            <form action=''>
              <div className='row my-3 mx-2 gap-3'>
                <div className='col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3'>
                  <label htmlFor='regionName' className='mb-2'>
                    Contract Registration Year
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (e.target.value.length === 0) {
                        setSearchParams((prev) => {
                          prev.delete('startYear');
                          return prev;
                        });
                      }
                    }}
                  />
                </div>
                <div className='col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3'>
                  <label htmlFor='regionName' className='mb-2'>
                    Contract End Year
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (e.target.value === 0) {
                        setSearchParams((prev) => {
                          prev.delete('endYear');
                          return prev;
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </form>
            <ConfirmationModal tobeDeleted={tobeDeleted} />
            <ContractsList
              contractsData={contractsData}
              setTobeDeleted={setTobeDeleted}
              fetchData={fetchData}
            />
          </div>
        ) : (
          <LargeAlert isLoading={false} message={'No Contracts data found'} />
        ))}
      <LargeAlert isLoading={isLoading} message={errors?.message} />
    </>
  );
};

export default ListActiveContracts;
