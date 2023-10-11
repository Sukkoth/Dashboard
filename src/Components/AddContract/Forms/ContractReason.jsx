import React from 'react';

const ContractReason = ({ register, errors }) => {
    return (
        <div className='col-sm-12 col-xl-8'>
            <div className='bg-light rounded h-100 p-4'>
                <h6 className='mb-4'>
                    Contract Info
                    <span className='text-danger'>*</span>
                </h6>
                <div>
                    <div className='mb-3'>
                        <label htmlFor='regionName mt-2'>Contract Type</label>
                        <select
                            id='region'
                            name='region'
                            className='form-select my-2 mb-3'
                            aria-label='Default select example'
                            defaultValue={''}
                            {...register('contractType')}
                        >
                            <option value='' disabled>
                                Select Contract Type
                            </option>
                            <option value='Building'>Building</option>
                            <option value='Land'>Land</option>
                            <option value='ATM'>ATM</option>
                        </select>
                        {errors?.region && (
                            <div className='form-text text-danger mb-4'>
                                {errors?.contractType?.message}
                            </div>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='reason' className='mb-2'>
                            Contract Type
                        </label>
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
    );
};

export default ContractReason;
