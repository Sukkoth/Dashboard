import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useApiFetch from '../../../API/useApiFetch';
import Alert from '../../../Components/Hierarchy/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function UpdateRegion() {
    const { regionId } = useParams();
    const navigate = useNavigate();

    const {
        data: regionData,
        isLoading: fetchingRegion,
        errors: errorFetchingData,
    } = useApiFetch({ url: `/region/${regionId}`, method: 'GET' });

    const {
        data: updatedRegionData,
        isLoading: updatingRegion,
        errors: errorUpdatingRegion,
        fetchData: UpdateRegion,
    } = useApiFetch(
        { url: `/region/updateRegion/${regionId}`, method: 'PUT' },
        false
    );

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
        if (regionData?.region?.regionId) {
            reset({
                regionName: regionData?.region?.regionName,
            });
        }
    }, [reset, regionId, regionData]);

    useEffect(() => {
        if (!updatingRegion && updatedRegionData?.region?.regionId) {
            reset();
            setTimeout(() => {
                navigate('/hierarchy/regions');
            }, 1500);
        }
    }, [updatedRegionData, updatingRegion, reset, navigate]);

    return (
        <div className='container-fluid pt-4 px-4 take-screen row'>
            <div className='col-sm-12 col-xl-4 '>
                <div className='bg-white rounded p-4 position-relative '>
                    {(fetchingRegion || errorFetchingData?.message) && (
                        <div className='update-loader'>
                            {!errorFetchingData?.message ? (
                                <ScaleLoader color='#d30fa9' />
                            ) : (
                                <Alert
                                    type='danger'
                                    message={
                                        errorFetchingData?.message || 'Error'
                                    }
                                    action='redirect'
                                    link='/hierarchy/regions'
                                />
                            )}
                        </div>
                    )}
                    <h6 className='h4 mb-4'>Update Region here</h6>
                    {updatedRegionData?.region?.regionId && (
                        <Alert
                            message='Success! Region updated, redirecting back. . .'
                            type='info'
                        />
                    )}
                    {errorUpdatingRegion?.message && (
                        <Alert
                            type='danger'
                            message={
                                errorUpdatingRegion?.message ||
                                'Error updating region'
                            }
                        />
                    )}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <label htmlFor='regionName' className='mt-3'>
                            Region Name
                        </label>
                        <input
                            type='text'
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
                                disabled={updatingRegion}
                            >
                                {!updatingRegion ? 'Update Region' : 'Updating'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateRegion;
