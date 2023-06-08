import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contractSchema from '../yupSchemas/contractSchema';
import axios from '../API/axios';

const AddContract = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(contractSchema) });

    errors.length && console.log('Errors', errors);
    const onSubmitHandler = async (data) => {
        console.log({ data });
        try {
            const response = await axios.post(
                'http://10.14.214.11:8080/leases',
                data
            );
            console.log('AFTER SENDING', response.data);
        } catch (error) {
            console.log('ERROR', error);
        }

        // reset();
    };

    return (
        <div className='container-fluid pt-4 px-4'>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='row g-4'>
                    <div className='col-sm-12 col-xl-4'>
                        <div className='bg-light rounded h-100 p-4'>
                            <h6 className='mb-4'>Branch Info</h6>
                            <label htmlFor='branch_name'>Branch Name</label>
                            <select
                                className='form-select my-2'
                                aria-label='Default select example'
                                id='branch_name'
                                name='branch_name'
                                defaultValue={''}
                                {...register('branch_name')}
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
                            {errors?.branch_name && (
                                <div className='form-text text-danger mb-4'>
                                    {errors?.branch_name?.message}
                                </div>
                            )}
                            <label htmlFor='branch_code'>Branch Code</label>
                            <select
                                id='branch_code'
                                name='branch_name'
                                className='form-select my-2'
                                aria-label='Default select example'
                                defaultValue={''}
                                {...register('branch_code')}
                            >
                                <option value=''>Select Branch Code</option>
                                <option value='QQ12'>QQ12</option>
                                <option value='YY22'>YY22</option>
                                <option value='ZZ22'>ZZ22</option>
                            </select>
                            {errors?.branch_code && (
                                <div className='form-text text-danger mb-4'>
                                    {errors?.branch_code?.message}
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
                                        htmlFor='advance_payment'
                                        className='form-label'
                                    >
                                        Advance Payment
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        name='advance_payment'
                                        className='form-control'
                                        id='advance_payment'
                                        min={0.0}
                                        {...register('advance_payment')}
                                    />
                                    {errors?.advance_payment && (
                                        <div className='form-text text-danger'>
                                            {errors?.advance_payment?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='discount_rate'
                                        className='form-label'
                                    >
                                        Discount Rate
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='discount_rate'
                                        name='discount_rate'
                                        min={0.0}
                                        {...register('discount_rate')}
                                    />
                                    {errors?.discount_rate && (
                                        <div className='form-text text-danger'>
                                            {errors?.discount_rate?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='initial_direct_cost'
                                        className='form-label'
                                    >
                                        Initial Direct Cost
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='initial_direct_cost'
                                        name='initial_direct_cost'
                                        min={0.0}
                                        defaultValue={0.0}
                                        {...register('initial_direct_cost')}
                                    />
                                    {errors?.initial_direct_cost && (
                                        <div className='form-text text-danger'>
                                            {
                                                errors?.initial_direct_cost
                                                    ?.message
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='lease_incentive'
                                        className='form-label'
                                    >
                                        Lease Incenstive
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='lease_incentive'
                                        name='lease_incentive'
                                        min={0.0}
                                        defaultValue={0.0}
                                        {...register('lease_incentive')}
                                    />
                                    {errors?.lease_incentive && (
                                        <div className='form-text text-danger'>
                                            {errors?.lease_incentive?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='total_payment'
                                        className='form-label'
                                    >
                                        Total Payment
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='total_payment'
                                        name='total_payment'
                                        min={0.0}
                                        {...register('total_payment')}
                                    />
                                    {errors?.total_payment && (
                                        <div className='form-text text-danger'>
                                            {errors?.total_payment?.message}
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
                                        htmlFor='contract_start_date '
                                        className='form-label'
                                    >
                                        Contract Start Date
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='contract_start_date '
                                        min={0.0}
                                        name='contract_start_date'
                                        {...register('contract_start_date')}
                                    />
                                    {errors?.contract_start_date && (
                                        <div className='form-text text-danger'>
                                            {
                                                errors?.contract_start_date
                                                    ?.message
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='contract_end_date '
                                        className='form-label'
                                    >
                                        Contract End Date
                                        <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='contract_end_date '
                                        name='contract_end_date'
                                        min={0.0}
                                        {...register('contract_end_date')}
                                    />
                                    {errors?.contract_end_date && (
                                        <div className='form-text text-danger'>
                                            {errors?.contract_end_date?.message}
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
                                        id='contract_reason'
                                        name='contract_reason'
                                        style={{ height: '200px' }}
                                        {...register('contract_reason')}
                                    ></textarea>
                                </div>
                                {errors?.contract_reason && (
                                    <div className='form-text text-danger'>
                                        {errors?.contract_reason?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-xl-12'></div>
                    <button
                        className='btn btn-primary w-25 mx-auto'
                        type='submit'
                        onClick={handleSubmit(onSubmitHandler)}
                    >
                        Add Contract
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContract;
