import { useContext, useEffect, useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ContractsList from '../../Components/ListContracts/ContractsList';
import { DataContext } from '../../Providers/DataProvider';

const Search = () => {
  const { regionsData } = useContext(DataContext);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [startDate, setStartDate] = useState('');

  const {
    data: contractsData,
    isLoading,
    errors,
    fetchData,
  } = useApiFetch(
    {
      method: 'get',
    },
    false
  );

  useEffect(() => {
    if (selectedDistrict && (startDate.length === 4 || startDate.length === 0))
      fetchData({
        url: `/leases/byDistrictId/${selectedDistrict}`,
        params: {
          startYear: startDate,
        },
      });
  }, [selectedDistrict, fetchData, startDate]);

  useEffect(() => {
    if (selectedBranch && (startDate.length === 4 || startDate.length === 0))
      fetchData({
        url: `/leases/byBranchId/${selectedBranch}`,
        params: {
          startYear: startDate,
        },
      });
  }, [selectedBranch, fetchData, startDate]);

  let districts = [];
  regionsData?.forEach((region) => {
    if (region.districts.length) districts.push(...region.districts);
  });

  let branches = [];
  if (selectedDistrict)
    branches = districts.find(
      (district) => Number(district.districtId) === selectedDistrict
    )?.branches;
  else
    regionsData?.forEach((region) => {
      region.districts.forEach((district) => {
        if (district?.branches?.length) branches.push(...district.branches);
      });
    });

  return (
    <>
      <FullLoader isLoading={isLoading} />
      {!isLoading && (
        <>
          {/* <ConfirmationModal tobeDeleted={tobeDeleted} /> */}
          <div className='container-fluid take-screen p-3 pb-3'>
            <form>
              <div className='row my-3 mx-2 gap-3 gap-md-0'>
                <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                  <label className='mb-2' htmlFor='searchDistrict'>
                    Search By District
                  </label>
                  <select
                    id='district'
                    name='district'
                    className='form-select'
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(Number(e.target.value));
                      setSelectedBranch('');
                    }}
                  >
                    <option value='' disabled>
                      Select District Name
                    </option>
                    <option value=''>Clear Selection</option>
                    {districts
                      .sort((a, b) => a?.name?.localeCompare(b.name))
                      .map((district) => (
                        <option
                          value={district.districtId}
                          key={district.districtId}
                        >
                          {district.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                  <label className='mb-2' htmlFor='searchBranch'>
                    Search By Branch
                  </label>
                  <select
                    id='searchBranch'
                    name='searchBranch'
                    className='form-select'
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(Number(e.target.value))}
                  >
                    <option value='' disabled>
                      Select Branch Name
                    </option>
                    {branches
                      ?.sort((a, b) => a?.name?.localeCompare(b.name))
                      .map((branch) => (
                        <option value={branch.BranchId} key={branch.BranchId}>
                          {branch.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                  <label htmlFor='regionName' className='mb-2'>
                    Contract Registration Year
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div></div>
            </form>

            {errors?.message ? (
              errors?.details?.response?.status === 404 ? (
                <LargeAlert
                  isLoading={isLoading}
                  message={'No contract found!'}
                />
              ) : (
                <LargeAlert isLoading={isLoading} message={errors?.message} />
              )
            ) : !selectedBranch && !selectedDistrict ? (
              <LargeAlert message={'Select District or Branch'} />
            ) : (
              <ContractsList
                contractsData={contractsData}
                fetchData={fetchData}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Search;
