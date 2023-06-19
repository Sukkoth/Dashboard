import React from 'react';

const BranchInfo = ({ register, errors }) => {
    return (
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
                    <option value='Finfinnne Branch'>Finfinnne Branch</option>
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
    );
};

export default BranchInfo;
