import React from 'react';

const Report = (props) => {
    const {
        selectedRegions,
        selectedDistricts,
        selectedBranches,
        selectedMonths,
        selectedYear,
        setShowReport,
    } = props;
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
                                            {[1, 2, 3, 4, 5].map((elt) => (
                                                <>
                                                    <tr>
                                                        <td rowSpan='6'>
                                                            Region {elt}
                                                        </td>
                                                        <td rowSpan='3'>
                                                            District {elt}.1
                                                        </td>
                                                        <td>
                                                            Branch Name {elt}
                                                        </td>
                                                        <td>Data {elt}-2</td>
                                                        <td>Data {elt}-3</td>
                                                        <td>Data {elt}-4</td>
                                                        <td>Data {elt}-5</td>
                                                        <td>Data {elt}-6</td>
                                                        <td>Data {elt}-7</td>
                                                        <td>Data {elt}-8</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Branch Name {elt}
                                                        </td>
                                                        <td>Data {elt}-10</td>
                                                        <td>Data {elt}-11</td>
                                                        <td>Data {elt}-12</td>
                                                        <td>Data {elt}-13</td>
                                                        <td>Data {elt}-14</td>
                                                        <td>Data {elt}-15</td>
                                                        <td>Data {elt}-16</td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            Branch Name {elt}
                                                        </td>
                                                        <td>Data {elt}-18</td>
                                                        <td>Data {elt}-19</td>
                                                        <td>Data {elt}-20</td>
                                                        <td>Data {elt}-21</td>
                                                        <td>Data {elt}-22</td>
                                                        <td>Data {elt}-23</td>
                                                        <td>Data {elt}-24</td>
                                                    </tr>

                                                    <tr>
                                                        <td rowSpan='3'>
                                                            District {elt}.2
                                                        </td>
                                                        <td>
                                                            Branch Name {elt}
                                                        </td>
                                                        <td>Data {elt}-26</td>
                                                        <td>Data {elt}-27</td>
                                                        <td>Data {elt}-28</td>
                                                        <td>Data {elt}-29</td>
                                                        <td>Data {elt}-30</td>
                                                        <td>Data {elt}-31</td>
                                                        <td>Data {elt}-32</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Branch Name {elt}
                                                        </td>
                                                        <td>Data {elt}-34</td>
                                                        <td>Data {elt}-35</td>
                                                        <td>Data {elt}-36</td>
                                                        <td>Data {elt}-37</td>
                                                        <td>Data {elt}-38</td>
                                                        <td>Data {elt}-39</td>
                                                        <td>Data {elt}-40</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='bg-secondary text-light'>
                                                            TOTAL
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-34
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-35
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-36
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-37
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-38
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-39
                                                        </td>
                                                        <td className='bg-secondary text-light'>
                                                            Data {elt}-40
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

export default Report;
