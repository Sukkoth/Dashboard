import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../Providers/DataProvider';
import useApiFetch from '../../../../API/useApiFetch';
import FullLoader from '../../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../../Components/ListContracts/Alerts/LargeAlert';
import numeral from 'numeral';

function DistrictSummary() {
  const { regionsData } = useContext(DataContext);
  const [selectedDistrict, setSelectedDistrict] = useState('');

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
      url: `/leases/reports/byDistrict/${selectedDistrict}`,
      method: 'POST',
      data: {
        type: 'single',
        term: 'yearly',
      },
    },
    false
  );

  useEffect(() => {
    if (selectedDistrict) {
      fetchSummaryData({
        url: `/leases/reports/byDistrict/${selectedDistrict}`,
      });
    }
  }, [selectedDistrict, fetchSummaryData]);

  const mainData = {
    report: {},
    ammortization: {},
  };

  const years = [];

  summaryData?.forEach((data) => {
    data?.summaryArray?.forEach((summary) => {
      if (summary.year === '-') return;
      if (summary?.deprecationExp !== undefined) {
        if (!mainData.report[summary.year]) {
          mainData.report[summary.year] = [];
        }
        mainData.report[summary.year].push({
          ...summary,
          branchName: data?.detail?.[0]?.branchName,
        });
      } else if (summary?.interestExpence !== undefined) {
        if (!mainData.ammortization[summary.year]) {
          mainData.ammortization[summary.year] = [];
        }
        mainData.ammortization[summary.year].push({
          ...summary,
          branchName: data?.detail?.[0]?.branchName,
        });
      }
      if (!years.includes(summary.year)) years.push(summary.year);
    });
  });

  return (
    <div className='container-fluid take-screen p-3 pb-3'>
      <form action=''>
        <div className='row my-3 mx-2'>
          <div className='col-2'>
            <label className='mb-2' htmlFor='searchDistrict'>
              Search By District {selectedDistrict}
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
              <option value=''>Clear Selection</option>
              {districts
                .sort((a, b) => a?.name?.localeCompare(b.name))
                .map((district) => (
                  <option value={district.districtId} key={district.districtId}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div></div>
      </form>

      <div className='col-12'>
        <FullLoader isLoading={summaryLoading} />
        {/* WATCH OUT, IF THE BACKEND CHANGES THE DATA STRCUTURE HERE, THIS WILL CRASH */}
        {summaryData === null || summaryData?.length <= 0 ? (
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

                  {years?.map((year) => {
                    return (
                      <tr key={year}>
                        <td>{year}</td>
                        <td>
                          {mainData.report[year]?.reduce((acc, data) => {
                            return (
                              acc +
                              (data.balance === '-' ? 0 : data.balance || 0)
                            );
                          }, 0)}
                        </td>
                        <td>
                          {mainData.ammortization[year]?.reduce((acc, data) => {
                            return (
                              acc +
                              (data.balance === '-' ? 0 : data.balance || 0)
                            );
                          }, 0)}
                        </td>
                        <td>
                          {mainData.report[year]?.reduce((acc, data) => {
                            return (
                              acc +
                              (data.deprecationExp === '-'
                                ? 0
                                : data.deprecationExp || 0)
                            );
                          }, 0)}
                        </td>
                        <td>
                          {mainData.ammortization[year]?.reduce((acc, data) => {
                            return (
                              acc +
                              (data.interestExpence === '-'
                                ? 0
                                : data.interestExpence || 0)
                            );
                          }, 0)}
                        </td>
                        <td>
                          {mainData.ammortization[year]?.reduce((acc, data) => {
                            return (
                              acc +
                              (data.leasePayment === '-'
                                ? 0
                                : data.leasePayment || 0)
                            );
                          }, 0)}
                        </td>
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
