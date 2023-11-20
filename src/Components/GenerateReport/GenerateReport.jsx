import { useContext } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../Providers/DataProvider';
import './generateReportPageStyles.css';

// const monthsInYear = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
// ];

let yearDropDownOptions = [];
for (let year = 1990; year <= Number(new Date().getFullYear()) + 10; year++) {
    yearDropDownOptions.push(year);
}

const GenerateReport = (props) => {
    const {
        selectedRegions,
        setSelectedRegions,
        selectedDistricts,
        setSelectedDistricts,
        selectedBranches,
        setSelectedBranches,
        // selectedMonths,
        // setSelectedMonths,
        selectedYear,
        setSelectedYear,
        setShowReport,
    } = props;

    const { regionsData } = useContext(DataContext);

    //get total options for each//
    let regionOptions = regionsData.map((region) => region.region);
    let districtOptions = [];
    selectedRegions.forEach((region) => {
        let regions = regionsData.find((reg) => reg.region === region);
        regions.districts.map((dist) => districtOptions.push(dist.name));
    });

    let branchOptions = [];
    selectedRegions.forEach((region) => {
        let regions = regionsData.find((reg) => reg.region === region);
        regions.districts.forEach((district) => {
            if (selectedDistricts.includes(district.name))
                return district.branches.map((br) =>
                    branchOptions.push(br.name)
                );
        });
    });
    //options end

    //handle change for each
    const handleRegionChange = (regionName) => {
        if (selectedRegions.includes(regionName)) {
            //illiminate regions which are diselected
            const newRegions = selectedRegions.filter(
                (region) => region !== regionName
            );

            //illiminate all of it's districts
            let districtsToBeRemoved = regionsData.find(
                (region) => region.region === regionName
            ).districts;

            let branchesToBeRemoved = [];

            let tempSelectedDistricts = [...selectedDistricts];
            if (districtsToBeRemoved) {
                districtsToBeRemoved.forEach((district) => {
                    district.branches.forEach((branch) =>
                        branchesToBeRemoved.push(branch.name)
                    );
                    if (tempSelectedDistricts.includes(district.name))
                        tempSelectedDistricts.splice(
                            tempSelectedDistricts.indexOf(district.name),
                            1
                        );
                });
                setSelectedDistricts(tempSelectedDistricts);
                let tempBranches = [...selectedBranches];
                branchesToBeRemoved.forEach((branch) => {
                    if (tempBranches.includes(branch)) {
                        tempBranches.splice(tempBranches.indexOf(branch), 1);
                    }
                });
                setSelectedBranches(tempBranches);
            }

            setSelectedRegions(newRegions);
        } else {
            setSelectedRegions([...selectedRegions, regionName]);
        }
    };

    const handleDistrictChange = (districtName) => {
        let districtsToBeRemoved = null;
        regionsData.forEach((region) => {
            const foundDistrict = region.districts.find(
                (district) => district.name === districtName
            );
            if (foundDistrict) {
                districtsToBeRemoved = foundDistrict;
            }
        });

        let tempBranches = [...selectedBranches];

        districtsToBeRemoved.branches.forEach((branch) => {
            if (tempBranches.includes(branch.name)) {
                tempBranches.splice(tempBranches.indexOf(branch.name), 1);
            }
        });

        setSelectedBranches(tempBranches);

        if (selectedDistricts.includes(districtName)) {
            setSelectedDistricts(
                selectedDistricts.filter(
                    (district) => district !== districtName
                )
            );
        } else {
            setSelectedDistricts([...selectedDistricts, districtName]);
        }
    };

    const handleBranchChange = (branchName) => {
        if (selectedBranches.includes(branchName)) {
            setSelectedBranches(
                selectedBranches.filter((branch) => branch !== branchName)
            );
        } else {
            setSelectedBranches([...selectedBranches, branchName]);
        }
    };

    // const handleMonthChange = (monthName) => {
    //     if (selectedMonths.includes(monthName)) {
    //         setSelectedMonths(
    //             selectedMonths.filter((month) => month !== monthName)
    //         );
    //     } else {
    //         setSelectedMonths([...selectedMonths, monthName]);
    //     }
    // };
    //handle change end

    //select all or unselect all
    const handleSelectAll = (name) => {
        if (name === 'Select All Regions') {
            if (selectedRegions.length === regionOptions.length) {
                setSelectedRegions([]);
                setSelectedDistricts([]);
                setSelectedBranches([]);
            } else {
                setSelectedRegions(regionsData.map((region) => region.region));
            }
        } else if (name === 'Select All Districts') {
            if (selectedDistricts.length === districtOptions.length) {
                setSelectedDistricts([]);
                setSelectedBranches([]);
            } else {
                setSelectedDistricts(districtOptions);
            }
        } else if (name === 'Select All Branches') {
            if (selectedBranches.length === branchOptions.length) {
                setSelectedBranches([]);
            } else {
                setSelectedBranches(branchOptions);
            }
            // } else if (name === 'Select All Months') {
            //     if (selectedMonths.length === monthsInYear.length) {
            //         setSelectedMonths([]);
            //     } else {
            //         setSelectedMonths(monthsInYear);
            //     }
        } else {
            alert('NO OPTION FOUND');
        }
    };

    return (
        <div className='container-fluid pt-4 px-4'>
            <div className='row bg-light rounded mx-0 p-5 align-text-center justify-content-center'>
                <CheckBoxForm
                    title='Regions'
                    selectedAll={
                        selectedRegions.length > 0 &&
                        selectedRegions.length === regionOptions.length
                    }
                    onSelectAll={handleSelectAll}
                    disabledSelectAll={!regionOptions?.length}
                    countSelected={selectedRegions?.length}
                    countTotal={regionOptions?.length}
                >
                    {regionOptions?.map((region, index) => (
                        <SelectBox
                            name={region}
                            handleChange={handleRegionChange}
                            key={index}
                            checked={selectedRegions.includes(region)}
                        />
                    ))}
                </CheckBoxForm>
                <CheckBoxForm
                    title='Districts'
                    selectedAll={
                        selectedDistricts.length > 0 &&
                        selectedDistricts.length === districtOptions.length
                    }
                    onSelectAll={handleSelectAll}
                    countSelected={selectedDistricts?.length}
                    countTotal={districtOptions?.length}
                    disabledSelectAll={!districtOptions?.length}
                >
                    {districtOptions?.map((district, index) => (
                        <SelectBox
                            name={district}
                            handleChange={handleDistrictChange}
                            key={index}
                            index={index}
                            checked={selectedDistricts.includes(district)}
                        />
                    ))}
                </CheckBoxForm>
                <CheckBoxForm
                    title='Branches'
                    selectedAll={
                        selectedBranches.length > 0 &&
                        selectedBranches.length === branchOptions.length
                    }
                    onSelectAll={handleSelectAll}
                    countSelected={selectedBranches?.length}
                    countTotal={branchOptions?.length}
                    disabledSelectAll={!branchOptions?.length}
                >
                    {branchOptions?.map((branch, index) => (
                        <SelectBox
                            name={branch}
                            handleChange={handleBranchChange}
                            key={index}
                            index={index}
                            checked={selectedBranches.includes(branch)}
                        />
                    ))}
                </CheckBoxForm>
                <div className='bg-ligh rounded col-2 mx-4'>
                    <h2 style={{ fontSize: '17px' }}>
                        <label htmlFor='year'>Select Year</label>
                        <select
                            name='year'
                            id='year'
                            className='form-select mt-1'
                            // value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {yearDropDownOptions.map((year) => (
                                <option value={year} key={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </h2>
                </div>
                {/* CHECKBOX FORM HERE IF REQUIRED */}

                <div className='d-flex'>
                    <button
                        className='btn btn-primary w-25 mx-auto mt-5'
                        onClick={() => setShowReport(true)}
                    >
                        GENERATE REPORT
                    </button>
                </div>
            </div>
        </div>
    );
};

function CheckBoxForm({
    children,
    title,
    onSelectAll,
    disabledSelectAll,
    countTotal,
    countSelected,
}) {
    return (
        <div className='bg-ligh rounded col-2'>
            <h2 style={{ fontSize: '17px' }}>
                {title + ' ' + countTotal}{' '}
                <span style={{ fontSize: '12px', color: 'red' }}>
                    {countSelected}
                </span>
            </h2>
            <SelectBox
                name={`Select All ${title}`}
                handleChange={onSelectAll}
                checked={countSelected > 0 && countSelected === countTotal}
                disabled={disabledSelectAll}
            />
            {children}
        </div>
    );
}

function SelectBox({ name, handleChange, checked = false, disabled = false }) {
    return (
        <div className='mb-2'>
            <input
                type='checkbox'
                name={name}
                id={name}
                className='mx-2'
                onChange={() => handleChange(name)}
                checked={checked}
                disabled={disabled}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    );
}

GenerateReport.propTypes = {
    selectedRegions: PropTypes.array,
    setSelectedRegions: PropTypes.func,
    selectedDistricts: PropTypes.array,
    setSelectedDistricts: PropTypes.func,
    selectedBranches: PropTypes.array,
    setSelectedBranches: PropTypes.func,
    // selectedMonths: PropTypes.array,
    // setSelectedMonths: PropTypes,
    selectedYear: PropTypes.string,
    setSelectedYear: PropTypes.func,
    setShowReport: PropTypes.func,
};

SelectBox.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
};

CheckBoxForm.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    onSelectAll: PropTypes.func,
    disabledSelectAll: PropTypes.bool,
    countTotal: PropTypes.number,
    countSelected: PropTypes.number,
};

export default GenerateReport;

/* <CheckBoxForm
    title='Months'
    selectedAll={
        selectedMonths.length > 0 &&
        selectedMonths.length === monthsInYear.length
    }
    onSelectAll={handleSelectAll}
    countSelected={selectedMonths?.length}
    countTotal={monthsInYear?.length}
    disabledSelectAll={!monthsInYear?.length}
>
    {monthsInYear?.map((month, index) => (
        <SelectBox
            name={month}
            handleChange={handleMonthChange}
            key={index}
            index={index}
            checked={selectedMonths.includes(month)}
        />
    ))}
                </CheckBoxForm> */
