import React, { useContext, useEffect, useRef, useState } from 'react';
import CircleLoader from 'react-spinners/BeatLoader';
import useApiFetch from '../../../API/useApiFetch';
import { UpdateContext } from '../../../Providers/UpdateProvider';

const ContractReason = ({ register, errors, setValue }) => {
    const { contractData } = useContext(UpdateContext);
    const [changeFile, setFileChange] = useState(false);
    if (!contractData) return;
    return (
        <div className='col-sm-12 col-xl-8'>
            <div className='bg-white rounded h-100 p-4'>
                <h6 className='mb-4 h4'>
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
                            name='contractReason'
                            style={{ height: '200px' }}
                            {...register('contractReason')}
                        ></textarea>
                    </div>
                    {errors?.contractReason && (
                        <div className='form-text text-danger'>
                            {errors?.contractReason?.message}
                        </div>
                    )}

                    <div className='mb-3'>
                        <label htmlFor='reason' className='mb-2'>
                            Lease agreement File
                            {!changeFile && (
                                <span className='text-primary'>
                                    📂 {contractData.fileName}
                                </span>
                            )}
                            <span>
                                <button
                                    className='btn btn-outline-warning mx-3'
                                    type='button'
                                    onClick={() =>
                                        setFileChange((prev) => !prev)
                                    }
                                >
                                    {changeFile
                                        ? 'Cancel changing file'
                                        : 'Change file'}
                                </button>
                            </span>
                        </label>
                        {changeFile && (
                            <AddFile
                                register={register}
                                error={errors?.fileName?.message}
                                setValue={setValue}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function AddFile({ register, error, setValue }) {
    const [file, setFile] = useState('');
    const {
        data: fileData,
        isLoading: fileUploading,
        errors: fileUploadError,
        fetchData: uploadFile,
    } = useApiFetch(
        {
            url: '/leases/file',
            method: 'POST',
        },
        false
    );

    function handleSetFile(e) {
        setFile((prev) => '');
        if (e.target?.files[0]?.type === 'application/pdf') {
            setFile((prev) => e.target.files[0]);
        }
    }

    async function handleUpload() {
        if (fileData?.fileName) return;
        const formData = new FormData();
        formData.append('file', file);
        await uploadFile({
            data: formData,
        });
    }

    useEffect(() => {
        setValue('fileName', fileData?.fileName);
    }, [fileData?.fileName]);
    return (
        <div>
            {!fileData?.fileName && (
                <input
                    className='mx-2 border-primary'
                    type='file'
                    accept='application/pdf'
                    name='leaseContract'
                    id='leaseContract'
                    onChange={handleSetFile}
                />
            )}
            <button
                className={`btn ${
                    fileData?.fileName ? 'btn-primary' : 'btn-outline-primary'
                }`}
                type='button'
                disabled={fileUploading || !file}
                onClick={handleUpload}
            >
                {fileData?.fileName
                    ? 'File uploaded'
                    : !fileUploading
                    ? 'Submit File'
                    : 'Uploading'}

                {fileUploading && <CircleLoader size={5} color='white' />}
            </button>
            {fileData?.fileName && (
                <p className='d-inline mx-3 text-primary'>{file?.name}</p>
            )}
            {error && <div className='form-text text-danger'>{error}</div>}
        </div>
    );
}

export default ContractReason;
