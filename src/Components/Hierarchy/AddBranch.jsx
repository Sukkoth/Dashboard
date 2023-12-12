import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import branchSchema from '../../yupSchemas/branchSchema';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Providers/DataProvider';
import useApiFetch from '../../API/useApiFetch';
import Alert from './Alert';

function AddBranch() {
    const { regionsData } = useContext(DataContext);
    const {
        data: branchData,
        isLoading: addingBranch,
        errors: backEndError,
        fetchData: addBranch,
    } = useApiFetch({ url: '/branch/addBranch', method: 'POST' }, false);

    const [selectedIndex, setSelectedIndex] = useState({
        region: '',
        district: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(branchSchema) });

    function handleResetForm() {
        reset();
        setSelectedIndex({ region: '', district: '' });
    }

    const onSubmitHandler = async (data) => {
        delete data['region'];
        data['district'] = {
            districtId: Number(data.district),
        };

        await addBranch({
            data: data,
        });

        handleResetForm();
    };

    useEffect(() => {
        if (!addingBranch && branchData?.branchId) {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [branchData, addingBranch]);

    return (
        <div className='col-sm-12 col-xl-4 '>
            <div className='bg-white rounded p-4'>
                <h6 className='h4 mb-4'>Add Branch</h6>
                {branchData.branchId && (
                    <Alert message='Success! Branch has been added successfuly' />
                )}
                {backEndError?.message && (
                    <Alert
                        message={backEndError?.message || 'Error adding data'}
                    />
                )}
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <label htmlFor='branchName'>Branch Name</label>
                    <input
                        id='branchName'
                        name='branchName'
                        className='form-control mt-2'
                        {...register('branchName')}
                    />

                    {errors?.branchName && (
                        <div className='form-text text-danger'>
                            {errors?.branchName?.message}
                        </div>
                    )}

                    <label htmlFor='branchCode' className='mt-3'>
                        Branch Code
                    </label>
                    <input
                        id='branchCode'
                        name='branchCode'
                        className='form-control mt-2'
                        {...register('branchCode')}
                    />

                    {errors?.branchCode && (
                        <div className='form-text text-danger'>
                            {errors?.branchCode?.message}
                        </div>
                    )}

                    <label htmlFor='location' className='mt-3'>
                        Location
                    </label>
                    <input
                        type='text'
                        id='location'
                        name='location'
                        className='form-control mt-2'
                        {...register('location')}
                    />
                    {errors?.location && (
                        <div className='form-text text-danger'>
                            {errors?.location?.message}
                        </div>
                    )}
                    <label htmlFor='costCenter' className='mt-3'>
                        Cost center
                    </label>
                    <input
                        type='text'
                        id='costCenter'
                        name='costCenter'
                        className='form-control mt-2'
                        {...register('costCenter')}
                    />
                    {errors?.costCenter && (
                        <div className='form-text text-danger'>
                            {errors?.costCenter?.message}
                        </div>
                    )}

                    {/* REGION */}

                    <label htmlFor='region' className='mt-3'>
                        Region Name
                    </label>
                    <select
                        id='region'
                        name='region'
                        className='form-select mt-2'
                        value={selectedIndex.region}
                        {...register('region')}
                        onChange={(e) =>
                            setSelectedIndex({
                                region: Number(e.target.value),
                                district: 0,
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
                    {errors?.regionId && (
                        <div className='form-text text-danger '>
                            {errors?.regionId?.message}
                        </div>
                    )}

                    {/* DISTRICT */}
                    <label htmlFor='districtName' className='mt-3'>
                        District Name
                    </label>
                    <select
                        disabled={selectedIndex.region === null}
                        id='district'
                        name='district'
                        className='form-select mt-2'
                        {...register('district')}
                    >
                        <option value='' disabled>
                            Select District Name
                        </option>
                        {regionsData
                            ?.find(
                                (region) =>
                                    region.regionId === selectedIndex.region
                            )
                            ?.districts.map((district, index) => (
                                <option value={district.districtId} key={index}>
                                    {district.name}
                                </option>
                            ))}
                    </select>
                    {errors?.districtId && (
                        <div className='form-text text-danger'>
                            {errors?.districtId?.message}
                        </div>
                    )}

                    <div className='d-flex'>
                        <button
                            className='btn btn-primary mx-auto mt-4'
                            disabled={addingBranch}
                        >
                            {addingBranch ? 'Adding branch' : 'Add Branch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBranch;
