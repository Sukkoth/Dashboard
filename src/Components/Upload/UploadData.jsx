import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../Loaders/FullLoader';
import LargeAlert from '../ListContracts/Alerts/LargeAlert';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import numeral from 'numeral';
import { EXPORT_TO_EXCEL } from '../../utils/ExportToExcel';
import ReportRow from './ReportRow';
import { ExtractReportForUpload } from '../../utils/ExtractReportForUpload';

const UploadData = ({ selectedMonth, selectedYear, setShowReport }) => {
  //Fetch branch data
  const {
    data: BranchData,
    isLoading: branchDataIsLoading,
    errors: branchDataError,
  } = useApiFetch({
    url: '/leases/hierarchy',
    method: 'GET',
  });

  //extract all branches from hierarchy
  const branches = BranchData?.flatMap((region) =>
    region.districts.flatMap((district) => district.branches)
  );

  //*Fetch reports
  const {
    data: reports,
    isLoading: reportIsLoading,
    errors: reportError,
  } = useApiFetch({
    url: '/leases/reports/all',
    method: 'POST',
    data: {
      term: 'monthly',
      type: 'single',
    },
  });

  if (branchDataIsLoading || reportIsLoading) {
    return <FullLoader isLoading={true} />;
  }

  if (branchDataError?.message) {
    return (
      <LargeAlert
        backButton={<BackButton onClick={() => setShowReport(false)} />}
        isLoading={branchDataIsLoading}
        message={branchDataError?.message || 'Error While fetching'}
      />
    );
  }

  if (reportError?.message) {
    return (
      <LargeAlert
        backButton={<BackButton onClick={() => setShowReport(false)} />}
        message={reportError?.message || 'Error While fetching'}
      />
    );
  }

  if (!branches?.length) {
    return (
      <LargeAlert
        backButton={<BackButton onClick={() => setShowReport(false)} />}
        message='No branch data found'
      />
    );
  }

  if (!reports?.length) {
    return (
      <LargeAlert
        backButton={<BackButton onClick={() => setShowReport(false)} />}
        message={`No report data found`}
      />
    );
  }

  //Contains the list of report to be viewed
  let extractedReports = ExtractReportForUpload(
    reports,
    selectedYear,
    selectedMonth,
    branches
  );

  //Contains the list of ammortization report to be viewed
  let extractedAmmortization = ExtractReportForUpload(
    reports,
    selectedYear,
    selectedMonth,
    branches,
    'ammortization'
  );

  if (extractedReports.length <= 0)
    return (
      <LargeAlert
        message='No report found for given dates'
        backButton={<BackButton onClick={() => setShowReport(false)} />}
      />
    );
  if (extractedAmmortization.length <= 0)
    return (
      <LargeAlert
        message='No ammortization report found for given dates'
        backButton={<BackButton onClick={() => setShowReport(false)} />}
      />
    );

  return (
    <div className='container-fluid pt-4 px-4 take-screen'>
      <div className='bg-white rounded mx-0 p-5'>
        <div id='menu' className='mb-5'>
          <button
            className='btn btn-warning'
            style={{ marginLeft: '2rem' }}
            onClick={() => setShowReport(false)}
          >
            <i className='fa fa-chevron-left alt'></i> Back
          </button>

          {extractedReports.length > 0 && (
            <button
              className='btn btn-primary'
              style={{ marginLeft: '2rem' }}
              onClick={() => EXPORT_TO_EXCEL(selectedMonth, selectedYear)}
            >
              <i className='fa fa-file alt'></i> Export (
              {/* the 4 added is for 2 rows (displaying overall summary) and 2 rows that separate report from ammortization */}
              {extractedReports.length + extractedAmmortization.length + 4}{' '}
              rows)
            </button>
          )}
        </div>
        <table className='table table-responsive table-bordered' id='myTable'>
          <tbody className=''>
            <tr>
              <th>Org</th>
              <th>Location</th>
              <th>Cost Center</th>
              <th>Account</th>
              <th>Sector</th>
              <th>Product</th>
              <th>Future 1</th>
              <th>Future 2</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Central Region</th>
            </tr>
            <tr>
              <td>01</td>
              <td>0000</td>
              <td>0000</td>
              <td>231025</td>
              <td>00000</td>
              <td>00000</td>
              <td>00000</td>
              <td>00000</td>
              <td>-</td>
              <td>
                {numeral(
                  extractedReports?.reduce((acc, curr) => {
                    return acc + curr?.deprecationExp;
                  }, 0)
                ).format('0,0.00')}
              </td>
              <td>Accumulated Depreciation</td>
            </tr>
            <tr>
              <td>01</td>
              <td>0101</td>
              <td>0797</td>
              <td>221162</td>
              <td>00000</td>
              <td>00000</td>
              <td>00000</td>
              <td>00000</td>
              <td>-</td>
              <td>
                {numeral(
                  extractedAmmortization?.reduce((acc, curr) => {
                    return acc + curr?.interestExpence;
                  }, 0)
                ).format('0,0.00')}
              </td>
              <td> Lease liability</td>
            </tr>
            {extractedReports.map((row, key) => (
              <ReportRow
                key={key}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                row={row}
              />
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-light'>-</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-light'>-</td>
              <td></td>
            </tr>

            {extractedAmmortization.map((row, key) => (
              <ReportRow
                key={key}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                row={row}
                type='ammortization'
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UploadData.propTypes = {
  selectedMonths: PropTypes.array,
  selectedYear: PropTypes.number,
  setShowReport: PropTypes.func,
  selectedMonth: PropTypes.number,
};

export default UploadData;
