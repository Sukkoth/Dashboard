import React from 'react';

const ContractReason = ({ register, errors }) => {
    return (
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
    );
};

export default ContractReason;
