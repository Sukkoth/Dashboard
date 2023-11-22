import PropTypes from 'prop-types';
import useApiFetch from '../../API/useApiFetch';

const Report = (props) => {
    const {
        selectedRegions,
        selectedDistricts,
        selectedBranches,
        selectedMonths,
        selectedYear,
        setShowReport,
    } = props;

    const {
        data: reports,
        isLoading: reportIsLoading,
        error: reportError,
    } = useApiFetch(
        {
            url: '/leases/reports/all',
            method: 'POST',
            data: {
                term: 'monthly',
                type: 'single',
            },
        },
        false
    );

    const {
        data: BranchData,
        isLoading: branchDataIsLoading,
        errors: branchDataError,
    } = useApiFetch({
        url: '/leases/hierarchy',
        method: 'GET',
    });

    const transformedData = BranchData.filter((region) =>
        props.selectedRegions.includes(region.region)
    ).map((region) => {
        return {
            ...region,
            districts: region.districts
                .filter((district) =>
                    props.selectedDistricts.includes(district.name)
                )
                .map((district) => {
                    return {
                        ...district,
                        branches: district.branches.filter((branch) =>
                            props.selectedBranches.includes(branch.name)
                        ),
                    };
                }),
        };
    });
    return (
        <div className='container-fluid pt-4 px-4'>
            <div className='bg-light rounded mx-0 p-5'>
                <div id='menu'>
                    <button
                        className='btn btn-warning'
                        onClick={() => setShowReport(false)}
                    >
                        <i className='fa fa-chevron-left alt'></i> Back
                    </button>
                    <button
                        className='btn btn-primary'
                        style={{ marginLeft: '2rem' }}
                        onClick={() => alert('EXPORTING DATA SOON')}
                    >
                        <i className='fa fa-file alt'></i> Export
                    </button>
                </div>
            </div>
            <div id='reportBody' className='bg-light mt-3 p-4'>
                <div className='container-fluid pt-4 px-4'>
                    <div className='row g-4' style={{ minHeight: '500px' }}>
                        <div className='col-12'>
                            <div className='bg-light rounded h-100 p-4'>
                                <h6 className='mb-4'> REPORT TABLE</h6>
                                <div className='table-responsive mb-5'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th className='bg-light'>
                                                    Region
                                                </th>
                                                <th className='bg-light'>
                                                    District
                                                </th>
                                                <th className='bg-light'>
                                                    Branch Name
                                                </th>
                                                <th className='bg-light'>
                                                    Contract Start Date
                                                </th>
                                                <th className='bg-light'>
                                                    Contract End Date
                                                </th>
                                                <th className='bg-light'>
                                                    Contract Price
                                                </th>
                                                <th className='bg-light'>
                                                    Prepaid Lease
                                                </th>
                                                <th className='bg-light'>
                                                    Remaining Months at this
                                                    Period
                                                </th>
                                                <th className='bg-light'>
                                                    Depreciation Expense Per
                                                    Month
                                                </th>
                                                <th className='bg-light'>
                                                    The First/ Last Monthly
                                                    Expense to Be
                                                </th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transformedData.map((region) => (
                                                <Region
                                                    selectedBranches={
                                                        selectedBranches
                                                    }
                                                    key={region.region}
                                                    region={region}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Region({ region, selectedBranches }) {
    return (
        <>
            {selectedBranches?.map((branch) => (
                <tr key={branch.BranchId}>
                    <td>{region.region}</td>
                    <td>District Name</td>
                    <td>Branch Name</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ))}
        </>
    );
}

Report.propTypes = {
    selectedRegions: PropTypes.array,
    selectedDistricts: PropTypes.array,
    selectedBranches: PropTypes.array,
    // selectedMonths: PropTypes.array,
    selectedYear: PropTypes.string,
    setShowReport: PropTypes.func,
};

export default Report;
