import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Providers/DataProvider';
import { UpdateContext } from '../../../Providers/UpdateProvider';

const BranchInfo = ({ register, errors }) => {
    const { regionsData, findBranchInfo } = useContext(DataContext);

    const { contractData } = useContext(UpdateContext);

    const hierarchyData = findBranchInfo(contractData?.branchId);

    const [selectedIndex, setSelectedIndex] = useState({
        region: '',
        district: '',
        branch: '',
    });

    // //region
    // console.log(
    //     regionsData?.find((region) => region.regionId === selectedIndex.region)
    // );

    // //district
    // console.log(
    //     regionsData
    //         ?.find((region) => region.regionId === selectedIndex.region)
    //         ?.districts?.find(
    //             (district) => district.districtId === selectedIndex.district
    //         )
    // );

    // //branch
    // console.log(
    //     regionsData
    //         ?.find((region) => region.regionId === selectedIndex.region)
    //         ?.districts?.find(
    //             (district) => district.districtId === selectedIndex.district
    //         )
    //         ?.branches?.find(
    //             (branch) => branch.BranchId === selectedIndex.branch
    //         )?.name
    // );

    console.log('index', selectedIndex);
    console.log('Hierarchy', hierarchyData);

    useEffect(() => {
        if (
            selectedIndex.region === '' &&
            selectedIndex.district === '' &&
            selectedIndex.branch === '' &&
            hierarchyData?.regionId &&
            hierarchyData?.districtId &&
            contractData?.branchId
        ) {
            setSelectedIndex({
                region: hierarchyData?.regionId,
                district: hierarchyData?.districtId,
                branch: contractData?.branchId,
            });
            console.log('SETTTTTTT');
        }
    }, [
        selectedIndex.region,
        selectedIndex.district,
        selectedIndex.branch,
        hierarchyData?.regionId,
        hierarchyData?.districtId,
        contractData?.branchId,
    ]);

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
                    value={selectedIndex?.region}
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
                        <option value={region.regionId} key={index}>
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
                    value={selectedIndex?.district}
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
                    {regionsData
                        .find(
                            (region) => region.regionId === selectedIndex.region
                        )
                        ?.districts.map((district, index) => (
                            <option value={district.districtId} key={index}>
                                {district.name}
                            </option>
                        ))}
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
                    value={selectedIndex?.branch}
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
                    {regionsData
                        .find(
                            (region) => region.regionId === selectedIndex.region
                        )
                        ?.districts.find(
                            (district) =>
                                district.districtId === selectedIndex.district
                        )
                        ?.branches.map((branch, index) => (
                            <option value={branch.BranchId} key={index}>
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
