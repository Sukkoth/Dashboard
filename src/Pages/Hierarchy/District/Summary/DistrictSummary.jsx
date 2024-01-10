import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../Providers/DataProvider';
import useApiFetch from '../../../../API/useApiFetch';
import FullLoader from '../../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../../Components/ListContracts/Alerts/LargeAlert';
import extractSummaryData from '../../../../utils/extractSummaryInformation';

function DistrictSummary() {
  const { regionsData } = useContext(DataContext);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  let districts = [];
  regionsData?.forEach((region) => {
    if (region.districts.length) districts.push(...region.districts);
  });

  const {
    data: summaryData,
    isLoading: summaryLoading,
    errors: summaryErrors,
    fetchData: fetchSummaryData,
  } = useApiFetch(
    {
      method: 'POST',
      data: {
        type: 'single',
        term: 'yearly',
      },
    },
    false
  );

  useEffect(() => {
    if (selectedDistrict && [0, 4].includes(selectedYear.length)) {
      fetchSummaryData({
        url: `/leases/reports/byDistrict/${selectedDistrict}?selectedYear=${selectedYear}`,
      });
    }
  }, [selectedDistrict, fetchSummaryData, selectedYear]);

  const { mainData, years, extractedData } = extractSummaryData(summaryData);

  console.log('DATA', extractedData);
  return (
    <div className='container-fluid take-screen p-3 pb-3'>
      <form action=''>
        <div className='row my-3 mx-2'>
          <div className='col-2'>
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
              }}
            >
              <option value='' disabled>
                Select District Name
              </option>
              {districts
                .sort((a, b) => a?.name?.localeCompare(b.name))
                .map((district) => (
                  <option value={district.districtId} key={district.districtId}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='col-2'>
            <label htmlFor='regionName' className='mb-2'>
              Year
            </label>
            <input
              type='text'
              className='form-control'
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>
        </div>
        <div></div>
      </form>

      <div className='col-12'>
        {/* WATCH OUT, IF THE BACKEND CHANGES THE DATA STRCUTURE HERE, THIS WILL CRASH */}
        {summaryLoading ? (
          <FullLoader isLoading={summaryLoading} />
        ) : summaryErrors?.message ? (
          <LargeAlert
            message={summaryErrors?.message || 'Something Went Wrong'}
          />
        ) : selectedDistrict === '' ? (
          <LargeAlert message={'Select District'} />
        ) : summaryData === null || summaryData?.length <= 0 ? (
          <LargeAlert message={'No Summary data found'} />
        ) : (
          <div
            className='bg-white rounded h-100 p-4'
            style={{ minHeight: '80vh' }}
          >
            <h6 className='mb-4'>Summary Table</h6>

            <div className='table-responsive mb-5'>
              <table
                className='table table-hover table-bordered text-center'
                id='reportTable'
              >
                <tbody>
                  <tr>
                    <th colSpan='6' className='bg-secondary'></th>
                  </tr>
                  <tr>
                    <th>Year</th>
                    <th>ROU</th>
                    <th>Lease Liability</th>
                    <th>Dep Expense</th>
                    <th>Finance Charge</th>
                    <th>Payment</th>
                  </tr>

                  {Object.keys(extractedData)?.map((year) => {
                    return (
                      <tr key={year}>
                        <td>{year}</td>
                        <td>{extractedData[year].rou}</td>
                        <td>{extractedData[year].leaseLiability}</td>
                        <td>{extractedData[year].deprecationExp}</td>
                        <td>{extractedData[year].financeCharge}</td>
                        <td>{extractedData[year].payment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DistrictSummary;
