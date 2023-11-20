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
    console.log('Transformed ', transformedData);
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
                                                <th>7/31/2023</th>
                                                <th>7/31/2023</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {transformedData.map((region) => (
                                                <>
                                                    <tr>
                                                        <td rowSpan='6'>
                                                            {region?.region}
                                                        </td>
                                                        <td rowSpan='3'>
                                                            District .1
                                                        </td>
                                                        <td>Branch Name</td>
                                                        <td>Data -2</td>
                                                        <td>Data -3</td>
                                                        <td>Data -4</td>
                                                        <td>Data -5</td>
                                                        <td>Data -6</td>
                                                        <td>Data -7</td>
                                                        <td>Data -8</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Branch Name</td>
                                                        <td>Data -10</td>
                                                        <td>Data -11</td>
                                                        <td>Data -12</td>
                                                        <td>Data -13</td>
                                                        <td>Data -14</td>
                                                        <td>Data -15</td>
                                                        <td>Data -16</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Branch Name</td>
                                                        <td>Data -18</td>
                                                        <td>Data -19</td>
                                                        <td>Data -20</td>
                                                        <td>Data -21</td>
                                                        <td>Data -22</td>
                                                        <td>Data -23</td>
                                                        <td>Data -24</td>
                                                    </tr>

                                                    <tr>
                                                        <td rowSpan='3'>
                                                            District .2
                                                        </td>
                                                        <td>Branch Name</td>
                                                        <td>Data -26</td>
                                                        <td>Data -27</td>
                                                        <td>Data -28</td>
                                                        <td>Data -29</td>
                                                        <td>Data -30</td>
                                                        <td>Data -31</td>
                                                        <td>Data -32</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Branch Name</td>
                                                        <td>Data -34</td>
                                                        <td>Data -35</td>
                                                        <td>Data -36</td>
                                                        <td>Data -37</td>
                                                        <td>Data -38</td>
                                                        <td>Data -39</td>
                                                        <td>Data -40</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='bg-secondary text-light'>
                                                            TOTAL
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -34
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -35
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -36
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -37
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -38
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -39
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -40
                                                        </td>
                                                    </tr>
                                                </>
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

Report.propTypes = {
    selectedRegions: PropTypes.array,
    selectedDistricts: PropTypes.array,
    selectedBranches: PropTypes.array,
    // selectedMonths: PropTypes.array,
    selectedYear: PropTypes.string,
    setShowReport: PropTypes.func,
};

export default Report;

/**
 * 
 *   <tbody>
                                            {selectedRegions.map( => (
                                                <>
                                                    <tr>
                                                        <td rowSpan='6'>
                                                            Region 
                                                        </td>
                                                        <td rowSpan='3'>
                                                            District .1
                                                        </td>
                                                        <td>
                                                            Branch Name 
                                                        </td>
                                                        <td>Data -2</td>
                                                        <td>Data -3</td>
                                                        <td>Data -4</td>
                                                        <td>Data -5</td>
                                                        <td>Data -6</td>
                                                        <td>Data -7</td>
                                                        <td>Data -8</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Branch Name 
                                                        </td>
                                                        <td>Data -10</td>
                                                        <td>Data -11</td>
                                                        <td>Data -12</td>
                                                        <td>Data -13</td>
                                                        <td>Data -14</td>
                                                        <td>Data -15</td>
                                                        <td>Data -16</td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            Branch Name 
                                                        </td>
                                                        <td>Data -18</td>
                                                        <td>Data -19</td>
                                                        <td>Data -20</td>
                                                        <td>Data -21</td>
                                                        <td>Data -22</td>
                                                        <td>Data -23</td>
                                                        <td>Data -24</td>
                                                    </tr>

                                                    <tr>
                                                        <td rowSpan='3'>
                                                            District .2
                                                        </td>
                                                        <td>
                                                            Branch Name 
                                                        </td>
                                                        <td>Data -26</td>
                                                        <td>Data -27</td>
                                                        <td>Data -28</td>
                                                        <td>Data -29</td>
                                                        <td>Data -30</td>
                                                        <td>Data -31</td>
                                                        <td>Data -32</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Branch Name 
                                                        </td>
                                                        <td>Data -34</td>
                                                        <td>Data -35</td>
                                                        <td>Data -36</td>
                                                        <td>Data -37</td>
                                                        <td>Data -38</td>
                                                        <td>Data -39</td>
                                                        <td>Data -40</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='bg-secondary text-light'>
                                                            TOTAL
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -34
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -35
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -36
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -37
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -38
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -39
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data -40
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
 */
