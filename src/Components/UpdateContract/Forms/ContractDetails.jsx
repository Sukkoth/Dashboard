import React, { useContext } from 'react';
import { UpdateContext } from '../../../Providers/UpdateProvider';

const ContractDetails = ({ register, errors }) => {
    return (
        <div className='col-sm-12 col-xl-6'>
            <div className='bg-white rounded h-100 p-4'>
                <h6 className='mb-4 h4'>Contract Detail</h6>
                <div>
                    <div className='mb-3'>
                        <label htmlFor='totalPayment' className='form-label'>
                            Total Payment
                            <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='number'
                            className='form-control'
                            id='totalPayment'
                            name='totalPayment'
                            min={0.0}
                            step={0.0001}
                            {...register('totalPayment')}
                        />
                        {errors?.totalPayment && (
                            <div className='form-text text-danger'>
                                {errors?.totalPayment?.message}
                            </div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='advancePayment' className='form-label'>
                            Advance Payment
                            <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='number'
                            name='advancePayment'
                            className='form-control'
                            id='advancePayment'
                            min={0.0}
                            step={0.0001}
                            {...register('advancePayment')}
                        />
                        {errors?.advancePayment && (
                            <div className='form-text text-danger'>
                                {errors?.advancePayment?.message}
                            </div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='discountRate' className='form-label'>
                            Discount Rate
                            <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='number'
                            step={0.00001}
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
                            step={0.0001}
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
                        <label htmlFor='leaseIncentive' className='form-label'>
                            Lease Incenstive
                        </label>
                        <input
                            type='number'
                            className='form-control'
                            id='leaseIncentive'
                            name='leaseIncentive'
                            min={0.0}
                            step={0.0001}
                            defaultValue={0.0}
                            {...register('leaseIncentive')}
                        />
                        {errors?.leaseIncentive && (
                            <div className='form-text text-danger'>
                                {errors?.leaseIncentive?.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;
