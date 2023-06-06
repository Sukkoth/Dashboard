import React from 'react';

const AddContract = () => {
    console.log('In contract');
    return (
        <div className='container-fluid pt-4 px-4'>
            <div className='row g-4'>
                <div className='col-sm-12 col-xl-4'>
                    <div className='bg-light rounded h-100 p-4'>
                        <h6 className='mb-4'>Branch Info</h6>
                        <label htmlFor='branch_name'>Branch Name</label>
                        <select
                            className='form-select my-2 mb-4'
                            aria-label='Default select example'
                            id='branch_name'
                            defaultValue={''}
                        >
                            <option>Select Branch Name</option>
                            <option value='1'>Addis Ababa Branch</option>
                            <option value='2'>Finfinnne Branch</option>
                            <option value='3'>Bole Medanialem Branch</option>
                        </select>
                        <label htmlFor='branch_code'>Branch Code</label>
                        <select
                            id='branch_code'
                            className='form-select my-2'
                            aria-label='Default select example'
                            defaultValue={''}
                        >
                            <option>Select Branch Code</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </select>
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
                                    className='form-control'
                                    id='advance_payment'
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
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
                                    min={0.0}
                                />
                                <div className='form-text text-danger'>
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-sm-12 col-xl-6'>
                    <div className='bg-light rounded h-100 p-4'>
                        <h6 className='mb-4'>Contract Reason</h6>
                        <div>
                            <div className='mb-3'>
                                <textarea
                                    className='form-control'
                                    placeholder='Leave contract reason here'
                                    id='floatingTextarea'
                                    style={{ height: '200px' }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContract;
