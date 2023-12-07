import { useContext, useState } from 'react';
import { DataContext } from '../../../Providers/DataProvider';

const BranchInfo = ({ register, errors }) => {
    const { regionsData } = useContext(DataContext);

    const [selectedIndex, setSelectedIndex] = useState({
        region: null,
        district: null,
        branch: null,
    });

    return (
        <div className='col-sm-12 col-xl-4'>
            <div className='bg-white rounded h-100 p-4'>
                <h6 className='h4 mb-4'>Branch Info</h6>
                {/* REGION */}

                <label htmlFor='regionName mt-2'>Region Name</label>
                <select
                    id='region'
                    name='region'
                    className='form-select my-2'
                    aria-label='Default select example'
                    defaultValue={''}
                    {...register('region')}
                    onChange={(e) =>
                        setSelectedIndex({
                            region: Number(e.target.value),
                            district: 0,
                            branch: 0,
                        })
                    }
                >
                    <option value='' disabled>
                        Select Region Name
                    </option>
                    {regionsData?.map((region, index) => (
                        <option value={index} key={index}>
                            {region.region}
                        </option>
                    ))}
                </select>
                {errors?.region && (
                    <div className='form-text text-danger mb-4'>
                        {errors?.region?.message}
                    </div>
                )}

                {/* DISTRICT */}
                <label htmlFor='districtName mt-2'>District Name</label>
                <select
                    disabled={selectedIndex.region === null}
                    id='district'
                    name='district'
                    className='form-select my-2'
                    aria-label='Default select example'
                    defaultValue={''}
                    {...register('district')}
                    onChange={(e) =>
                        setSelectedIndex({
                            ...selectedIndex,
                            district: Number(e.target.value),
                            branch: null,
                        })
                    }
                >
                    <option value='' disabled>
                        Select District Name
                    </option>
                    {regionsData[selectedIndex.region]?.districts.map(
                        (district, index) => (
                            <option value={index} key={index}>
                                {district.name}
                            </option>
                        )
                    )}
                </select>
                {errors?.district && (
                    <div className='form-text text-danger mb-4'>
                        {errors?.district?.message}
                    </div>
                )}

                {/* BRANCH */}
                <label htmlFor='branchName'>Branch Name</label>
                <select
                    disabled={selectedIndex.district === null}
                    className='form-select my-2'
                    id='branchName'
                    name='branchName'
                    defaultValue={''}
                    {...register('branchName')}
                    onChange={(e) =>
                        setSelectedIndex({
                            ...selectedIndex,
                            branch: Number(e.target.value),
                        })
                    }
                >
                    <option value='' disabled>
                        Select Branch Name
                    </option>
                    {regionsData[selectedIndex.region]?.districts[
                        selectedIndex.district
                    ]?.branches.map((branch, index) => (
                        <option value={index} key={index}>
                            {branch.name}
                        </option>
                    ))}
                </select>
                {errors?.branchName && (
                    <div className='form-text text-danger mb-4'>
                        {errors?.branchName?.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BranchInfo;
