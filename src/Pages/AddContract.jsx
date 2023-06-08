import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contractSchema from '../yupSchemas/contractSchema';
import axios from '../API/axios';
import useApiFetch from '../API/useApiFetch';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

const AddContract = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(contractSchema) });

    const {
        data: contractData,
        isLoading,
        errors: backEndError,
        makeRequest,
    } = useApiFetch({}, false);

    errors.length && console.log('Errors', errors);
    const onSubmitHandler = async (data) => {
        console.log({ data });
        await makeRequest({ data, url: '/leases', method: 'post' });
        if (contractData?.length) {
            reset();
            setTimeout(() => {
                navigate('/list-contracts');
            }, 1000);
        }
    };

    console.log('Data', contractData?.length);

    return (
        <div className='container-fluid pt-4 px-4'>
            here
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='row g-4'>
                    <div className='col-sm-12 col-xl-4'>
                        <div className='bg-light rounded h-100 p-4'>
                            <h6 className='mb-4'>Branch Info</h6>
                            <label htmlFor='branchName'>Branch Name</label>
                            <select
                                className='form-select my-2'
                                aria-label='Default select example'
                                id='branchName'
                                name='branchName'
                                defaultValue={''}
                                {...register('branchName')}
                            >
                                <option value=''>Select Branch Name</option>
                                <option value='Addis Ababa Branch'>
                                    Addis Ababa Branch
                                </option>
                                <option value='Finfinnne Branch'>
                                    Finfinnne Branch
                                </option>
                                <option value=' Bole Medanialem Branch'>
                                    Bole Medanialem Branch
                                </option>
                            </select>
                            {errors?.branchName && (
                                <div className='form-text text-danger mb-4'>
                                    {errors?.branchName?.message}
                                </div>
                            )}
                            <label htmlFor='branchCode'>Branch Code</label>
                            <select
                                id='branchCode'
                                name='branchCode'
                                className='form-select my-2'
                                aria-label='Default select example'
                                defaultValue={''}
                                {...register('branchCode')}
                            >
                                <option value=''>Select Branch Code</option>
                                <option value='QQ12'>QQ12</option>
                                <option value='YY22'>YY22</option>
                                <option value='ZZ22'>ZZ22</option>
                            </select>
                            {errors?.branchCode && (
                                <div className='form-text text-danger mb-4'>
                                    {errors?.branchCode?.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-sm-12 col-xl-6'>
                        <div className='bg-light rounded h-100 p-4'>
                            <h6 className='mb-4'>Contract Detail</h6>
                            <div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='advancePayment'
                                        className='form-label'
                                    >
                                        Advance Payment
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        name='advancePayment'
                                        className='form-control'
                                        id='advancePayment'
                                        min={0.0}
                                        {...register('advancePayment')}
                                    />
                                    {errors?.advancePayment && (
                                        <div className='form-text text-danger'>
                                            {errors?.advancePayment?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='discountRate'
                                        className='form-label'
                                    >
                                        Discount Rate
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='discountRate'
                                        name='discountRate'
                                        min={0.0}
                                        {...register('discountRate')}
                                    />
                                    {errors?.discountRate && (
                                        <div className='form-text text-danger'>
                                            {errors?.discountRate?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='initialDirectCost'
                                        className='form-label'
                                    >
                                        Initial Direct Cost
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='initialDirectCost'
                                        name='initialDirectCost'
                                        min={0.0}
                                        defaultValue={0.0}
                                        {...register('initialDirectCost')}
                                    />
                                    {errors?.initialDirectCost && (
                                        <div className='form-text text-danger'>
                                            {errors?.initialDirectCost?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='leaseIncentive'
                                        className='form-label'
                                    >
                                        Lease Incenstive
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='leaseIncentive'
                                        name='leaseIncentive'
                                        min={0.0}
                                        defaultValue={0.0}
                                        {...register('leaseIncentive')}
                                    />
                                    {errors?.leaseIncentive && (
                                        <div className='form-text text-danger'>
                                            {errors?.leaseIncentive?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='totalPayment'
                                        className='form-label'
                                    >
                                        Total Payment
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='totalPayment'
                                        name='totalPayment'
                                        min={0.0}
                                        {...register('totalPayment')}
                                    />
                                    {errors?.totalPayment && (
                                        <div className='form-text text-danger'>
                                            {errors?.totalPayment?.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-xl-4'>
                        <div className='bg-light rounded h-100 p-4'>
                            <h6 className='mb-4'>Contract Duration</h6>
                            <div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='contractStartDate '
                                        className='form-label'
                                    >
                                        Contract Start Date
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='contractStartDate '
                                        min={0.0}
                                        name='contractStartDate'
                                        {...register('contractStartDate')}
                                    />
                                    {errors?.contractStartDate && (
                                        <div className='form-text text-danger'>
                                            {errors?.contractStartDate?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='contractEndDate '
                                        className='form-label'
                                    >
                                        Contract End Date
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='contractEndDate '
                                        name='contractEndDate'
                                        min={0.0}
                                        {...register('contractEndDate')}
                                    />
                                    {errors?.contractEndDate && (
                                        <div className='form-text text-danger'>
                                            {errors?.contractEndDate?.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-xl-6'>
                        <div className='bg-light rounded h-100 p-4'>
                            <h6 className='mb-4'>
                                Contract Reason
                                <span className='text-danger'>*</span>
                            </h6>
                            <div>
                                <div className='mb-3'>
                                    <textarea
                                        className='form-control'
                                        placeholder='Leave contract reason here'
                                        id='reason'
                                        name='reason'
                                        style={{ height: '200px' }}
                                        {...register('reason')}
                                    ></textarea>
                                </div>
                                {errors?.reason && (
                                    <div className='form-text text-danger'>
                                        {errors?.reason?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-xl-12'></div>
                    <button
                        className='btn btn-primary w-25 mx-auto mb-5'
                        type='submit'
                        onClick={handleSubmit(onSubmitHandler)}
                    >
                        {contractData.length == 0 && !isLoading ? (
                            'Add Contract'
                        ) : (
                            <>
                                <ClipLoader color='white' />
                            </>
                        )}
                        {contractData.length > 0 && (
                            <div class='alert alert-primary' role='alert'>
                                A simple primary alert with{' '}
                                <a href='#' class='alert-link'>
                                    an example link
                                </a>
                                . Give it a click if you like.
                            </div>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContract;
