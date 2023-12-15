import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Providers/DataProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import districtSchema from '../../../yupSchemas/districtSchema';
import useApiFetch from '../../../API/useApiFetch';
import Alert from '../../../Components/Hierarchy/Alert';

function UpdateDistrict() {
    const { regionsData } = useContext(DataContext);
    const [selectedRegion, setSelectedRegion] = useState('');

    const {
        data: districtData,
        isLoading: updatingDistrict,
        errors: backEndError,
        fetchData: UpdateDistrict,
    } = useApiFetch(
        { url: '/districts/UpdateDistrict', method: 'POST' },
        false
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(districtSchema) });

    const onSubmitHandler = async (data) => {
        console.log({
            leaseLiabilityAccount: data.leaseLiabilityAccount,
            rouAccount: data.rouAccount,
            districtName: data.districtName,
            region: { regionId: data.region },
        });
        await UpdateDistrict({
            data: {
                leaseLiabilityAccount: data.leaseLiabilityAccount,
                rouAccount: data.rouAccount,
                districtName: data.districtName,
                region: { regionId: data.region },
            },
        });
        reset();
        setSelectedRegion('');
    };

    useEffect(() => {
        if (!updatingDistrict && districtData?.districtId) {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [districtData, updatingDistrict]);

    return (
        <div className='container-fluid pt-4 px-4 take-screen row'>
            <div className='col-sm-12 col-xl-4 '>
                <div className='bg-white rounded p-4'>
                    <h6 className='h4 mb-4'>Add District</h6>
                    {districtData?.districtId && (
                        <Alert message='Success! District has been updated successfuly' />
                    )}
                    {backEndError?.message && (
                        <Alert
                            message={
                                backEndError?.message ||
                                'Error updating district'
                            }
                        />
                    )}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <label htmlFor='districtName' className='mt-3'>
                            District Name
                        </label>
                        <input
                            id='districtName'
                            name='districtName'
                            className='form-control mt-2'
                            {...register('districtName')}
                        />

                        {errors?.districtName && (
                            <div className='form-text text-danger'>
                                {errors?.districtName?.message}
                            </div>
                        )}
                        <label htmlFor='leaseLiabilityAccount' className='mt-3'>
                            LeaseLiablity Account
                        </label>
                        <input
                            id='leaseLiabilityAccount'
                            name='leaseLiabilityAccount'
                            className='form-control mt-2'
                            {...register('leaseLiabilityAccount')}
                        />

                        {errors?.leaseLiabilityAccount && (
                            <div className='form-text text-danger'>
                                {errors?.leaseLiabilityAccount?.message}
                            </div>
                        )}
                        <label htmlFor='rouAccount' className='mt-3'>
                            ROU Account
                        </label>
                        <input
                            id='rouAccount'
                            name='rouAccount'
                            className='form-control mt-2'
                            {...register('rouAccount')}
                        />

                        {errors?.rouAccount && (
                            <div className='form-text text-danger'>
                                {errors?.rouAccount?.message}
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
                            defaultValue={selectedRegion}
                            {...register('region')}
                        >
                            <option value='' disabled>
                                Select Region Name
                            </option>
                            {regionsData?.map((region, index) => (
                                <option value={region.regionId} key={index}>
                                    {region?.region}
                                </option>
                            ))}
                        </select>
                        {errors?.region && (
                            <div className='form-text text-danger '>
                                {errors?.region?.message}
                            </div>
                        )}

                        <div className='d-flex'>
                            <button
                                className='btn btn-primary mx-auto mt-4'
                                disabled={updatingDistrict}
                            >
                                {!updatingDistrict
                                    ? 'Update District'
                                    : 'Updating . . .'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateDistrict;
