import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

const ContractDuration = ({ register, errors, control }) => {
    const [difference, setDifference] = useState('');
    const monthDifference = (d1, d2) => {
        const diffTime = Math.abs(d1 - d2);
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return (days / 365) * 12;
    };

    //read from useForm
    const startDate = useWatch({
        control,
        name: 'contractStartDate',
    });
    const endDate = useWatch({
        control,
        name: 'contractEndDate',
    });

    useEffect(() => {
        if (startDate && endDate) {
            setDifference(
                monthDifference(new Date(startDate), new Date(endDate))
            );
        }
    }, [startDate, endDate]);

    return (
        <div className='col-sm-12 col-xl-4'>
            <div className='bg-white rounded h-100 p-4'>
                <h6 className='mb-4 h4'>Contract Duration</h6>
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
                        <p className='my-3 text-danger'>{difference}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDuration;
