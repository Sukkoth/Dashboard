import { utils, writeFile } from 'xlsx';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../Loaders/FullLoader';
import LargeAlert from '../ListContracts/Alerts/LargeAlert';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import numeral from 'numeral';

const monthsInYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const UploadData = ({ selectedMonth, selectedYear, setShowReport }) => {
    const handleExportToExcel = async () => {
        // Select the HTML table
        const table_elt = document.getElementById('myTable');

        // Create a new workbook
        const wb = utils.book_new();

        // Create a new worksheet
        const ws = utils.aoa_to_sheet([[]]);

        // Set the worksheet name
        ws['!ref'] = 'A1:D'; // Adjust this to match the number of rows and columns in your table

        // Iterate through the table rows
        const rows = table_elt.rows;
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const rowData = [];
            for (let j = 0; j < cells.length; j++) {
                const cellValue = cells[j].innerText;
                rowData.push(
                    j <= 7
                        ? { t: 's', v: cellValue, z: '@' }
                        : j === 8
                        ? { t: 'n', v: cellValue, numFmt: '0.00' }
                        : cellValue
                );
            }
            utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
        }

        //This defines the length of each column
        ws['!cols'] = [
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 8 },
            { wch: 8 },
            { wch: 8 },
            { wch: 8 },
            { wch: 8 },
            { wch: 15 },
            { wch: 20 },
            { wch: 80 },
        ];
        // Add the worksheet to the workbook
        utils.book_append_sheet(wb, ws, 'Sheet 1');

        // Write the workbook to an XLSX file
        writeFile(
            wb,
            `${
                monthsInYear[selectedMonth - 1]
            } ${selectedYear} All In One For Upload.xlsx`
        );
    };

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
    const branches = BranchData.flatMap((region) =>
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
                backButton={<BackButton back={1} />}
                isLoading={branchDataIsLoading}
                message={branchDataError?.message || 'Error While fetching'}
            />
        );
    }

    if (reportError?.message) {
        return (
            <LargeAlert
                backButton={<BackButton back={1} />}
                message={reportError?.message || 'Error While fetching'}
            />
        );
    }

    if (!branches?.length) {
        return (
            <LargeAlert
                backButton={<BackButton back={1} />}
                message='No branch data found'
            />
        );
    }

    if (!reports?.length) {
        return (
            <LargeAlert
                backButton={<BackButton back={1} />}
                message={`No report data found`}
            />
        );
    }

    /**
     * *Extracted reports array contains
     * * **** reports which have data (!undefined)
     * * **** Reports which have the same month and year as the user have selected
     * * **** Reports that have deprecation expense
     */

    let extractedReports = [];
    reports.forEach((report) => {
        //check if the report is pressent
        if (report !== undefined) {
            //find reports which have the selected years and months
            const row = report?.report.find(
                (report) =>
                    report.year.split('-')[0] === `${selectedYear}` &&
                    report.year.split('-')[1] ===
                        `${
                            selectedMonth < 10
                                ? `0${selectedMonth}`
                                : `${selectedMonth}`
                        }`
            );

            //find the reports which have deprecationExpense,
            //If they do not have it, you need it in the list
            if (row?.deprecationExp) {
                const branch = branches.find(
                    (branch) => branch.BranchId === report.detail[0].BranchId
                );

                extractedReports.push({
                    ...row,
                    branch,
                    type: report?.detail?.[0].contractType,
                    year: report?.year,
                });
            }
        }
    });

    //Contains the list of ammortization report to be viewed
    let extractedAmmortization = [];

    reports.forEach((report) => {
        if (report?.ammortization?.length) {
            const row = report?.ammortization.find(
                (report) =>
                    report.year.split('-')[0] === `${selectedYear}` &&
                    report.year.split('-')[1] ===
                        `${
                            selectedMonth < 10
                                ? `0${selectedMonth}`
                                : `${selectedMonth}`
                        }`
            );

            if (row?.interestExpence) {
                const branch = branches.find(
                    (branch) => branch.BranchId === report.detail[0].BranchId
                );

                extractedAmmortization.push({
                    ...row,
                    branch,
                });
            }
        }
    });

    if (extractedReports.length <= 0)
        return (
            <LargeAlert
                message='No report found for given dates'
                backButton={<BackButton back={1} />}
            />
        );
    if (extractedAmmortization.length <= 0)
        return (
            <LargeAlert
                message='No ammortization report found for given dates'
                backButton={<BackButton back={1} />}
            />
        );

    // Finally sort extractedReports based on branchName
    extractedReports?.sort((a, b) =>
        a?.branch?.name?.toUpperCase() < b?.branch?.name?.toUpperCase() ? -1 : 1
    );

    // Finally sort the extractedAmmortization based on branchName
    extractedAmmortization?.sort((a, b) =>
        a?.branch?.name?.toUpperCase() < b?.branch?.name?.toUpperCase() ? -1 : 1
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
                            onClick={handleExportToExcel}
                        >
                            <i className='fa fa-file alt'></i> Export (
                            {extractedReports.length} rows)
                        </button>
                    )}
                </div>

                {extractedReports.length > 0 && (
                    <table
                        className='table table-responsive table-bordered'
                        id='myTable'
                    >
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
                                <td></td>
                                <td>
                                    {numeral(
                                        extractedReports?.reduce(
                                            (acc, curr) => {
                                                return (
                                                    acc + curr?.deprecationExp
                                                );
                                            },
                                            0
                                        )
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
                                <td></td>
                                <td>
                                    {numeral(
                                        extractedAmmortization?.reduce(
                                            (acc, curr) => {
                                                return (
                                                    acc + curr?.interestExpence
                                                );
                                            },
                                            0
                                        )
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
                )}
            </div>
        </div>
    );
};

function ReportRow({ row, selectedMonth, selectedYear, type }) {
    return (
        <tr>
            <td>01</td>
            <td>{row?.branch?.location}</td>
            <td>{row?.branch?.costCenter}</td>
            <td>{type === 'ammortization' ? '561083' : '511025'}</td>
            <td>00000</td>
            <td>00000</td>
            <td>00000</td>
            <td>00000</td>
            <td>
                {type === 'ammortization'
                    ? row?.interestExpence
                    : row?.deprecationExp}
            </td>
            <td>-</td>
            <td>
                {row?.branch?.name} {row?.type} Depr. Expense- Right of Use
                Asset for the month of {monthsInYear[selectedMonth - 1]}{' '}
                {selectedYear}
            </td>
        </tr>
    );
}

UploadData.propTypes = {
    selectedMonths: PropTypes.array,
    selectedYear: PropTypes.number,
    setShowReport: PropTypes.func,
    selectedMonth: PropTypes.number,
};

ReportRow.propTypes = {
    row: PropTypes.object,
    selectedMonth: PropTypes.number,
    selectedYear: PropTypes.number,
};

export default UploadData;
