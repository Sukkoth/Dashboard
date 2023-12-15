import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useApiFetch from '../../../API/useApiFetch';
import Alert from '../../../Components/Hierarchy/Alert';

function UpdateRegion() {
    const {
        data: regionData,
        isLoading: addingRegion,
        errors: backEndError,
        fetchData: UpdateRegion,
    } = useApiFetch({ url: '/region', method: 'POST' }, false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmitHandler = async (data) => {
        if (!data.regionName) return;

        await UpdateRegion({
            data,
        });
    };

    useEffect(() => {
        if (!addingRegion && regionData?.regionId) {
            reset();
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [regionData, addingRegion, reset]);

    return (
        <div className='container-fluid pt-4 px-4 take-screen row'>
            <div className='col-sm-12 col-xl-4 '>
                <div className='bg-white rounded p-4'>
                    <h6 className='h4 mb-4'>Update Region</h6>
                    {regionData?.regionId && (
                        <Alert message='Success! Region has been updated successfuly' />
                    )}
                    {backEndError?.message && (
                        <Alert
                            message={
                                backEndError?.message ||
                                'Error updateing region'
                            }
                        />
                    )}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <label htmlFor='regionName' className='mt-3'>
                            Region Name
                        </label>
                        <input
                            id='regionName'
                            name='regionName'
                            className='form-control mt-2'
                            {...register('regionName')}
                            required
                        />

                        {errors?.regionName && (
                            <div className='form-text text-danger'>
                                {errors?.regionName?.message}
                            </div>
                        )}

                        <div className='d-flex'>
                            <button
                                className='btn btn-primary mx-auto mt-4'
                                disabled={addingRegion}
                            >
                                {!addingRegion ? 'Update Region' : 'Updating'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateRegion;
