import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contractSchema from '../yupSchemas/contractSchema';
import useApiFetch from '../API/useApiFetch';
import { useNavigate } from 'react-router-dom';

import FormContainer from '../Components/AddContract/Forms/FormContainer';

const AddContract = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(contractSchema) });

    const {
        data: contractData,
        isLoading,
        errors: backEndError,
        fetchData: makeRequest,
    } = useApiFetch({}, false);

    useEffect(() => {
        if (!isLoading && contractData?.id) {
            console.log('REDIRECTING ......');
            reset();
            setTimeout(() => {
                navigate('/list-contracts');
            }, 1500);
        }
    }, [contractData]);

    errors.length && console.log('Errors', errors);
    const onSubmitHandler = async (data) => {
        await makeRequest({ data, url: '/leases', method: 'post' });
    };

    return (
        <FormContainer
            handleSubmit={handleSubmit}
            onSubmitHandler={onSubmitHandler}
            register={register}
            errors={errors}
            backEndError={backEndError}
            isLoading={isLoading}
            contractData={contractData}
        />
    );
};

export default AddContract;
