import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contractSchema from '../yupSchemas/contractSchema';
import useApiFetch from '../API/useApiFetch';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Providers/DataProvider';
import FormContainer from '../Components/AddContract/Forms/FormContainer';

const AddContract = () => {
    const navigate = useNavigate();
    const { regionsData } = useContext(DataContext);

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
            reset();
            setTimeout(() => {
                navigate('/list-contracts');
            }, 1500);
        }
    }, [contractData, isLoading, navigate, reset]);

    const onSubmitHandler = async (data) => {
        const updatedLocation = {
            region: regionsData[data.region].region,
            district: regionsData[data.region].districts[data.district].name,
            branchName:
                regionsData[data.region].districts[data.district].branches[
                    data.district
                ].name,
        };

        console.log({ ...data, ...updatedLocation });

        await makeRequest({
            data: { ...data, ...updatedLocation },
            url: '/leases',
            method: 'post',
        });
    };

    return (
        //TODO You can improve this prop drilling by using children in the FormContainer and moving all other components here
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
